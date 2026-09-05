# Phase 7 Lead Capture

Status: implemented without live Brevo credentials
Date: 2026-09-04

## 1. Architecture

- The React app posts lead data to same-origin Cloudflare Pages Functions.
- Cloudflare Functions validate the payload server-side and either forward it to Brevo or fail safely with a configuration error.
- Brevo API keys are never referenced in frontend code.
- The frontend shows loading, success, and error states for all three forms.
- Missing Brevo configuration returns a clear 503 configuration response instead of a fake success.

## 2. Form entry points

- Newsletter form: [`src/components/home/NewsletterSection.tsx`](/C:/WebProjects/MedlinkVA/src/components/home/NewsletterSection.tsx)
- Contact form: [`src/pages/ContactPage.tsx`](/C:/WebProjects/MedlinkVA/src/pages/ContactPage.tsx)
- Consultation request form: [`src/pages/BookConsultationPage.tsx`](/C:/WebProjects/MedlinkVA/src/pages/BookConsultationPage.tsx)

## 3. Cloudflare Function routes

- `/api/newsletter` -> [`functions/api/newsletter.ts`](/C:/WebProjects/MedlinkVA/functions/api/newsletter.ts)
- `/api/contact` -> [`functions/api/contact.ts`](/C:/WebProjects/MedlinkVA/functions/api/contact.ts)
- `/api/consultation` -> [`functions/api/consultation.ts`](/C:/WebProjects/MedlinkVA/functions/api/consultation.ts)

Shared function helpers:

- [`functions/_shared/leadCapture.ts`](/C:/WebProjects/MedlinkVA/functions/_shared/leadCapture.ts)

## 4. Existing form fields

Newsletter:

- email
- honeypot field: `website`

Contact:

- first name
- last name
- email
- phone
- practice / organization name
- service of interest
- message
- honeypot field: `website`

Consultation:

- first name
- last name
- work email
- phone
- practice / organization
- practice type
- services of interest
- preferred contact method
- general support needs
- availability note
- honeypot field: `website`

## 5. Brevo design

- The server uses Brevo contact creation/update for all three lead types.
- `updateEnabled: true` avoids duplicate-breaking behavior for repeat submissions.
- Each lead type maps into a dedicated Brevo list ID.
- Standard contact fields are used where possible:
  - `FIRSTNAME`
  - `LASTNAME`
  - `SMS`
  - `COMPANY`
- Additional lead metadata is stored in custom Brevo attributes.

## 6. Environment variables required

Frontend build/runtime placeholders:

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SANITY_API_VERSION`

Cloudflare Pages production variables:

- `BREVO_API_KEY`
- `BREVO_NEWSLETTER_LIST_ID`
- `BREVO_CONTACT_LIST_ID`
- `BREVO_CONSULTATION_LIST_ID`

Notes:

- The list IDs must be numeric values accepted by Brevo.
- The API key must stay server-side only.

## 7. Brevo setup steps

1. Create or log in to a Brevo account.
2. Generate an API key with contact management permissions.
3. Create three Brevo contact lists:
   - Newsletter
   - Contact leads
   - Consultation requests
4. Set the numeric Brevo list IDs in Cloudflare Pages environment variables.
5. Create the custom Brevo contact attributes referenced by the function payloads, including:
   - `MEDLINK_LEAD_SOURCE`
   - `MEDLINK_SERVICE`
   - `MEDLINK_MESSAGE`
   - `MEDLINK_PRACTICE_TYPE`
   - `MEDLINK_SERVICES_OF_INTEREST`
   - `MEDLINK_PREFERRED_CONTACT_METHOD`
   - `MEDLINK_SUPPORT_NEEDS`
   - `MEDLINK_AVAILABILITY_NOTE`
6. Verify the attributes and list IDs in staging before publishing.

## 8. Local testing

The repository can be typechecked and built locally without Brevo credentials.

Recommended checks:

- `npm.cmd run typecheck`
- `npm.cmd run build`

Because Brevo credentials are not present yet:

- the frontend should show a safe configuration error if the API route is reached
- no live Brevo API call should be attempted
- the functions can still be reviewed for payload shape and validation behavior

## 9. Cloudflare deployment setup

1. Add the Brevo variables in Cloudflare Pages environment settings.
2. Deploy the app to Cloudflare Pages with the `functions/` directory included.
3. Confirm same-origin requests to:
   - `/api/newsletter`
   - `/api/contact`
   - `/api/consultation`
4. Verify the production site shows:
   - loading state while sending
   - success message on accepted submissions
   - clear configuration error if Brevo is missing

## 10. Security decisions

- Same-origin function routes avoid exposing the Brevo API key.
- Server-side validation rejects malformed JSON and missing required fields.
- Requests over a small JSON size cap are rejected.
- Honeypot fields provide a lightweight spam barrier.
- A small per-IP rate limit reduces rapid repeat submissions.
- Unexpected HTTP methods are rejected.
- Failure messages are intentionally generic and do not echo raw provider errors.

## 11. Known limitations

- This phase does not include a booking calendar or appointment confirmation system.
- Brevo custom attributes must be created manually before live traffic is enabled.
- The rate limit is intentionally lightweight and can be extended later if needed.
- Live Brevo delivery was not tested because credentials do not exist yet.

