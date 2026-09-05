# Phase 9 Cloudflare Deployment

Status: deployment preparation only  
Date: 2026-09-05

## 1. Purpose

This document records the current production deployment shape for Medlink VA on Cloudflare Pages.

The repository is already structured for a static-first React/Vite site with Sanity CMS and Cloudflare Pages Functions for lead capture.

## 2. Deployment flow

Recommended production flow:

1. Push the repository to GitHub.
2. Connect the GitHub repository to Cloudflare Pages.
3. Build from the production branch.
4. Use the Vite output directory `dist`.
5. Configure production environment variables in Cloudflare Pages.
6. Deploy the production build.
7. Verify the custom domain and smoke-test the public site and Functions.

Recommended branch:

- `main`

If the repository uses a different production branch later, Cloudflare should follow that branch consistently.

## 3. Build command and output

Production build command:

```bash
npm.cmd run build
```

Build output directory:

- `dist`

The Vite build is the Cloudflare Pages artifact that should be published.

## 4. Cloudflare compatibility

A minimal Wrangler configuration is now present for reproducibility:

- [`wrangler.toml`](/C:/WebProjects/MedlinkVA/wrangler.toml)

It currently pins:

- `compatibility_date = "2026-09-03"`
- `pages_build_output_dir = "dist"`

This keeps local and Pages Function behavior aligned and removes the compatibility-date warning.

## 5. Pages Functions

The repository includes Cloudflare Pages Functions in:

- [`functions/_shared/leadCapture.ts`](/C:/WebProjects/MedlinkVA/functions/_shared/leadCapture.ts)
- [`functions/api/newsletter.ts`](/C:/WebProjects/MedlinkVA/functions/api/newsletter.ts)
- [`functions/api/contact.ts`](/C:/WebProjects/MedlinkVA/functions/api/contact.ts)
- [`functions/api/consultation.ts`](/C:/WebProjects/MedlinkVA/functions/api/consultation.ts)

Expected public routes:

- `/api/newsletter`
- `/api/contact`
- `/api/consultation`

Implementation notes:

- The handlers use standard Workers-compatible web APIs: `fetch`, `Request`, `Response`, `Headers`, `AbortController`.
- No Node-only APIs are required in the Functions layer.
- The server keeps Brevo secret handling on the server side.

## 6. Environment variables

### Frontend variables required by Cloudflare Pages

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SANITY_API_VERSION`

Current known values:

- `VITE_SANITY_PROJECT_ID=dlfas4qz`
- `VITE_SANITY_DATASET=production`
- `VITE_SANITY_API_VERSION=2026-03-30`

### Server-side Function variables required by Cloudflare Pages

- `BREVO_API_KEY`
- `BREVO_NEWSLETTER_LIST_ID`
- `BREVO_CONTACT_LIST_ID`
- `BREVO_CONSULTATION_LIST_ID`
- `BREVO_NOTIFICATION_FROM_EMAIL`
- `BREVO_NOTIFICATION_FROM_NAME`
- `BREVO_NOTIFICATION_TO_EMAIL`

Known non-secret Brevo list IDs:

- `BREVO_NEWSLETTER_LIST_ID=13`
- `BREVO_CONTACT_LIST_ID=14`
- `BREVO_CONSULTATION_LIST_ID=15`

Security handling:

- `BREVO_API_KEY` must be stored as a secret.
- `BREVO_NOTIFICATION_FROM_EMAIL` should point to a verified Brevo sender identity.
- `BREVO_NOTIFICATION_FROM_NAME` can stay as the branded display name.
- `BREVO_NOTIFICATION_TO_EMAIL` defaults to `info@medlinkva.com` if not set, but keeping it explicit is preferred.
- No secret values should appear in source code, documentation, or browser-visible responses.

## 7. Secret and artifact safety

Current ignore rules already exclude the important local and build artifacts:

- `.env`
- `.env.local`
- `.dev.vars`
- `.dev.vars.*`
- `sanity/.env`
- `.wrangler/`
- `node_modules/`
- `dist/`

The repository keeps `.env.example` tracked so setup guidance remains visible without exposing secrets.

## 8. Sanity CMS production CORS

The frontend reads public Sanity content from the browser, so Sanity should allow the production origins that will serve the site.

Minimum production origins to allow:

- `https://medlinkva.com`
- `https://www.medlinkva.com`

If a Cloudflare Pages preview domain is used for CMS testing, that preview origin should also be allowed temporarily.

Credentialed CORS is not required for this setup.

## 9. SPA routing

This is a React Router single-page app.

Direct navigation to deep routes should continue to resolve for:

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

The smallest Cloudflare-compatible fallback is an `_redirects` rule that serves `index.html` for non-API SPA paths. That fallback should not interfere with `/api/*` Functions routes.

The repository now includes that fallback in:

- [`public/_redirects`](/C:/WebProjects/MedlinkVA/public/_redirects)

If Cloudflare Pages routing is already handling SPA fallback in the dashboard, keep the repository-side config minimal and avoid duplicating behavior. The current static fallback is still small and safe for Pages Functions routing.

## 10. Canonical domain and SEO

Production canonical domain:

- `https://medlinkva.com`

The SEO component currently hardcodes production canonical and social URLs to the apex domain:

- [`src/components/Seo.tsx`](/C:/WebProjects/MedlinkVA/src/components/Seo.tsx)

Current behavior:

- canonical URLs are built from `https://medlinkva.com`
- Open Graph URLs use the same production base
- JSON-LD Organization and WebSite URLs use the same production base
- robots and sitemap files also point at the apex domain

Relevant public files:

- [`public/robots.txt`](/C:/WebProjects/MedlinkVA/public/robots.txt)
- [`public/sitemap.xml`](/C:/WebProjects/MedlinkVA/public/sitemap.xml)

This prevents localhost and `pages.dev` from becoming canonical production URLs.

## 11. Deployment verification

After deployment, verify:

1. `https://medlinkva.com` loads successfully.
2. Deep links refresh correctly on Cloudflare Pages.
3. `/api/newsletter`, `/api/contact`, and `/api/consultation` return the expected JSON responses.
4. Sanity-driven content appears when production CMS content is published.
5. The browser console shows no uncaught errors.
6. The network panel shows no accidental direct Brevo calls from the frontend.
7. `robots.txt` and `sitemap.xml` resolve publicly.
8. Canonical tags point to `https://medlinkva.com`.
9. HTTPS is active.
10. The `www` and apex hostnames behave consistently.

## 12. Rollback considerations

Cloudflare Pages deployment rollback should be limited to previous published builds.

Keep rollback safe by:

- preserving the known-good build command
- keeping secret values in Cloudflare only
- avoiding secret literals in source
- keeping Functions and frontend changes small and separable
- verifying a previous deployment before promoting it again

If lead capture behavior changes later, the Functions layer should be re-validated before re-publishing.

## 13. Production smoke-test checklist

### A. Homepage

- load the home page on desktop and mobile
- confirm hero imagery and CTA buttons render
- confirm no broken assets or console errors

### B. All major routes

- visit `/services`
- visit `/about`
- visit `/how-it-works`
- visit `/jobs`
- visit `/classes`
- visit `/resources`
- visit `/products`
- visit `/contact`
- visit `/book-consultation`
- visit `/privacy`
- visit `/terms`

### C. Direct route refresh

- hard refresh each major route and confirm Cloudflare Pages serves the app correctly

### D. Responsive navigation

- open and close the mobile menu
- confirm navigation remains usable on smaller screens

### E. Sanity content loading

- confirm published Sanity content appears where expected

### F. Team CMS content

- verify team members render from CMS when present

### G. Newsletter submission

- submit a valid newsletter form
- confirm the response is successful

### H. Contact submission

- submit a valid contact form
- confirm the response is successful

### I. Consultation submission

- submit a valid consultation form
- confirm the response is successful

### J. Duplicate lead behavior

- repeat a newsletter submission and confirm repeat handling remains acceptable

### K. Browser console

- confirm there are no uncaught runtime exceptions

### L. Network failures

- confirm failed submissions show safe errors rather than crashes

### M. HTTPS

- confirm the production site serves over HTTPS

### N. www/non-www behavior

- confirm one canonical host is preferred consistently

### O. sitemap.xml

- confirm `https://medlinkva.com/sitemap.xml` loads

### P. robots.txt

- confirm `https://medlinkva.com/robots.txt` loads

### Q. Canonical tags

- confirm each page’s canonical tag uses the apex production domain

### R. Open Graph metadata

- confirm OG title, description, image, and URL are correct

## 14. Known limitations

- The site still depends on Cloudflare Pages configuration for environment variables and custom-domain behavior.
- `www` redirection policy should be decided in Cloudflare and kept consistent with canonical URLs.
- Sanity CORS must be configured separately in the Sanity project settings.
- The repository currently uses a minimal Pages Functions setup rather than a custom Worker app.
