# Sanity-managed events

The public event system uses the Sanity `event` document type. Published records are returned by the shared CMS query and take precedence over the local `official-launch` fallback when their slug matches.

To create the existing 10 October training as an event, create an Event document with `eventType: training`, a unique slug, the verified start and end date-times including the correct timezone, the approved title and description, and the desired `showInResources`/`showOnHomepage` visibility. Add a registration URL only when the client has supplied the real destination.

Homepage and Resources placements automatically exclude inactive or expired events. Past active events remain accessible at `/events/{slug}` and appear under the Resources “Past Events” archive when `showInResources` is enabled.

The sitemap remains static in `public/sitemap.xml`; the existing Official Launch URL is preserved there. Future dynamic event routes should be added to that file as part of the deployment/content publication process until a server-side or build-time sitemap is introduced.
