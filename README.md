# Center for Spoken Languages (CSL)

A free non-profit community language learning center. Built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and PostgreSQL.

## Quick Start

```bash
npm install
npx prisma generate
docker-compose -f docker-compose.dev.yml up -d
npx prisma db push
npx prisma db seed
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Setup (Detailed)

1. **Install dependencies**: `npm install`
2. **Generate Prisma client**: `npx prisma generate`
3. **Start services**: `docker-compose -f docker-compose.dev.yml up -d`
4. **Copy env**: `cp .env.example .env` (adjust if needed)
5. **Push schema**: `npx prisma db push`
6. **Seed database**: `npx prisma db seed`
7. **Run dev server**: `npm run dev`

## Project Structure

- `app/(public)/` - Public landing page routes
- `app/api/` - API route handlers
- `components/landing/` - Landing page sections
- `components/shared/` - Navbar, Footer
- `components/ui/` - shadcn/ui components
- `lib/` - Prisma, Redis, MinIO clients, utils
- `prisma/` - Schema and seed

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS v3**
- **Prisma** + PostgreSQL
- **shadcn/ui** (new-york style)
- **Redis** (caching)
- **MinIO** (object storage)
