# Agent Prompts for Implementation Tasks

Here are the individual prompts for each task. Each agent should run the commands listed to access and manage their specific task.

---

## Task 1: Phase 1.1 - Environment Variable

**Task ID:** Ste-ica-website-mu6.2

**Commands to run:**
```bash
bd show Ste-ica-website-mu6.2
bd update Ste-ica-website-mu6.2 --status in_progress
# After completing the work:
bd close Ste-ica-website-mu6.2
```

**Task:** Add ADMIN_PASSPHRASE environment variable

Read the implementation details in ./new-implementations.md (lines 53-59) for the exact specification.

MODIFY `.env.example` to add the new ADMIN_PASSPHRASE environment variable for admin dashboard authentication. The variable should require a minimum of 20 characters for security.

**Complexity:** Low  
**Estimate:** 5 minutes

---

## Task 2: Phase 1.2 - Middleware Protection

**Task ID:** Ste-ica-website-mu6.3

**Commands to run:**
```bash
bd show Ste-ica-website-mu6.3
bd update Ste-ica-website-mu6.3 --status in_progress
# After completing the work:
bd close Ste-ica-website-mu6.3
```

**Task:** Extend middleware for admin route protection

Read the implementation details in ./new-implementations.md (lines 63-107) for the exact implementation.

MODIFY `src/middleware.ts` to extend the existing i18n middleware to handle admin route protection. The middleware should:
- Check for the admin_session cookie on /admin/* routes
- Allow unauthenticated access to /admin/login only
- Redirect to /admin/login if not authenticated
- Add /admin/:path* to the matcher configuration
- Continue to apply i18n middleware for all other routes

**Complexity:** Medium  
**Estimate:** 30 minutes

---

## Task 3: Phase 1.3 - Authentication API

**Task ID:** Ste-ica-website-mu6.4

**Commands to run:**
```bash
bd show Ste-ica-website-mu6.4
bd update Ste-ica-website-mu6.4 --status in_progress
# After completing the work:
bd close Ste-ica-website-mu6.4
```

**Task:** Create authentication API endpoint

Read the implementation details in ./new-implementations.md (lines 111-191) for the exact implementation.

CREATE NEW FILE `src/app/api/admin/auth/route.ts` with:
- POST handler for login (verify passphrase, set session cookie)
- DELETE handler for logout (clear session cookie)
- Rate limiting: 5 attempts, 15-minute lockout per IP
- SHA256 session token generation
- HTTP-only secure cookie with 24-hour expiry
- Verification against ADMIN_PASSPHRASE environment variable

**Complexity:** High  
**Estimate:** 45 minutes

---

## Task 4: Phase 1.4 - Login Page

**Task ID:** Ste-ica-website-mu6.5

**Commands to run:**
```bash
bd show Ste-ica-website-mu6.5
bd update Ste-ica-website-mu6.5 --status in_progress
# After completing the work:
bd close Ste-ica-website-mu6.5
```

**Task:** Create admin login page

Read the implementation details in ./new-implementations.md (lines 195-276) for the exact implementation.

CREATE NEW FILE `src/app/admin/login/page.tsx` with:
- Client component ('use client')
- Passphrase input field (type="password")
- Form state management with useState (passphrase, error, loading)
- Submit handler that POSTs to /api/admin/auth
- Redirect to /admin on successful authentication
- Error message display
- Clean, centered design with proper styling

**Complexity:** Medium  
**Estimate:** 30 minutes

---

## Task 5: Phase 2.1 - Podcast Data File

**Task ID:** Ste-ica-website-mu6.6

**Commands to run:**
```bash
bd show Ste-ica-website-mu6.6
bd update Ste-ica-website-mu6.6 --status in_progress
# After completing the work:
bd close Ste-ica-website-mu6.6
```

**Task:** Create podcast.json data file

Read the implementation details in ./new-implementations.md (lines 286-318) for the exact structure.

CREATE NEW FILE `content/podcast.json` (or rename from blog.json if it exists) with the following structure:
- feedInfo object (title, description, mixcloudFeed, coverImage)
- episodes array (each with id, title, description, mixcloudUrl, publishedAt, duration, featured, tags)
- subscribeLinks array (platform, href, icon)

Ensure the JSON is properly formatted with the example data provided in the implementation plan.

**Complexity:** Low  
**Estimate:** 15 minutes

---

## Task 6: Phase 2.2 - Articles Data File

**Task ID:** Ste-ica-website-mu6.7

**Commands to run:**
```bash
bd show Ste-ica-website-mu6.7
bd update Ste-ica-website-mu6.7 --status in_progress
# After completing the work:
bd close Ste-ica-website-mu6.7
```

**Task:** Create articles.json data file

Read the implementation details in ./new-implementations.md (lines 322-351) for the exact structure.

CREATE NEW FILE `content/articles.json` with multilingual article support. Each article should include:
- id, slug
- title (it/en), excerpt (it/en), content (it/en)
- coverImage, publishedAt
- tags array
- published boolean

Use the example structure provided in the implementation plan.

**Complexity:** Low  
**Estimate:** 15 minutes

---

## Task 7: Phase 2.3 - Podcast Data Access Layer

**Task ID:** Ste-ica-website-mu6.8

**Commands to run:**
```bash
bd show Ste-ica-website-mu6.8
bd update Ste-ica-website-mu6.8 --status in_progress
# After completing the work:
bd close Ste-ica-website-mu6.8
```

**Task:** Create podcast data access layer

Read the implementation details in ./new-implementations.md (lines 355-430) for the exact implementation.

CREATE NEW FILE `src/lib/podcast.ts` with:
- TypeScript interfaces: Episode, PodcastData
- Async functions using fs/promises:
  - getPodcastData(): Promise<PodcastData>
  - savePodcastData(data: PodcastData): Promise<void>
  - addEpisode(episode: Omit<Episode, 'id'>): Promise<Episode>
  - updateEpisode(id: string, updates: Partial<Episode>): Promise<Episode | null>
  - deleteEpisode(id: string): Promise<boolean>
- Generate unique IDs using timestamp (e.g., `ep-${Date.now()}`)

**Complexity:** Medium  
**Estimate:** 45 minutes

---

## Task 8: Phase 2.4 - Podcast CRUD API

**Task ID:** Ste-ica-website-mu6.9

**Commands to run:**
```bash
bd show Ste-ica-website-mu6.9
bd update Ste-ica-website-mu6.9 --status in_progress
# After completing the work:
bd close Ste-ica-website-mu6.9
```

**Task:** Create podcast CRUD API routes

Read the implementation details in ./new-implementations.md (lines 434-512) for the exact implementation.

CREATE NEW FILE `src/app/api/admin/podcast/route.ts` with REST API handlers:
- GET: List all episodes (return full PodcastData)
- POST: Create new episode (accepts episode without id)
- PUT: Update episode (requires id + updates)
- DELETE: Remove episode (requires id)

Use the data access layer functions from src/lib/podcast.ts. Include proper error handling and return appropriate HTTP status codes (200, 201, 404, 500).

**Complexity:** Medium  
**Estimate:** 30 minutes

---

## Task 9: Phase 3.1 - Admin Layout

**Task ID:** Ste-ica-website-mu6.10

**Commands to run:**
```bash
bd show Ste-ica-website-mu6.10
bd update Ste-ica-website-mu6.10 --status in_progress
# After completing the work:
bd close Ste-ica-website-mu6.10
```

**Task:** Create admin layout component

Read the implementation details in ./new-implementations.md (lines 522-572) for the exact implementation.

CREATE NEW FILE `src/app/admin/layout.tsx` with:
- Sidebar navigation (width: 64, dark theme with gray-900 background)
- Navigation links to: Dashboard (/admin), Podcast (/admin/podcast), Articoli (/admin/articles)
- Logout button at bottom of sidebar (form action to /api/admin/auth with DELETE method)
- Main content area (flex-1, light gray background)
- Proper layout structure with flex container

**Complexity:** Medium  
**Estimate:** 30 minutes

---

## Task 10: Phase 3.2 - Admin Dashboard

**Task ID:** Ste-ica-website-mu6.11

**Commands to run:**
```bash
bd show Ste-ica-website-mu6.11
bd update Ste-ica-website-mu6.11 --status in_progress
# After completing the work:
bd close Ste-ica-website-mu6.11
```

**Task:** Create admin dashboard page

Read the implementation details in ./new-implementations.md (lines 576-607) for the exact implementation.

CREATE NEW FILE `src/app/admin/page.tsx` with:
- Card-based navigation grid (responsive: 1 column mobile, 2 medium, 3 large)
- Three cards:
  1. Podcast management (link to /admin/podcast)
  2. Articles management (link to /admin/articles)
  3. View Site (external link to / with target="_blank")
- Cards with white background, shadow, hover effects (shadow-lg on hover)
- Each card: title (text-xl font-semibold), description (text-gray-600)

**Complexity:** Low  
**Estimate:** 20 minutes

---

## Task 11: Phase 3.3 - Podcast Management Page

**Task ID:** Ste-ica-website-mu6.12

**Commands to run:**
```bash
bd show Ste-ica-website-mu6.12
bd update Ste-ica-website-mu6.12 --status in_progress
# After completing the work:
bd close Ste-ica-website-mu6.12
```

**Task:** Create podcast management page

Read the implementation details in ./new-implementations.md (lines 611-880) for the exact implementation.

CREATE NEW FILE `src/app/admin/podcast/page.tsx` as a client component with full CRUD functionality:
- Episode list table with columns: Title, Date, Duration, Actions
- Toggle form for creating/editing episodes
- Form fields: title, mixcloudUrl, publishedAt (date), duration (MM:SS), description (textarea), featured (checkbox)
- State management for episodes list, form data, loading, showForm, editingEpisode
- Handlers: fetchEpisodes, handleSubmit, handleDelete (with confirmation), resetForm, startEdit
- Featured episodes marked with star icon
- Proper styling with responsive grid layout

This is the most complex component in the admin panel.

**Complexity:** High  
**Estimate:** 1.5 hours

---

## Task 12: Phase 4 - Update Articoli Page

**Task ID:** Ste-ica-website-mu6.13

**Commands to run:**
```bash
bd show Ste-ica-website-mu6.13
bd update Ste-ica-website-mu6.13 --status in_progress
# After completing the work:
bd close Ste-ica-website-mu6.13
```

**Task:** Update Articoli page for dynamic content

Read the implementation details in ./new-implementations.md (lines 890-898) for requirements.

MODIFY `src/app/[locale]/articoli/page.tsx` to:
- Import and use getPodcastData() from @/lib/podcast
- Fetch episodes dynamically from podcast.json
- Display featured episode prominently (if any episode has featured: true)
- Show list of all episodes with title, date, and duration
- Add individual Mixcloud embeds for each episode using their mixcloudUrl
- Maintain existing i18n support with useTranslations hook
- Keep the current page structure and styling

**Complexity:** Medium  
**Estimate:** 1 hour

---

## Task 13: Phase 5 - Verification & Testing

**Task ID:** Ste-ica-website-mu6.14

**Commands to run:**
```bash
bd show Ste-ica-website-mu6.14
bd update Ste-ica-website-mu6.14 --status in_progress
# After completing the work:
bd close Ste-ica-website-mu6.14
```

**Task:** Verification and testing

Read the implementation details in ./new-implementations.md (lines 902-916) for the complete verification plan.

Execute the following verification steps:

**AUTOMATED TESTS:**
1. Run `npm run build` - ensure no build errors
2. Run `npm run lint` - check for linting issues

**MANUAL TESTING:**
1. Navigate to /admin/login and verify passphrase authentication flow
2. Test CRUD operations for podcast episodes in the admin panel
3. Verify that changes made in admin appear on the public /articoli page
4. Test logout functionality
5. Test rate limiting by attempting 5+ failed login attempts (should lockout for 15 minutes)

Document any issues found and ensure all functionality works as expected before closing this task.

**Complexity:** Medium  
**Estimate:** 1 hour

---

## Notes for All Agents

Each agent should follow the workflow from AGENTS.md after completing their task:
1. Run quality gates (tests, linters, builds if code changed)
2. Update issue status
3. Commit and push to remote
4. Verify git status shows "up to date with origin"
