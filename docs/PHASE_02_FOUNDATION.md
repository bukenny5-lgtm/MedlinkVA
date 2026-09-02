# Phase 2 Foundation

Status: completed foundation scaffold
Date: 2026-09-02

## Packages installed

This phase introduces the base frontend package set:

- `react`
- `react-dom`
- `react-router-dom`
- `vite`
- `@vitejs/plugin-react`
- `@tailwindcss/vite`
- `tailwindcss`
- `typescript`
- `@types/react`
- `@types/react-dom`

## Folder structure

```txt
src/
  assets/
  components/
    layout/
    ui/
  content/
  layouts/
  pages/
  routes/
  styles/
  lib/
```

## Routing

Initial routes are handled with React Router and a shared site shell:

- `/`
- `/services`
- `/about`
- `/how-it-works`
- `/jobs`
- `/classes`
- `/resources`
- `/products`
- `/contact`
- `/book-consultation`
- `/privacy`
- `/terms`
- `*` for not found

## Design-token approach

Tailwind v4 is configured through the Vite plugin and a single stylesheet token layer in `src/styles/globals.css`.

The theme defines:

- sky blue
- accent blue
- navy
- charcoal
- muted background
- border color
- font family
- soft shadow

Reusable component classes provide the initial button and card system instead of scattering arbitrary values across the app.

## Asset handling

The original client assets remain untouched under `assets/client`.

For the foundation app:

- the Medlink VA logo is used in the header
- the logo is intentionally shown in a bordered container because the current source asset has a white canvas
- the remaining photos are preserved for later homepage and content sections

The current structure keeps asset imports centralized in `src/lib/assets.ts`.

## SEO foundation

Implemented in this phase:

- route-level document title updates
- default meta description handling
- `robots.txt`
- `sitemap.xml` placeholder
- semantic page structure
- canonical link support

Deferred for later phases:

- prerendering or static generation hardening
- structured data
- page-specific social image assets
- CMS-driven metadata

## Accessibility foundation

Implemented in this phase:

- semantic landmarks
- skip link
- keyboard-usable navigation
- visible focus states
- mobile menu with a toggle button and Escape handling
- meaningful link and button usage

The foundation pages are intentionally neutral and avoid unsupported claims.

## Deferred work

- Final homepage design
- Sanity CMS integration
- Brevo integration
- consultation form handling
- richer SEO content
- structured data
- blog/resources content
- jobs/class/product detail content
- deployment configuration

## Important implementation decisions

- React Router is used with a shared layout route to keep the shell consistent.
- Tailwind v4 is integrated through the Vite plugin instead of a separate PostCSS setup.
- Static route content lives in local TypeScript modules until Sanity is introduced.
- The current phase keeps the app small and reviewable, with no backend or custom database.

