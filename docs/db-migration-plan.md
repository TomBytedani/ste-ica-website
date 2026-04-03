# Database Migration Plan: Vercel Blob -> PostgreSQL

## Background

The website currently uses **Vercel Blob** for all dynamic content storage (articles, podcast metadata, settings, CV uploads). The free-tier blob storage has reached **100% capacity**, breaking article management. Since there are no official articles yet, this is the right time to migrate to a proper database before real content is created.

### Current Storage Architecture

| Content | Storage | Format | Notes |
|---------|---------|--------|-------|
| Articles | Vercel Blob / local `content/articles.json` | JSON | 3 example articles, none official |
| Podcast episodes | Vercel Blob / local `content/podcast.json` | JSON | Audio hosted on Mixcloud (external) |
| Settings | Vercel Blob / local `content/settings.json` | JSON | CV URL, studio info, contacts |
| CV upload | Vercel Blob (`cv-upload.pdf`) | Binary PDF | ~private access, served via API route |
| Blog metadata | Local `content/blog.json` | JSON | Title/description only |

### What Does NOT Need Migration

- **Podcast audio**: Hosted externally on Mixcloud via embed URLs. Only the episode metadata (title, description, Mixcloud URL) is stored locally. No change needed.
- **Images**: Served from `/public/images/` (static assets in the repo). No blob involvement.

---

## Recommended Solution: Neon PostgreSQL + Prisma ORM

### Why Neon + Prisma?

| Criterion | Neon PostgreSQL | Supabase | PlanetScale (MySQL) | Turso (SQLite) |
|-----------|----------------|----------|---------------------|----------------|
| **Free tier** | 0.5 GB storage, 190 compute hours/mo | 500 MB, 50K MAU | Deprecated free tier | 9 GB storage, 500 reads/day |
| **Vercel integration** | Native (first-party partner) | Good, manual setup | Good | Good |
| **Prisma support** | Excellent | Excellent | Good | Experimental |
| **Serverless-friendly** | Yes (connection pooling built-in, serverless driver) | Yes (connection pooling via Supavisor) | N/A | Yes (HTTP-based) |
| **Cold starts** | Fast (scale-to-zero with ~0.5s wake) | Fast | N/A | Fast |
| **File/binary storage** | No (use separate service) | Built-in (S3-compatible) | No | No |

**Recommendation: Neon** is the best fit because:
1. **Vercel-native**: One-click integration from Vercel dashboard, auto-provisions `DATABASE_URL`
2. **Free tier is generous enough**: 0.5 GB is plenty for articles + metadata (the current articles.json is ~3 KB)
3. **Prisma works perfectly**: Type-safe queries, migrations, and schema management
4. **Serverless driver**: `@neondatabase/serverless` avoids connection pool exhaustion in edge/serverless
5. **No vendor lock-in**: Standard PostgreSQL — can move to any Postgres host later

### What About Binary Files (CV Upload)?

The CV upload (~100 KB PDF) shouldn't go in the database. Options:
- **Option A (recommended)**: Store in `/public/files/` and commit to repo. Simple, free, no external dependency. CV changes are rare.
- **Option B**: Use Vercel Blob only for binary files (the free tier issue was caused by JSON content reads, not the CV). Keep blob token only for CV.
- **Option C**: Use Uploadthing or similar free file hosting.

**Recommendation: Option A** — The CV is a single small file that changes rarely. Serve it statically.

---

## Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_DATABASE_URL") // For Prisma migrations (bypasses pooler)
}

model Article {
  id          String   @id @default(cuid())
  slug        String   @unique
  titleIt     String   @map("title_it")
  titleEn     String   @map("title_en")
  excerptIt   String   @map("excerpt_it")
  excerptEn   String   @map("excerpt_en")
  contentIt   String   @map("content_it")   @db.Text
  contentEn   String   @map("content_en")   @db.Text
  coverImage  String   @map("cover_image")
  publishedAt DateTime @map("published_at")
  tags        String[] // PostgreSQL native array
  published   Boolean  @default(false)
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("articles")
}

model PodcastEpisode {
  id          String   @id @default(cuid())
  title       String
  description String   @db.Text
  mixcloudUrl String   @map("mixcloud_url")
  publishedAt DateTime @map("published_at")
  duration    String?
  featured    Boolean  @default(false)
  tags        String[] // PostgreSQL native array
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("podcast_episodes")
}

model PodcastFeed {
  id            String @id @default("default")
  title         String
  description   String @db.Text
  mixcloudFeed  String @map("mixcloud_feed")
  coverImage    String @map("cover_image")

  @@map("podcast_feed")
}

model SubscribeLink {
  id       String @id @default(cuid())
  platform String
  href     String
  icon     String
  order    Int    @default(0)

  @@map("subscribe_links")
}

model Settings {
  id    String @id @default("default") // Singleton row
  cvUrl String @map("cv_url")
  cvIsCustom Boolean @default(false) @map("cv_is_custom")
  studioAddress   String @map("studio_address")
  studioLat       Float  @map("studio_lat")
  studioLng       Float  @map("studio_lng")
  studioMapsUrl   String @map("studio_maps_url")
  contactPhone    String @map("contact_phone")
  contactEmail    String @map("contact_email")

  @@map("settings")
}
```

---

## Implementation Steps

### Phase 1: Set Up Database Infrastructure

1. **Create Neon project** via Vercel integration (Dashboard > Storage > Create > Neon Postgres)
   - This auto-provisions `DATABASE_URL` and `DIRECT_DATABASE_URL` env vars
2. **Install dependencies**:
   ```bash
   npm install prisma @prisma/client @neondatabase/serverless
   npm install -D prisma
   ```
3. **Initialize Prisma**:
   ```bash
   npx prisma init
   ```
4. **Add schema** (as above) to `prisma/schema.prisma`
5. **Run initial migration**:
   ```bash
   npx prisma migrate dev --name init
   ```

### Phase 2: Create Data Access Layer

Replace `src/lib/content-store.ts` (the blob abstraction) with Prisma-based queries.

**Files to create/modify:**

| File | Action | Purpose |
|------|--------|---------|
| `src/lib/db.ts` | Create | Prisma client singleton (with serverless adapter) |
| `src/lib/articles.ts` | Modify | Replace `readContent('articles.json')` with Prisma queries |
| `src/lib/podcast.ts` | Modify | Replace `readContent('podcast.json')` with Prisma queries |
| `src/lib/settings.ts` | Modify | Replace `readContent('settings.json')` with Prisma queries |
| `src/lib/content-store.ts` | Delete | No longer needed |

**Prisma client singleton** (`src/lib/db.ts`):
```typescript
import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

// Required for serverless environments
neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaNeon(new Pool({ connectionString: process.env.DATABASE_URL })),
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### Phase 3: Migrate API Routes

Update the admin API routes to use Prisma instead of reading/writing JSON:

| Route | Current | After |
|-------|---------|-------|
| `POST /api/admin/articles` | `writeContent('articles.json', ...)` | `prisma.article.create(...)` |
| `PUT /api/admin/articles` | Read all → find → update → write all | `prisma.article.update(...)` |
| `DELETE /api/admin/articles` | Read all → filter → write all | `prisma.article.delete(...)` |
| `GET /api/admin/articles` | `readContent('articles.json')` | `prisma.article.findMany(...)` |
| `POST /api/admin/cv` | Blob upload | Save to `public/files/` (static) |
| Similar for podcast routes | ... | `prisma.podcastEpisode.*` |

### Phase 4: Migrate Page Components

Update server components that fetch data:

| Component/Page | Change |
|----------------|--------|
| `ServerAwareHeader.tsx` | `prisma.article.count({ where: { published: true } }) > 0` |
| `articoli/page.tsx` | `prisma.article.findMany({ where: { published: true } })` |
| `articoli/[slug]/page.tsx` | `prisma.article.findUnique({ where: { slug, published: true } })` |
| `podcast/page.tsx` | `prisma.podcastEpisode.findMany()` + `prisma.podcastFeed.findFirst()` |

### Phase 5: Seed Data & Cleanup

1. **Create seed script** (`prisma/seed.ts`):
   - Import current `content/*.json` files
   - Insert into database tables
   - Run with `npx prisma db seed`
2. **Remove Vercel Blob dependency**:
   ```bash
   npm uninstall @vercel/blob
   ```
3. **Delete `BLOB_READ_WRITE_TOKEN`** from Vercel environment variables
4. **Delete blob data** from Vercel dashboard (Storage > Blob > delete store)
5. **Remove `content/*.json` files** from runtime usage (keep in repo as reference/seed data)
6. **Restore `ServerAwareHeader`** to dynamically check for published articles (remove the temporary hardcode from Task 1)

### Phase 6: Testing & Deployment

1. Test locally with Neon dev branch (or local PostgreSQL via Docker)
2. Run `npx prisma migrate deploy` in Vercel build command
3. Verify admin panel CRUD operations
4. Verify article listing/detail pages
5. Verify podcast page
6. Verify CV upload/download
7. Confirm blob storage is no longer referenced anywhere

---

## Updated Build Command (Vercel)

```bash
npx prisma generate && npx prisma migrate deploy && next build
```

Add to `package.json`:
```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "build": "prisma migrate deploy && next build"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

---

## Environment Variables (after migration)

| Variable | Purpose | Where |
|----------|---------|-------|
| `DATABASE_URL` | Neon pooled connection string | Vercel (auto-set by integration) |
| `DIRECT_DATABASE_URL` | Neon direct connection (for migrations) | Vercel (auto-set by integration) |
| `ADMIN_PASSPHRASE` | Admin panel auth | Vercel (existing) |
| `RESEND_API_KEY` | Email service | Vercel (existing) |
| `RESEND_FROM_EMAIL` | Email sender | Vercel (existing) |
| `CONTACT_EMAIL` | Contact form recipient | Vercel (existing) |
| `NEXT_PUBLIC_SITE_URL` | Base URL | Vercel (existing) |
| ~~`BLOB_READ_WRITE_TOKEN`~~ | ~~Vercel Blob~~ | **Remove** |

---

## Cost Estimate

| Service | Free Tier | Expected Usage | Cost |
|---------|-----------|----------------|------|
| Neon PostgreSQL | 0.5 GB, 190 compute hrs/mo | <10 MB data, <10 hrs/mo | **$0** |
| Vercel (hosting) | Current plan | No change | No change |
| Mixcloud (podcast) | Free | External hosting | **$0** |

---

## Timeline Estimate

| Phase | Effort |
|-------|--------|
| Phase 1: Infrastructure setup | ~30 min |
| Phase 2: Data access layer | ~1-2 hours |
| Phase 3: API routes migration | ~1-2 hours |
| Phase 4: Page components | ~30 min |
| Phase 5: Seed & cleanup | ~30 min |
| Phase 6: Testing & deployment | ~1 hour |
| **Total** | **~4-6 hours** |
