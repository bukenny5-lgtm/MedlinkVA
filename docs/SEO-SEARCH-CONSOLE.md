# SEO and Search Console Handover

## SEO architecture

Public pages use the reusable `src/components/Seo.tsx` helper. It writes the page title, description, robots directive, production canonical URL, Open Graph metadata, X/Twitter card metadata, and JSON-LD into the document head. Canonicals always use `https://medlinkva.com` and the current pathname, even during local development.

The site remains a Vite React SPA. Cloudflare Pages serves `public/_redirects` so direct navigation falls back to `index.html`; client-side routes then render their page metadata.

## Page metadata and canonical URLs

The primary indexable pages are:

| Route | Metadata focus | Canonical |
| --- | --- | --- |
| `/` | Virtual Medical Assistant training and healthcare support | `https://medlinkva.com/` |
| `/about` | About MedLink VA | `https://medlinkva.com/about` |
| `/services` | Virtual Medical Assistant and healthcare administrative support | `https://medlinkva.com/services` |
| `/classes` | Virtual Medical Assistant training | `https://medlinkva.com/classes` |
| `/resources` | Healthcare administration and VMA resources | `https://medlinkva.com/resources` |
| `/products` | Templates, guides, and training resources | `https://medlinkva.com/products` |
| `/contact` | Contact MedLink VA | `https://medlinkva.com/contact` |
| `/book-consultation` | Consultation requests | `https://medlinkva.com/book-consultation` |
| `/verify` | Certificate verification utility | `https://medlinkva.com/verify` |

Certificate token routes use `noindex,follow`; individual verification results are utility pages and are excluded from the sitemap. Jobs use `noindex,follow` while recruitment is paused and no active legitimate jobs are published. If active jobs are published later, the route can become indexable and be reconsidered for the sitemap.

## Robots and sitemap

`public/robots.txt` allows public crawling and points to `https://medlinkva.com/sitemap.xml`. It does not block CSS or JavaScript assets.

`public/sitemap.xml` contains the public marketing, consultation, verification-entry, and current starter resource detail routes above. It excludes certificate token URLs, Sanity Studio, API routes, paused jobs, and private/admin paths. Class and product detail routes are not separate public routes in the current application, so no invented URLs are included. If Sanity later exposes additional public detail pages, update the sitemap from the published route model.

## Structured data

The shared SEO helper emits truthful `Organization` and `WebSite` JSON-LD using the production URL, MedLink VA name, existing logo, `info@medlinkva.com`, and `+256785724420`. Services emit Service objects from the existing service content. No ratings, reviews, addresses, certifications, founding date, employee counts, or SearchAction are claimed. Course schema is deferred because the current class data is not a sufficiently stable public course catalogue.

## Bing Webmaster Tools handoff

Bing ranking should not be manipulated or expected to change immediately. After the production build is deployed:

1. Add or import `medlinkva.com` in Bing Webmaster Tools.
2. Use URL Inspection for `https://medlinkva.com/` and inspect the live URL.
3. Request indexing if Bing reports that it is appropriate.
4. Submit `https://medlinkva.com/sitemap.xml`.
5. Check the production `robots.txt` response and run Bing Site Scan.
6. Review indexing status after Bing has processed the sitemap and crawl requests.

## Google Business Profile manual corrections

Google Business Profile cannot be updated from this repository. An authorised profile manager should manually review and correct:

- Website: `https://medlinkva.com/`
- Official phone: `+256 785 724 420`
- WhatsApp: `https://wa.me/256785724420`
- Description, primary and secondary categories, and hours
- Current logo and current photos
- Services list
- LinkedIn, Facebook, and TikTok links, using only profiles already verified by the business
- Appointment or consultation URL, if the account/category/region supports it: `https://medlinkva.com/book-consultation`
- Event or update posts
- Genuine review collection without incentives or fabricated reviews

Category-specific fields, appointment features, and WhatsApp options depend on Google account and regional availability.

## Search Console setup

Use Domain property verification for `medlinkva.com` through Cloudflare DNS:

1. Open Google Search Console.
2. Add the property `medlinkva.com`.
3. Choose **Domain property**.
4. Copy the TXT record Google provides.
5. Add that TXT record in Cloudflare DNS.
6. Return to Search Console and verify.
7. Submit `https://medlinkva.com/sitemap.xml`.
8. Inspect the homepage and request indexing.
9. Inspect and request indexing for `/about`, `/services`, `/classes`, `/resources`, `/products`, and `/contact`.
10. Do not submit individual certificate token URLs.

No verification token or DNS record is included in the codebase.

## Indexing priorities and expectations

Start with the homepage and major public pages, prioritising branded searches such as “MedLink VA”, “MedLink VA training”, and “MedLink Virtual Medical Assistant”. Longer-term topical opportunities include virtual medical assistant training, healthcare virtual assistant training, medical administrative assistant training, virtual medical receptionist support, and healthcare administrative support. These should be addressed through useful content over time, not repeated keyword stuffing.

SEO improvements do not guarantee a first Google position. Search Console coverage, content quality, links, competition, page experience, and time all affect results.

## GA4 key-event recommendations

The application preserves the existing event names and does not designate key events in code. Configure these in GA4 Admin after verifying production traffic:

- Primary: `consultation_submit`, `contact_submit`, `training_checkout_click`, `training_whatsapp_click`, `event_registration_click`
- Secondary: `newsletter_signup`

Keep `page_view`, `scroll`, `service_open`, `promotion_view`, `promotion_dismiss`, and `cta_click` as normal engagement events.

## Performance and accessibility observations

The current build keeps the main JavaScript chunk below the previous 500 kB warning threshold. Existing content images use meaningful alt text, explicit dimensions on major hero/team images, and lazy loading below the fold. Product/resource CMS images use bounded Sanity transforms with automatic modern-format negotiation and a default quality setting; supplied alt text remains the source of truth.

## Post-launch checks

- Confirm the apex domain and `www` redirect resolve correctly.
- Fetch `/robots.txt` and `/sitemap.xml` from production.
- Inspect page titles, descriptions, canonical URLs, robots directives, Open Graph tags, and JSON-LD on the major routes.
- Validate JSON-LD with Google's Rich Results Test where applicable.
- Check Search Console indexing and excluded-page reasons.
- Confirm certificate token pages remain `noindex,follow`.
- Revisit the jobs decision when legitimate published openings exist.
