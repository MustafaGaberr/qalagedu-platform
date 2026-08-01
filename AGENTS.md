# Qalagedu Student Platform Agents Guide

## Stack

- Next.js App Router with React and TypeScript strict mode.
- Tailwind CSS v4 with semantic CSS variables.
- shadcn/ui components installed as owned source in `src/components/ui`.
- shadcn is configured for Base UI primitives and RTL.
- Cairo is loaded through `next/font`.
- `next-intl` is configured with Arabic as the initial locale and room for future locales.
- Foundational form/schema packages are `react-hook-form` and `zod`.
- Icons use `lucide-react`.
- Theme preparation uses `next-themes`; light is the default.

## Package Manager

Use `pnpm` only.

## Commands

- `pnpm dev` starts the local development server.
- `pnpm build` creates a production build.
- `pnpm lint` runs ESLint.
- `pnpm typecheck` runs TypeScript without emitting files.

## Folder Conventions

- `src/app` contains routes and route-level layout files.
- `src/components/ui` contains shadcn-owned primitives.
- `src/components/shared` contains reusable, product-agnostic shared components.
- `src/components/layouts` is reserved for future layout composition.
- `src/features` is reserved for feature modules when real product areas are added.
- `src/lib` contains small framework helpers.
- `src/config` contains centralized app, brand, and navigation configuration.
- `src/i18n` contains locale configuration, request setup, and messages.
- `src/types` contains project-level type augmentation.
- `src/mocks` is reserved for small future mock fixtures only when needed.

Avoid generic catch-all files that become dumping grounds.

## RTL Rules

- Arabic is the initial application language.
- Root HTML must use `lang="ar"` and `dir="rtl"` through the locale foundation.
- Prefer logical utilities and CSS properties: `ps`, `pe`, `ms`, `me`, `start`, `end`, `border-s`, `border-e`, and `text-start`.
- Avoid hardcoded left/right assumptions in reusable components.
- Test responsive layouts in RTL before finishing visible UI work.

## Component Reuse Rules

- Use `src/components/ui` shadcn primitives before creating custom component anatomy.
- Shared components should be generic, accessible, and prop-driven.
- Do not duplicate component variants across files; extend existing primitives with composition.
- Use `next/image` for images.
- Use `buttonVariants` for links that visually look like buttons.
- Use lucide icons for buttons and controls; add `data-icon="inline-start"` or `data-icon="inline-end"` inside buttons.

## Semantic Theme Token Rules

- Reusable components must use semantic tokens such as `bg-primary`, `text-muted-foreground`, `border-border`, and `ring-ring`.
- Do not hardcode foundational colors like `bg-blue-600` in reusable components.
- Theme changes should start in `src/app/globals.css` CSS variables.
- Keep light theme as the default and preserve the prepared `.dark` token set.

## Server Component Rules

- Use Server Components by default.
- Add `"use client"` only when interaction, state, effects, or browser APIs require it.
- Do not make client components async.
- Keep data fetching, authentication, APIs, and business logic out until the relevant phase.

## Quality Checks

Before finishing future implementation tasks, run:

1. `pnpm install` when dependencies or lockfiles changed.
2. `pnpm lint`.
3. `pnpm typecheck`.
4. `pnpm build`.

Fix errors introduced by the task before handoff. Do not leave broken imports, unresolved TODO errors, or failing commands.
