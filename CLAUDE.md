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
```

This project uses **pnpm** (see `pnpm-workspace.yaml`). Do not use npm or yarn.

## Stack

- **Next.js 16** with the App Router (`app/` directory)
- **React 19**
- **TypeScript** — strict mode enabled
- **Tailwind CSS v4** (configured via `postcss.config.mjs`)
- **ESLint 9** with `eslint-config-next` — flat config in `eslint.config.mjs`; `@typescript-eslint/no-explicit-any` is an error
- **Prettier 3** — config in `prettier.config.mjs`; double quotes, semi, 2-space tabs, LF, printWidth 100
- **Husky + lint-staged** — pre-commit hook runs `eslint --fix` then `prettier --write` on staged `*.{ts,tsx}` files

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

The project is an early-stage gym progress tracker built on the Next.js App Router. All routes live under `app/`. The root layout (`app/layout.tsx`) sets up the Geist font variables and a full-height flex body.

Path alias: `@/` maps to the project root (e.g. `@/components/Button` → `./components/Button`).

No database, auth, or state management has been added yet.
