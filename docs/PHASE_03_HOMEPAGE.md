# Phase 3 Homepage

Status: implemented
Date: 2026-09-02

## 1. Homepage sections

The homepage is implemented in this order:

1. Header / navigation
2. Hero
3. Trust / value strip
4. Services overview
5. Why Medlink VA
6. How It Works
7. Who We Serve
8. Healthcare support / team capability section
9. Meet the Team preview
10. Featured Classes preview
11. Current Jobs preview
12. Products preview
13. Resources / Blog preview
14. Newsletter / email lead-capture section
15. Final consultation CTA
16. Footer

## 2. Design system decisions

- White remains the dominant background color.
- Sky blue is used for supportive backgrounds and subtle emphasis.
- Accent blue is used for primary CTAs and important interactive states.
- Navy is used for headings and strong text contrast.
- Charcoal is used for body copy.
- Cards use soft borders, rounded corners, and restrained shadows.
- The layout uses generous spacing and avoids crowded section composition.
- The design intentionally stays healthcare-professional rather than generic SaaS.

## 3. Client photographs used

- `assets/client/photos/medlink-va-hero.jpg` for the hero section
- `assets/client/photos/medlink-va-individual-assistant.jpg` for the Why Medlink VA section
- `assets/client/photos/medlink-va-team.jpg` for the healthcare support / team capability section
- `assets/client/logo/medlink-va-logo.png` for the header and footer branding

## 4. Team members implemented

- Racheal O Mulinde, CEO
- Deborah Kayode Ibukunoluwa, Training Assistant
- Teniola Sonibare, Training Assistant
- Toluwase Temidayo, Virtual Administrative Assistant

No biographies, qualifications, or claims were invented.

## 5. Team content architecture

- Centralized team content lives in `src/content/team.ts`.
- The structure is strongly typed and ready to map to a future Sanity `teamMember` document type.
- Each team object contains:
  - name
  - role
  - image
  - alt
  - shortBio
  - featured
  - displayOrder
- `shortBio` remains optional and is unused unless the client later provides approved copy.

## 6. Provisional content strategy

- Homepage marketing copy is provisional but professional.
- Unsupported factual claims are avoided.
- Editorial placeholder content is used for classes, jobs, products, and resources.
- The home content layer is centralized in `src/content/home.ts`.
- Route-page placeholder content remains centralized in `src/content/pages.ts`.

## 7. Component structure

The homepage is split into section-level components:

- `src/components/home/HeroSection.tsx`
- `src/components/home/TrustStrip.tsx`
- `src/components/home/ServicesOverview.tsx`
- `src/components/home/WhyMedlinkSection.tsx`
- `src/components/home/HowItWorksSection.tsx`
- `src/components/home/WhoWeServeSection.tsx`
- `src/components/home/TeamSupportSection.tsx`
- `src/components/home/MeetTeamSection.tsx`
- `src/components/home/ClassesPreview.tsx`
- `src/components/home/JobsPreview.tsx`
- `src/components/home/ProductsPreview.tsx`
- `src/components/home/ResourcesPreview.tsx`
- `src/components/home/NewsletterSection.tsx`
- `src/components/home/FinalCtaSection.tsx`

Shared helpers include:

- `src/components/home/HomeSection.tsx`
- `src/components/home/SectionHeading.tsx`

## 8. Responsive behavior

- Hero content stacks cleanly on smaller screens.
- Navigation remains usable through the existing desktop and mobile menu.
- Team cards reflow into smaller grids on tablet and mobile.
- Preview cards stay readable without horizontal scrolling.
- Images use fixed aspect ratios and object-fit handling to reduce layout shift.
- The final CTA and newsletter section remain prominent on mobile.

## 9. Accessibility implementation

- Semantic page sections and headings are used throughout the homepage.
- Links and buttons remain distinct and correctly labeled.
- The existing mobile menu stays keyboard-accessible.
- Focus states are visible on key interactions.
- Images have descriptive, factual alt text.
- The newsletter form includes explanatory text and a clear preview-only state.

## 10. SEO changes

- Homepage title is set to `Medlink VA | Virtual Medical Assistant Support`.
- Homepage meta description is specific and non-keyword-stuffed.
- `Seo` now supports page-specific social image metadata.
- The hero image is used as the homepage social preview image.
- Canonical handling remains in place from the foundation phase.
- The homepage content is semantic and structured for future SEO expansion.

## 11. Newsletter placeholder behavior

- The newsletter UI is frontend-only in this phase.
- No Brevo integration is active yet.
- Submitting the form does not pretend that email delivery succeeded.
- The interface explicitly states that the form is a preview and will connect later.

## 12. Image optimization status

- The homepage uses the supplied client assets without modifying the originals.
- Images are rendered with explicit aspect ratios and object-fit behavior.
- The hero image loads eagerly; below-the-fold images load lazily.
- A future optimization pass should reduce the logo file size and consider web-focused derivatives.

## 13. CMS-readiness

- Content is centralized rather than scattered across JSX.
- Team data is in a structure that can map cleanly to Sanity later.
- Section components stay presentation-focused.
- Placeholder route content remains isolated and easy to replace with CMS queries.

## 14. Deferred integrations

- Sanity CMS
- Brevo email capture
- Cloudflare Functions
- consultation form backend handling
- any custom backend or database

## 15. Technical debt

- The logo asset is still relatively large in production output.
- No transparent or cropped logo variant exists yet.
- The newsletter form is intentionally non-functional until the marketing stack is added.
- Team page routing was not introduced because the current brief asked to avoid a new route unless justified.
