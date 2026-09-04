# Medlink VA Website

Professional lead-generation website for Medlink VA.

## Current stack

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Sanity CMS

## Local setup

Frontend:

```bash
npm install
npm run dev
```

Studio:

```bash
cd sanity
npm install
npm run dev
```

## Scripts

Frontend:

```bash
npm run dev
npm run build
npm run typecheck
npm run preview
npm run sanity:dev
npm run sanity:build
npm run sanity:typecheck
```

## Environment variables

Copy the placeholders from:

- [`.env.example`](/C:/WebProjects/MedlinkVA/.env.example)
- [`sanity/.env.example`](/C:/WebProjects/MedlinkVA/sanity/.env.example)

Frontend variables:

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SANITY_API_VERSION`

Studio variables:

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_STUDIO_API_VERSION`

## CMS-managed content

Sanity is the editable source for selected content:

- team members
- services
- jobs
- classes
- product links
- resources / blog posts
- FAQs
- testimonials
- homepage copy
- about copy
- selected contact and business details
- social links
- site settings

The layout, routing, design tokens, SEO component behavior, and application logic remain developer-controlled.

## Fallback behavior

The site will still render if Sanity is missing, empty, or not configured locally.

Fallback order:

1. Sanity content when available
2. Existing local content modules when Sanity is unavailable or empty

That means the current pages do not go blank just because the Studio has not been populated yet.

## Notes

- The client asset originals remain in `assets/client`.
- The application references optimized versions under `src/assets/optimized`.
- The Studio uses a clean singleton structure for Homepage, About, and Site Settings.
- Studio build validation currently hits an upstream Sanity CLI dependency-resolution issue in this environment, even though Studio typecheck passes.
