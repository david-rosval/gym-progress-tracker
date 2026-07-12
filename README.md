# Gym Progress Tracker

A web app for planning gym routines, logging workouts, and visualizing progress over time. Built to support gym training first, with an architecture that can extend to other disciplines (running, tennis, swimming, etc.).

## Features (planned)

- **Routine planner** — set up a weekly schedule of muscle groups and exercises per day
- **Workout logger** — log sets with weight and reps on scheduled training days
- **Progress dashboard** — track progress over time per exercise and muscle group

## Tech stack

- [Next.js 16](https://nextjs.org) — App Router
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org) — strict mode
- [Tailwind CSS v4](https://tailwindcss.com)
- [ESLint 9](https://eslint.org) + [Prettier 3](https://prettier.io)
- [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/lint-staged/lint-staged) — pre-commit hooks

## Getting started

**Prerequisites:** [Node.js](https://nodejs.org) and [pnpm](https://pnpm.io/installation).

```bash
git clone <repo-url>
cd gym-progress-tracker
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Commands

```bash
pnpm dev           # start dev server
pnpm build         # production build
pnpm start         # run production build
pnpm lint          # run ESLint
pnpm format        # format all files with Prettier
pnpm format:check  # check formatting (used in CI)
```

## Project structure

```
app/
  layout.tsx    # root layout (fonts, body wrapper)
  page.tsx      # home page
  globals.css   # global styles
public/         # static assets
```

Path alias: `@/` resolves to the project root.

## Contributing

- All work goes on the `develop` branch — never commit directly to `main`
- Follow [Conventional Commits](https://www.conventionalcommits.org/): `type: description` (e.g. `feat: add workout logger`)
- One-line commit messages only
- The pre-commit hook runs ESLint and Prettier automatically on staged files
