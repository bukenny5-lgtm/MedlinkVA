# MedLink VA analytics and weekly reporting

## Google Analytics 4 setup

1. In [Google Analytics](https://analytics.google.com/), create or select the MedLink VA account and create a GA4 property.
2. Add a Web data stream for `https://medlinkva.com`.
3. Copy the stream’s Measurement ID. It has the format `G-XXXXXXXXXX` and is visible in the stream details.
4. Set `VITE_GA_MEASUREMENT_ID` to that value in the environment used for the production Vite build.

The application initializes GA4 only in a production build and only when the value matches the expected Measurement ID format. It sets `send_page_view: false`, then sends one explicit `page_view` for each React Router pathname. Verification-token URLs are normalized to `/verify/:token` in the event path; the token is never sent as an analytics parameter.

## Cloudflare Pages / Wrangler configuration

`VITE_GA_MEASUREMENT_ID` is a public build-time variable, not a secret. Add it in the Cloudflare Pages project’s production build environment variables, then trigger a new deployment. Do not put a real ID in source control or `wrangler.toml`; the file contains a commented placeholder only. For local builds, leave it unset so analytics remains disabled.

## Events implemented

- `page_view`: normalized `page_path`, page title, and page location.
- `cta_click`: meaningful hero and page CTA label, location, and destination.
- `service_cta_click`: public service name and CTA label.
- `training_cta_click`: public programme/session name, CTA label, and destination.
- `consultation_submit`: successful submission only; structured practice type and selected services.
- `contact_submit`: successful submission only; structured service/topic when available.
- `newsletter_signup`: successful response only; no email address.
- `video_open`: public video title/category/provider when a player is opened.
- `certificate_verification`: `success` or `not_found` result only.

Events are sent through `src/lib/analytics.ts`; components do not call `window.gtag` directly.

## Data deliberately not collected

Analytics events do not include names, email addresses, phone numbers, organization names, free-text messages, patient or health information, certificate numbers, verification tokens, legacy certificate numbers, payment credentials, Stream UIDs, or YouTube IDs.

## Key Events to configure manually

After data appears in the property, consider marking `consultation_submit`, `contact_submit`, and `newsletter_signup` as Key Events. `training_cta_click` can be considered as a softer intent signal. Codex cannot change the authenticated GA4 property automatically.

## Weekly report

Once the property has collected data, use GA4: **Reports → open the desired report → Share this report → Schedule Email**. Choose **Weekly**, select authorized GA4 users as recipients, and use PDF for management review. A recommended recipient is `info@medlinkva.com`, provided that address has access to the property.

Recommended weekly metrics:

- Users, new users, sessions, views, views per session, and average engagement time
- Top pages and traffic acquisition/source
- Device category and country
- Training, Services, and Video Hub page visits
- Consultation, contact, and newsletter submissions
- CTA clicks, video opens, and certificate verification counts

The form, video, and verification metrics above depend on the events implemented here; no conversion totals should be claimed before GA4 receives data.

## Verification and privacy

Use GA4 **Realtime** and **DebugView** to verify page views and events after a production build with the Measurement ID configured. Browser testing should confirm that missing or invalid configuration does not affect site operation.

The privacy policy now explains that enabled analytics may collect pages visited, approximate location, device/browser information, and interaction data. Analytics loads asynchronously and is not enabled during local development by default. This phase does not add a cookie banner or consent manager; whether consent management is needed should be reviewed for the intended markets and applicable requirements before launch. This is not a jurisdictional compliance conclusion.

Cloudflare Web Analytics was not present and is not enabled by this phase. It remains an optional complementary, privacy-oriented source that can be evaluated separately.
