# Homepage performance notes

## Production baseline

The supplied Cloudflare Web Analytics snapshot reports:

- Page load: approximately 1,303 ms
- LCP: 84% Good, 13% Needs Improvement, 3% Poor
- LCP P50: 932 ms; P75: 1,924 ms; P90: 3,124 ms; P99: 17,408 ms
- INP: 94% Good, 6% Needs Improvement, 0% Poor
- CLS: 100% Good

These are the comparison baseline. They are not reproduced or improved by a local build.

## Findings

The likely Homepage LCP element is the above-the-fold hero image or the adjacent hero heading, depending on viewport and browser. The hero image is already a small 95 KB, 1080 × 1080 JPEG and is rendered eagerly with explicit dimensions, `fetchPriority="high"`, `decoding="async"`, and a stable aspect-ratio container. It was intentionally left on the critical path.

The largest assets in the repository are primarily below-fold training, healthcare-support, Resources, and event images between approximately 1.2 MB and 2.0 MB. Homepage below-fold images already use lazy loading and asynchronous decoding. The 1.72 MB Official Launch cover is only inserted into the homepage modal after the existing 1.4-second promotion delay, so it is not requested during the initial Homepage render.

## Changes in this pass

- Added route-level `React.lazy` loading for non-Homepage pages in `src/routes/AppRoutes.tsx`.
- Kept Homepage, navigation, hero content, hero image priority, layout, animation, analytics, Sanity, Brevo, and event-promotion behavior intact.
- Preserved lazy loading and stable dimensions for below-fold Homepage images.
- Preserved the event promotion's delayed rendering, session dismissal, focus trap, Escape handling, and accessible dialog semantics.

## Bundle comparison

The pre-change production build emitted a main JavaScript chunk of approximately 771.24 KB minified / 213.60 KB gzip and showed the existing >500 KB warning.

After route-level splitting, the production build emits a main chunk of approximately 258.44 KB minified / 75.92 KB gzip. The route pages are emitted as separate chunks, including Services, Classes, Resources, Videos, event pages, certificate pages, and legal pages. The >500 KB warning no longer appears.

This is a build-level result, not a claim that production LCP or page load has improved. Cloudflare measurements must be collected after deployment and compared with the baseline above.

## Follow-up measurement

After deployment, compare Cloudflare Web Analytics for the Homepage at a similar traffic volume and review LCP P75/P90/P99, page load time, INP, and CLS. Also manually verify desktop, tablet, and mobile rendering, especially hero cropping, navigation, event promotion behavior, and absence of horizontal overflow.
## Site-wide Optimization Pass

This pass audited the public `/classes`, `/services`, service-detail, healthcare-audience, `/impact`, `/about`, `/resources`, resource-detail, `/products`, `/videos`, `/faqs`, event, `/contact`, and `/book-consultation` routes. Existing route-level React lazy loading was preserved.

### Training CTA and payment flow

The confirmed `Medical Virtual Assistance Class (Group Session)` programme now uses `trainingMode: "group"`, the verified payment URL `https://selar.com/8772p6865p`, and the customer-facing `Enrol & Pay` CTA. Other programme tiers are marked `one-on-one` and route to `Book a Training Consultation` with the scheduling and payment-next-steps helper text. Sanity class records can override this behavior with `trainingMode`, `paymentUrl`, and `paymentCtaLabel`; invalid or incomplete payment data falls back to the existing enquiry flow.

### Image derivatives

Oversized local public assets now have WebP derivatives with capped source widths: training visuals at 1400px, service/audience visuals at 1200px, resources at 900px, the group-class product at 800px, and the event cover at 1200px. Original files remain available as source assets. Representative reductions:

- `training-hero-learning.jpg`: 1,961 KB → `training-hero-learning.webp`: 101 KB.
- `medical-virtual-assistance-group-class.jpg`: 1,700 KB → `.webp`: 76 KB.
- `medlink-va-official-launch.png.png`: 1,680 KB → `.webp`: 83 KB.
- `vma-training.png`: 1,359 KB → `.webp`: 42 KB.
- `family-medicine-hero.png`: 1,835 KB → `.webp`: 71 KB.

The derivatives are used by training, service, audience, resource, product, and event references. Below-fold images retain lazy loading and asynchronous decoding. Training visuals now include explicit dimensions and stable aspect-ratio containers. Hero/LCP behavior remains controlled by the shared `PageHero`; no blanket high-priority loading was added.

### Layout and validation notes

Training and audience visuals retain their approved visual treatment, with fixed aspect-ratio containers to protect CLS and controlled card heights for product thumbnails. No synchronous browser image processing or external image CDN was introduced. These are build/source optimizations; no live Core Web Vitals improvement is claimed until new production measurements are collected.

Remaining intentionally-large originals are retained in the repository for source-quality and future editing needs; public references use the WebP derivatives where generated.