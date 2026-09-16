# Resource content review workflow

Resource review is an editorial reminder system, not an automatic publishing system.

## Suggested review intervals

- AI & Automation: 30 days
- Privacy and HIPAA awareness: 30 days
- Remote Patient Monitoring: 45 days
- Insurance & Billing: 60 days
- Healthcare Administration: 75 days
- Practice Workflows: 90 days
- Career Development: 90 days
- VMA Training: 90 days

The interval is stored as `reviewIntervalDays` in Sanity. `publishedAt` remains the original publication date; `lastReviewedAt` records the latest editorial review. `reviewStatus` is internal editorial metadata and is not shown publicly.

## Safe update flow

trusted source → scheduled check → detect a meaningful change → create a Sanity draft/update candidate → human review → publish

Editors may store authoritative reference URLs in `sourceLinks`. These links are internal editorial context and are not automatically rendered on the public site. External articles must never be copied or published automatically.

Useful source types include official government guidance, professional associations, payer documentation, product documentation, and other primary or authoritative references appropriate to the topic. Editors should verify the date, scope, audience, and practical implications before updating a resource.

Sanity drafts should be used for review, comparison, and approval. The public site continues to use the published Sanity document; local starter resources are only a fallback when no published Sanity resources exist.

A future Cloudflare Worker or cron job could check trusted source metadata and create an editorial notification or draft candidate. It must not overwrite public content, copy external article text, or publish without human review.
