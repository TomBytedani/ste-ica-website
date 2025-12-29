# Stefano Icardi Website

Website for Stefano Icardi, psychologist in Milan. Built with Next.js and Tailwind CSS.

## Features
- Marketing site with Home, Chi Sono (About), and Articoli (Podcast) pages
- Contact form backed by a Next.js API route with basic rate limiting
- Email delivery via Resend (falls back to server logs in development)
- SEO metadata and Open Graph support
- App Router structure with reusable section components
- Localization scaffolding with next-intl (it/en)

## Tech Stack
- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- next-intl for localization
- Resend for email delivery

## Getting Started
1. Install dependencies
   ```bash
   npm install
   ```
2. Create your local env file
   ```bash
   Copy-Item .env.example .env.local
   ```
3. Run the dev server
   ```bash
   npm run dev
   ```

## Environment Variables
Define these in `.env.local` (see `.env.example` for details):
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_EMAIL`
- `NEXT_PUBLIC_SITE_URL`

If `RESEND_API_KEY` is not set, the contact form logs submissions to the server console.

## Scripts
- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run start` - Start the production server
- `npm run lint` - Run lint checks

## Project Structure
- `src/app` - Next.js routes, layouts, and API endpoints
- `src/components` - Layout, section, shared, and UI components
- `src/lib` - Site constants, email helpers, and utilities
- `src/i18n` - next-intl routing configuration
- `src/messages` - Translation message catalogs
- `public` - Static assets (images, documents, icons)

## Updating Content
- Site and contact details live in `src/lib/constants.ts`
- Section copy is defined in `src/components/sections`
- Contact form logic lives in `src/app/api/contact/route.ts`

## Deployment
Set the environment variables above, then run `npm run build` and `npm run start`.

