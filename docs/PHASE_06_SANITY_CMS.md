# Phase 6 Sanity CMS

Status: implemented with a Studio build caveat
Date: 2026-09-02

## 1. Sanity packages installed

- `@sanity/client`
- `@sanity/image-url`
- `sanity`

## 2. Sanity project structure

```txt
sanity/
  package.json
  package-lock.json
  sanity.config.ts
  sanity.cli.ts
  tsconfig.json
  schemaTypes/
    aboutContent.ts
    class.ts
    faq.ts
    homepageContent.ts
    index.ts
    job.ts
    productLink.ts
    resourcePost.ts
    service.ts
    shared.ts
    siteSettings.ts
    teamMember.ts
    testimonial.ts
  structure/
    index.ts
```

## 3. Environment variables

Root frontend:

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SANITY_API_VERSION`

Studio:

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_STUDIO_API_VERSION`

Example files:

- [`.env.example`](/C:/WebProjects/MedlinkVA/.env.example)
- [`sanity/.env.example`](/C:/WebProjects/MedlinkVA/sanity/.env.example)

## 4. Schema types

Created document types:

- `teamMember`
- `service`
- `job`
- `class`
- `productLink`
- `resourcePost`
- `faq`
- `testimonial`
- `siteSettings`
- `homepageContent`
- `aboutContent`

## 5. Studio navigation structure

The Studio uses a single labeled workspace, `Medlink VA Content`, with these visible groups:

- Homepage
- About
- Site Settings
- Services
- Team
- Jobs
- Classes
- Products
- Resources
- FAQs
- Testimonials

## 6. Singleton strategy

Singleton documents are handled through the structure tool and document action filtering:

- `homepageContent`
- `aboutContent`
- `siteSettings`

The create menu hides these singleton types so they are edited in-place instead of duplicated.

## 7. Frontend Sanity client

Implemented in:

- [`src/lib/sanity/client.ts`](/C:/WebProjects/MedlinkVA/src/lib/sanity/client.ts)

The client:

- reads the Vite env vars
- only initializes when the project id and dataset exist
- uses read-only CDN access

## 8. Query organization

Implemented in:

- [`src/lib/sanity/queries.ts`](/C:/WebProjects/MedlinkVA/src/lib/sanity/queries.ts)

The frontend fetches one normalized bundle containing:

- site settings
- homepage content
- about content
- team members
- services
- jobs
- classes
- product links
- resource posts
- FAQs
- testimonials

## 9. TypeScript types

Implemented in:

- [`src/lib/sanity/types.ts`](/C:/WebProjects/MedlinkVA/src/lib/sanity/types.ts)

The types are specific enough to keep the content boundary explicit, but the resolver layer normalizes the data back into the app’s existing shapes.

## 10. Content fallback strategy

Fallback behavior is centralized in:

- [`src/lib/cms/siteContent.ts`](/C:/WebProjects/MedlinkVA/src/lib/cms/siteContent.ts)

Behavior:

- use Sanity content when the bundle is available
- fall back to the existing local content modules when Sanity is missing or empty
- keep the current site visible instead of showing blank sections

## 11. Team integration

CMS team members now populate the homepage team preview and the About page team grid when active records exist.

Fallback:

- the confirmed local team list remains available

## 12. Services integration

CMS services populate:

- the homepage services overview
- the Services page service cards
- the Services page structured data

Fallback:

- the six provisional local service cards remain available

## 13. Jobs integration

If published open jobs exist:

- the Jobs page renders structured job cards

If no records exist:

- the polished empty state remains visible

## 14. Classes integration

If upcoming or ongoing classes exist:

- the Classes page renders structured class cards

If no records exist:

- the polished empty state remains visible

## 15. Products integration

If active product links exist:

- the Products page renders product cards with external links

If no records exist:

- the polished empty state remains visible

## 16. Resources integration

If published resource posts exist:

- the Resources page renders article cards and derived categories

If no records exist:

- the polished empty state remains visible

## 17. Homepage CMS integration

Editable homepage fields currently mapped from Sanity:

- hero heading
- hero subheading
- trust items
- why heading
- why body
- final CTA heading
- final CTA text
- newsletter heading
- newsletter text

## 18. About CMS integration

Editable About fields currently mapped from Sanity:

- about intro
- mission
- vision
- values intro

## 19. FAQ/testimonial readiness

Schema and frontend readiness are in place.

- FAQs can be added and queried later
- testimonials can be added and queried later
- no fake testimonials are seeded
- no testimonial placeholder content is shown on the live site

## 20. SEO CMS integration

The existing `Seo` component remains in control of the metadata logic.

CMS-driven values currently affect:

- brand name fallback
- tagline fallback
- page descriptions where the resolver provides them
- social and contact identity used in the shell

Fallback behavior:

- existing page defaults remain in place when CMS values are absent

## 21. Image handling

Implemented in:

- [`src/lib/sanity/image.ts`](/C:/WebProjects/MedlinkVA/src/lib/sanity/image.ts)

CMS image references are converted with `@sanity/image-url`, while the local optimized assets remain the default fallback.

## 22. Client editing workflow

The intended workflow is:

1. Open Sanity Studio
2. Choose the relevant section in the `Medlink VA Content` navigation
3. Edit the record
4. Publish the change
5. Refresh the website to see the CMS content take over where available

Typical edits:

- update a service
- change mission/vision
- add a team member
- publish a job
- publish a class
- add a product link
- add a resource article
- update contact or social details

## 23. Security considerations

- no secrets are stored in source files
- no write tokens are exposed to the browser
- the frontend only reads public Sanity content
- the Studio holds the editing surface
- no custom authentication was added

## 24. Deferred CMS work

- detail routes for resources, jobs, classes, and products
- richer Portable Text rendering in the frontend
- seeded content import scripts
- Brevo integration
- Cloudflare Functions for lead capture

## 25. Technical debt

- the Studio build currently fails in this environment because Sanity’s CLI dependency chain trips over Node ESM package entrypoint resolution for `zod/mini`, then `jsdom`
- the frontend side is fully typechecked and production-built
- Studio typechecking passes, but build validation remains blocked by the upstream tooling issue

## 26. Validation summary

- Frontend typecheck: passed
- Frontend build: passed
- Studio typecheck: passed
- Studio build: failed due Sanity CLI dependency resolution issues in this environment
- Route verification: passed for the key public pages

## 27. Files of note

- [`src/lib/cms/siteContent.ts`](/C:/WebProjects/MedlinkVA/src/lib/cms/siteContent.ts)
- [`src/lib/cms/SiteContentProvider.tsx`](/C:/WebProjects/MedlinkVA/src/lib/cms/SiteContentProvider.tsx)
- [`src/lib/sanity/queries.ts`](/C:/WebProjects/MedlinkVA/src/lib/sanity/queries.ts)
- [`src/lib/sanity/types.ts`](/C:/WebProjects/MedlinkVA/src/lib/sanity/types.ts)
- [`sanity/sanity.config.ts`](/C:/WebProjects/MedlinkVA/sanity/sanity.config.ts)
- [`sanity/structure/index.ts`](/C:/WebProjects/MedlinkVA/sanity/structure/index.ts)
