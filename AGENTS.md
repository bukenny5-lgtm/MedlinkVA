# Codex Instructions — Medlink VA

## Working principles

1. Read docs/REQUIREMENTS.md before making architectural or UI decisions.
2. Make small, reviewable changes.
3. Do not introduce unnecessary backend infrastructure.
4. Do not add PostgreSQL or Express unless explicitly requested.
5. Do not fabricate business facts.
6. Preserve the client's brand colors:
   - sky blue
   - accent blue
   - white
7. Prioritize:
   - professional design
   - conversion
   - accessibility
   - responsive design
   - SEO
   - performance
8. Keep the site compatible with Cloudflare Pages.
9. Do not commit secrets or API keys.
10. Use environment variables for external service credentials.
11. Do not add paid services without approval.
12. Explain significant architectural decisions before implementing them.
13. Run TypeScript/build checks after meaningful implementation phases.
14. Do not rewrite working modules unnecessarily.
15. Keep Git commits focused and descriptive.

## Content policy

Draft professional marketing copy where required, but do not invent:
- testimonials
- certifications
- customer counts
- awards
- regulatory compliance claims
- business history
- partnerships

Use clearly marked editable placeholders where factual client information is missing.

## CMS

The planned CMS is Sanity.

Do not build a custom CMS/admin/database unless explicitly requested.

## Marketing

Brevo is planned for email lead capture and marketing.

Do not expose Brevo API keys in frontend code.

## Current phase

Project foundation only.
