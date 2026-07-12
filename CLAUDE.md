# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev           # start dev server (localhost:3000)
pnpm build         # production build
pnpm start         # run production build
pnpm lint          # ESLint
pnpm format        # Prettier --write on all files
pnpm format:check  # Prettier --check (used in CI)
pnpm db:generate   # regenerate the Prisma client (run after install, and after editing schema.prisma)
pnpm db:migrate    # create + apply a migration in development
pnpm db:push       # push schema changes to the DB without creating a migration
pnpm db:studio     # open Prisma Studio
```

This project uses **pnpm** (see `pnpm-workspace.yaml`). Do not use npm or yarn.

Local Postgres connection string goes in `.env.local` (gitignored) as `DATABASE_URL` — see `.env.example` for the expected shape. `pnpm db:generate` must be run once after `pnpm install` (not wired into `postinstall`, since `.env.local` isn't guaranteed to exist yet); the generated client lands in `src/generated/prisma` (gitignored) and `pnpm build` will fail its type check until it exists.

## Stack

- **Next.js 16** with the App Router (`app/` directory)
- **React 19**
- **TypeScript** — strict mode enabled
- **Tailwind CSS v4** (configured via `postcss.config.mjs`)
- **ESLint 9** with `eslint-config-next` — flat config in `eslint.config.mjs`; `@typescript-eslint/no-explicit-any` is an error
- **Prettier 3** — config in `prettier.config.mjs`; double quotes, semi, 2-space tabs, LF, printWidth 100
- **Husky + lint-staged** — pre-commit hook runs `eslint --fix` then `prettier --write` on staged `*.{ts,tsx}` files
- **Prisma** (v7+) — ORM for database access. Postgres via the `@prisma/adapter-pg` driver adapter (required in Prisma 7+, not optional); datasource config lives in `prisma.config.ts` at the project root, not in `schema.prisma`. Client singleton lives at `src/adapters/prisma/client.ts`
- **shadcn/ui** — component library; always check for an existing shadcn component before building a custom one
- **GSAP** — animations
- **TanStack Query** — client-side data fetching and server state management
- **Axios** — HTTP client (used inside TanStack Query fetchers)
- **Zod** — schema validation

## Branching

All changes go on the `develop` branch. Never commit directly to `main`.

## Commit messages

- Use [Conventional Commits](https://www.conventionalcommits.org/) — `type: description` (e.g. `feat: add workout logger`, `fix: correct rep count`, `docs: update readme`)
- One line only — no body, no footer
- Do not add a Claude co-author trailer

## Product Goal

A progress tracker app designed primarily for gym workouts, but architected to support other trackable disciplines in the future (running, tennis, swimming, etc.).

Core features:

- **Routine planner** — register a weekly gym routine (which muscle groups / exercises on which days)
- **Workout logger** — on a scheduled workout day, log sets with weight and reps
- **Progress dashboard** — visualize progress over time per exercise / muscle group

## Architecture

The project follows **Clean Architecture with Hexagonal (Ports & Adapters)** principles, adapted for Next.js and client-side React. The goal is to keep business logic decoupled from frameworks, UI, and infrastructure.

### Directory structure

```
app/              # Next.js App Router — pages, layouts, API routes only
src/
  domain/         # Core business entities and value objects (pure TypeScript, no framework deps)
  use-cases/      # Application use cases — orchestrate domain logic, depend only on ports
  ports/          # Interfaces (TypeScript types/interfaces) that define how use cases talk to the outside world
  adapters/       # Concrete implementations of ports (Prisma repos, Axios API clients, etc.)
  hooks/          # Custom React hooks — map 1-to-1 with use cases; wire TanStack Query + adapters
  lib/            # Shared utilities, Zod schemas, constants
components/       # Shared UI components (shadcn/ui wrappers and custom presentational components)
```

### Key conventions

- **API routes** live in `app/api/` and are thin — they validate input with Zod, call a use case or adapter, and return JSON. No business logic in route handlers.
- **TanStack Query** is the client-side data layer. Hooks in `src/hooks/` wrap `useQuery` / `useMutation` and call Axios-based adapters.
- **Ports** are plain TypeScript interfaces. Adapters implement them. Use cases depend only on ports — never on Prisma, Axios, or any specific library directly.
- **Domain entities** are plain TypeScript classes or types with no framework imports.
- **Zod schemas** live in `src/lib/schemas/` and are shared between API route validation and client-side form validation.
- **shadcn/ui** — always check the shadcn component registry before building a custom component.
- **GSAP** is used for animations; keep animation logic co-located with the component or in a dedicated animation hook.

Path alias: `@/` maps to the project root (e.g. `@/components/Button` → `./components/Button`). Anything under `src/` needs the explicit segment — `@/src/lib/utils`, `@/src/hooks/useX`, etc. — there is no `@/lib` or `@/hooks` shorthand.
