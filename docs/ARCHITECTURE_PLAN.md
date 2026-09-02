# Medlink VA Architecture Plan

Status: Phase 1 planning only  
Date: 2026-09-02  
Scope: architecture, information structure, visual direction, CMS boundaries, SEO, conversion, and delivery phases

## 1. Executive Summary

Medlink VA should launch as a professional, conversion-focused marketing site that is easy to extend into a CMS-driven publishing platform. The right v1 approach is a static-first React site built with Vite, TypeScript, and Tailwind CSS, deployed to Cloudflare Pages, with Sanity providing structured content editing and Brevo handling email capture and marketing automation.

This foundation keeps the project lean:

- no custom database
- no custom backend application server
- no Express
- no PostgreSQL

That fits the current business stage and reduces maintenance risk while preserving room for future growth.

## 2. Recommended Sitemap

### Public pages

- `/` - Home
- `/about` - About Medlink VA
- `/contact` - Contact / consultation request
- `/privacy-policy` - Privacy policy
- `/terms-of-use` - Terms of use

### SEO-oriented service pages

Create one overview page and one page per core service area once the client confirms service scope.

- `/services` - Services overview
- `/services/virtual-medical-assistant`
- `/services/administrative-support`
- `/services/patient-scheduling`
- `/services/email-phone-support`
- `/services/referral-support`
- `/services/claims-support`
- `/services/custom-virtual-support`

If the actual offering list differs, these URLs should be adjusted to the client-approved menu rather than invented in code.

### Jobs section

- `/jobs` - Open roles overview
- `/jobs/[slug]` - Individual job detail pages

### Classes section

- `/classes` - Classes overview
- `/classes/[slug]` - Individual class detail pages

### Resources / blog

- `/resources` - Resources index
- `/resources/[slug]` - Blog post or resource detail pages

### Products section

- `/products` - Products overview
- `/products/[slug]` - External product link detail page

### Conversion and support pages

- `/consultation` - Dedicated consultation flow or inquiry landing page
- `/thank-you` - Post-submit confirmation page

### Optional future pages

- `/faq`
- `/team`
- `/testimonials` only if the client later supplies approved testimonial content

## 3. Recommended Homepage Structure

The homepage should follow a clear conversion path while still supporting SEO and trust.

### Exact section order

1. Header / navigation
2. Hero section
3. Trust strip
4. Core services overview
5. Why Medlink VA section
6. Featured image-led story or about section
7. Services detail preview
8. Classes preview
9. Jobs preview
10. Products preview
11. Lead capture / newsletter section
12. FAQ preview
13. Final consultation CTA
14. Footer

### Purpose of each section

#### 1. Header / navigation

- Provide immediate orientation
- Keep primary paths visible
- Use one prominent CTA button

#### 2. Hero section

- Communicate who Medlink VA serves
- Summarize the main value proposition
- Present the primary conversion action

#### 3. Trust strip

- Reinforce credibility without making unsupported claims
- Highlight service themes, responsiveness, professionalism, and support scope

#### 4. Core services overview

- Give visitors a fast scan of what Medlink VA helps with
- Support SEO with descriptive internal linking

#### 5. Why Medlink VA section

- Explain benefits in human terms
- Reduce friction before the visitor reaches the form

#### 6. Featured image-led story or about section

- Introduce the business in a warmer, more personal way
- Use the main hero-style client photo or the second individual photo depending on the storytelling need

#### 7. Services detail preview

- Expand on service categories
- Send users to dedicated service pages for SEO and conversion

#### 8. Classes preview

- Surface educational offerings early enough to matter, but not at the cost of the primary lead-gen flow

#### 9. Jobs preview

- Support hiring visibility and content freshness
- Keep it secondary to lead generation

#### 10. Products preview

- Promote externally sold products without making the site feel commerce-heavy

#### 11. Lead capture / newsletter section

- Collect email addresses
- Offer ongoing value through updates, resources, and announcements

#### 12. FAQ preview

- Reduce hesitation
- Provide quick answers to common pre-contact questions

#### 13. Final consultation CTA

- Close the page with a decisive next step
- Reinforce the primary conversion path

#### 14. Footer

- Repeat essential links
- Support compliance, contact, and navigation

### Primary CTA

- `Book a Consultation` or `Request a Consultation`

### Secondary CTA

- `Join the Email List`
- `View Services`

### Image usage plan

- Main virtual-medical-assistant headset photo: hero section
- Individual VA photo: about/why Medlink VA section or a service storytelling section
- Team photo: trust section, team section, or services overview where collaboration matters
- Logo: header, footer, social sharing previews, favicon family, and email signup confirmation branding

### Sections primarily for conversion

- Hero
- Consultation CTA
- Lead capture section
- Final CTA
- Service preview cards with linked deep pages

### Sections primarily for SEO / trust

- Services overview
- FAQ preview
- About / why Medlink VA
- Resources preview
- Jobs / classes / products previews

## 4. Proposed Visual System

### Color roles

Use the existing brand palette as functional roles rather than decorative color everywhere.

- Sky blue: primary brand highlight, soft backgrounds, accent surfaces
- Accent blue: buttons, links, active states, key emphasis
- White: page background, clean content surfaces, spacious card interiors
- Navy / charcoal: body text, headings, contrast overlays, footer, and high-trust sections

Suggested working tokens, to be refined against the logo:

- `--color-sky`: `#7EC8F8`
- `--color-accent`: `#1D72B8`
- `--color-navy`: `#12324A`
- `--color-charcoal`: `#24313D`
- `--color-white`: `#FFFFFF`

### Typography recommendation

- Use a modern sans-serif with excellent readability and broad language support.
- Prefer a clean, professional face with good weight range for headings and body copy.
- Keep line lengths comfortable and avoid overly condensed letter spacing.

Suggested approach:

- Headings: a strong geometric or humanist sans-serif
- Body: a highly legible UI sans-serif
- Use 2 font families maximum

### Spacing and layout philosophy

- Mobile-first by default
- Generous whitespace around sections and cards
- Strong content hierarchy with clear vertical rhythm
- Avoid dense multi-column layouts on smaller screens
- Keep sections visually distinct with subtle background shifts, not heavy borders

### Card and button style

- Cards: rounded corners, soft shadow, light border, breathable padding
- Buttons: high-contrast, medium-radius, large tap targets, visible hover/focus states
- Primary button: solid accent blue with white text
- Secondary button: white or transparent with blue outline

### Mobile-first considerations

- Prioritize a single-column reading flow
- Keep CTAs sticky or repeated where appropriate
- Ensure form fields are large enough for touch input
- Avoid heavy hero copy that forces excessive scrolling before action

### Accessibility considerations

- Maintain strong color contrast for text and controls
- Use semantic headings in sequence
- Provide clear focus states
- Label every form field explicitly
- Avoid conveying meaning by color alone
- Keep alt text descriptive and content-appropriate

### Inclusive visual guidance

- Show diverse, respectful professional imagery
- Avoid stock visuals that feel overly corporate or stereotyped
- Keep the site welcoming to broad audiences
- Use language and imagery that emphasize support, clarity, and professionalism

## 5. Frontend Architecture

### Recommended page/component structure

Create a small set of page types and compose them from reusable sections.

- Layout shell
- Navigation
- Footer
- Hero section
- Section heading component
- CTA block
- Service card
- Resource card
- Job card
- Class card
- Product card
- FAQ accordion
- Form components
- Testimonial block, only when approved testimonials exist

### Proposed folder structure

```txt
src/
  assets/
  components/
    layout/
    sections/
    ui/
  content/
    services/
    jobs/
    classes/
    products/
    resources/
    site/
  data/
  lib/
  pages/
  routes/
  styles/
```

### Routing strategy

- Use straightforward path-based routes for public pages
- Keep dynamic routes for services, jobs, classes, products, and resources
- Prefer descriptive slugs for SEO

### Reusable component strategy

- Build presentational components once and reuse them across pages
- Keep content passed in through props or content objects
- Separate layout logic from data-fetching logic
- Avoid coupling page content to one-off components

### Where static content should live before CMS integration

Before Sanity is connected, store structured content in local TypeScript data modules or JSON-like content objects under `src/content` or `src/data`. This keeps the project CMS-ready without forcing premature backend work.

### How to keep the project CMS-ready

- Define content schemas early
- Keep fields shaped around future CMS models
- Avoid embedding copy directly inside complex component markup
- Use data-driven page rendering patterns
- Preserve a clear boundary between layout code and content data

## 6. Sanity CMS Boundary

### Client-editable content

The client should eventually be able to edit:

- services
- service summaries
- jobs
- classes
- products / external product links
- blog posts / resources
- FAQs
- team member profiles
- homepage featured content
- selected images
- site settings
- navigation labels
- contact details
- newsletter/signup text

### Developer-controlled content

Developer-controlled content should include:

- layout structure
- routing
- visual system
- spacing and component behavior
- accessibility implementation
- SEO metadata patterns
- form validation logic
- integration code
- security-sensitive form handling
- analytics wiring

### Proposed Sanity content types

- `service`
- `job`
- `class`
- `productLink`
- `blogPost`
- `testimonial`
- `faq`
- `teamMember`
- `siteSettings`
- `homepageContent`

### Notes on each content type

- `service`: title, slug, summary, body, featured image, CTA label, SEO fields
- `job`: title, slug, department, location, summary, responsibilities, requirements, application CTA, status
- `class`: title, slug, date or cadence, audience, summary, registration CTA, featured image
- `productLink`: title, slug, description, external URL, image, category
- `blogPost`: title, slug, excerpt, body, author, publish date, SEO fields, featured image
- `testimonial`: only use if the client supplies approved, authentic testimonial text
- `faq`: question, answer, optional grouping
- `teamMember`: name, role, bio, photo, display order
- `siteSettings`: logo, contact details, social links, CTA labels, sitewide text
- `homepageContent`: hero copy, feature order, section toggles, spotlight selections

## 7. Brevo Integration Plan

### Newsletter / email capture

- Use a simple email signup form with clear consent language
- Send captured leads to Brevo lists or segments
- Confirm what the user is signing up for before submission

### Lead capture

- Capture name, email, role or interest area, and optional message
- Map form submissions to Brevo contacts and tags
- Use separate tags for newsletter, consultation request, jobs interest, and classes interest

### Lead segmentation

Suggested tags:

- `newsletter`
- `consultation`
- `services-interest`
- `jobs-interest`
- `classes-interest`
- `products-interest`

### Consultation / contact form handling

- Use a server-side or edge-function based submission flow
- Validate inputs before sending to Brevo
- Route the data to the correct list or workflow

### What must not be exposed in frontend code

- Brevo API keys
- private SMTP credentials
- webhook secrets
- any long-lived authentication tokens

### Secure server-side mechanism

Cloudflare Functions or an equivalent server-side edge function is appropriate for protected API calls. That keeps secret credentials out of the browser and works well with Cloudflare Pages.

## 8. SEO Plan

### Metadata

- Unique title and description for every indexable page
- Canonical URLs
- Open Graph title, description, and image
- Twitter card metadata

### Page titles and descriptions

- Write page titles around the service or content goal first
- Keep titles concise and descriptive
- Make descriptions invitation-oriented, not keyword-stuffed

### Semantic headings

- One `h1` per page
- `h2` for major sections
- `h3` for subpoints within cards or subsections
- Keep heading order logical and consistent

### Clean URLs

- Use short, descriptive slugs
- Keep plural index pages and singular detail pages predictable

### Internal linking

- Link homepage sections to their detail pages
- Cross-link services to related resources and FAQs
- Link blog posts back to services and contact pages

### Sitemap

- Generate a sitemap including all indexable public pages
- Include service, job, class, resource, and product detail pages when they exist

### robots.txt

- Allow search engine crawling of public pages
- Block admin or staging paths if they are ever introduced later

### Open Graph

- Use a branded share image
- Add page-specific OG titles and descriptions for high-value pages

### Structured data opportunities

- Organization
- Website
- BreadcrumbList
- Article for blog posts
- FAQPage for FAQ sections
- JobPosting for jobs, if the content meets the markup requirements
- Course for classes, if the class content is sufficiently structured

### Blog / content strategy

- Publish educational content about virtual medical assistant support, workflow organization, admin efficiency, and practice support topics
- Build topic clusters around core services
- Use blog posts to support service pages and long-tail search traffic

### Service-page strategy

- One page per service cluster
- Each page should answer what the service is, who it helps, benefits, process, and next step
- Include internal links to related FAQs and resources

### Image alt text

- Describe what is actually shown
- Include contextual relevance when appropriate
- Avoid keyword stuffing

### Performance / Core Web Vitals

- Compress and resize images
- Prefer modern formats where appropriate
- Keep JS bundles lean
- Avoid heavy animation or client-side-only rendering for critical content
- Preserve fast LCP with a strong static hero and optimized image pipeline

## 9. Conversion Strategy

### Lead magnets

Potential lead magnets should be simple and practical, for example:

- a short guide to organizing virtual medical support
- a checklist for choosing a virtual assistant partner
- a workflow tip sheet for busy practices

### Newsletter capture

- Offer a clear reason to subscribe
- Place signup opportunities in the footer, homepage mid-section, and resource pages

### Consultation CTAs

- Primary CTA throughout the site
- Repeated in hero, mid-page, and final section
- Keep form friction low

### Jobs / classes / product CTAs

- Use secondary CTAs to avoid diluting the primary lead-gen goal
- Make each content type easy to find without overwhelming the homepage

### Trust-building elements

- Service clarity
- Professional photography
- Clean design
- Helpful FAQs
- Thoughtful copy
- Client-editable placeholders where facts are missing

### Form placement

- Hero CTA
- Mid-page CTA
- Footer CTA
- Dedicated contact page form

### Mobile CTA behavior

- Keep one primary action visible at a time
- Make buttons large enough for thumbs
- Avoid burying contact access under multiple taps

## 10. Form / Data Strategy

### What data should be collected

- name
- email
- phone number, only if truly needed
- business or organization name, if relevant
- interest category
- message

### What should not be collected

- unnecessary sensitive medical information
- patient diagnoses
- treatment details
- insurance information
- personally sensitive health data from public forms

### Privacy considerations

- collect the minimum data needed to respond
- explain why data is requested
- link to privacy policy near the form
- store only what the business genuinely needs

### Anti-spam strategy

- use Cloudflare Turnstile
- add server-side validation
- rate-limit submissions where possible
- avoid exposing direct third-party submission endpoints in the browser

### Healthcare-sensitive information

- Public forms should not ask for patient medical details
- If a form ever needs to handle sensitive operational intake, it should be carefully scoped and reviewed before launch

### Recommendation

Public lead forms should stay focused on contact and business inquiry, not patient intake.

## 11. Image Strategy

### Assign current client images to sections

- Headset/laptop virtual medical professional: hero
- Individual VA photo: about, story, or “why Medlink VA” section
- Team photo: trust, teamwork, services, or footer feature panel
- Logo: header, footer, favicon set, social preview branding

### Optimization approach

- Resize images to target display widths
- Compress for web delivery
- Serve responsive sizes
- Preserve enough quality for a professional healthcare brand

### Responsive image approach

- Use `srcset` or framework-equivalent responsive image handling
- Provide smaller crops for mobile
- Avoid loading oversized desktop assets on small devices

### Naming conventions

- Use descriptive, lowercase, hyphenated names
- Example: `medlink-va-hero.jpg`, `medlink-va-team.jpg`

### Whether more imagery should be added later

Yes. A few additional supporting images would help broaden the visual narrative later, especially for:

- blog posts
- services
- classes
- product features
- team and process content

However, the current supplied assets are enough to launch the foundation cleanly.

## 12. Recommended Build Phases

### Phase 1 - Planning

- confirm sitemap
- define content boundaries
- approve visual direction
- finalize CMS fields on paper

### Phase 2 - React / Vite foundation

- set up app shell
- configure routing
- establish TypeScript and Tailwind structure

### Phase 3 - Design system / layout

- implement typography, spacing, buttons, cards, and sections
- create the shared layout

### Phase 4 - Homepage

- build the conversion-focused homepage
- place supplied images strategically

### Phase 5 - Secondary pages

- services
- about
- contact
- privacy
- terms
- resources
- jobs
- classes
- products

### Phase 6 - CMS

- connect Sanity
- migrate content into schemas
- keep layout code stable

### Phase 7 - Brevo / forms

- implement newsletter capture
- implement consultation form handling
- connect segmentation and tags

### Phase 8 - SEO / performance / accessibility

- metadata
- structured data
- image optimization
- accessibility review
- Core Web Vitals tuning

### Phase 9 - Cloudflare deployment

- configure Pages
- verify routing
- connect domain and environment variables

### Phase 10 - QA / client handoff

- content review
- browser testing
- form testing
- launch checklist
- handoff notes

## 13. Risks and Expected Challenges

- Missing client content may delay final page copy and service taxonomy
- CMS complexity can grow if too many editable fields are exposed too early
- Lead capture security requires careful server-side handling
- SPA-style SEO limitations must be mitigated with proper pre-rendering, routing, metadata, and crawlable content
- Performance can suffer if images are not compressed and resized correctly
- Inclusive design requires deliberate review, not just color choices
- Content governance will matter once the client starts editing on their own
- Future scaling may require stronger content workflows, but not a database right now

## 14. Decisions and Recommendations

### Is React + Vite appropriate?

Yes. For a modern marketing site with structured content, static-first delivery, and Cloudflare Pages hosting, React + Vite remains a good fit.

### Should Tailwind be used?

Yes. Tailwind is a strong choice here because it supports fast UI iteration, consistent spacing, and a maintainable component system for a design-driven marketing site.

### Is Sanity appropriate?

Yes. Sanity fits the planned content model well, especially for services, jobs, classes, products, blog content, and selective homepage editing.

### Is a custom backend/database unnecessary for v1?

Yes. The current requirements do not justify a custom database or application server.

### Is Cloudflare Pages free tier appropriate?

Yes, for the initial launch it is a sensible fit, assuming the traffic and integration needs stay within the platform limits.

### Is Brevo appropriate for marketing lead capture?

Yes. Brevo is a good fit for newsletters, lead capture, segmentation, and marketing automation, provided secrets stay server-side.

## 15. Open Questions for the Client

- Final service list
- Exact consultation CTA wording
- Whether jobs, classes, and products are all needed at launch or phased in
- Whether there is a preferred lead magnet
- Which contact fields are mandatory
- Whether testimonials will be supplied later
- Whether a team page should be separate from the About page
- Whether the resources section should launch with 0, 1, or multiple posts

## 16. Files Inspected

- `AGENTS.md`
- `docs/REQUIREMENTS.md`
- `README.md`
- `assets/client/photos/medlink-va-hero.jpg`
- `assets/client/photos/medlink-va-team.jpg`
- `assets/client/photos/medlink-va-individual-assistant.jpg`
- `assets/client/logo/medlink-va-logo.png`
- `traces/codex/phase-01-foundation.txt`

## 17. Files Created

- `docs/ARCHITECTURE_PLAN.md`

## 18. Files Modified

- `docs/ARCHITECTURE_PLAN.md`

## 19. Key Architecture Recommendations

- Keep the site static-first with React + Vite, TypeScript, Tailwind, and Cloudflare Pages
- Use Sanity for structured content editing, not a custom CMS
- Use Brevo for lead capture and email marketing, with server-side handling for secrets
- Avoid a custom database or backend in v1
- Build the homepage as a conversion-first, SEO-supporting narrative with clear CTAs
- Store the current client content in local data modules until CMS migration begins
- Protect healthcare-sensitive information by keeping public forms minimal
- Optimize images and metadata from the start to support SEO and performance

## 20. Unresolved Questions

- Exact service taxonomy
- Final copy for hero and CTA labels
- Which content types are mandatory for launch versus later phases
- Whether the client wants a dedicated team page
- Whether testimonials will be added later
- Whether any special legal or privacy language is required beyond standard policy pages
