import { useMemo } from "react";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { eligibleForHomepage, resolveEvents } from "../../lib/events";
import { trackEvent } from "../../lib/analytics";
import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";

const placement = "homepage_resources_followup";

function formatDateTime(value: string, timezone?: string) {
  const date = new Date(value);
  return {
    date: new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: timezone }).format(date),
    time: new Intl.DateTimeFormat("en-GB", { timeStyle: "short", timeZone: timezone }).format(date),
  };
}

export function HomepageWebinar() {
  const bundle = useCmsBundle();
  const webinar = useMemo(() => resolveEvents(bundle?.events)
    .filter((event) => event.eventType === "webinar" && eligibleForHomepage(event))
    .sort((left, right) => new Date(left.startDateTime).getTime() - new Date(right.startDateTime).getTime())[0], [bundle?.events]);

  if (!webinar) return null;
  const start = formatDateTime(webinar.startDateTime, webinar.timezone);
  const end = formatDateTime(webinar.endDateTime, webinar.timezone);
  const register = () => trackEvent("event_registration_click", { event_slug: webinar.slug, destination_type: "external_registration", placement });

  return <HomeSection className="bg-brand-background py-12 sm:py-14">
    <div className="surface-card border-brand-accent/25 bg-white p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <SectionHeading eyebrow="Upcoming webinar" title={webinar.title} description={webinar.shortDescription} />
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-brand-navy">
            <span>{start.date}</span>
            <span>{start.time}–{end.time} EAT</span>
            {webinar.timeNote ? <span>{webinar.timeNote.replace(/^.*?\((.*)\)$/, "$1")}</span> : null}
            {webinar.speaker ? <span>Guest speaker: {webinar.speaker}</span> : null}
          </div>
        </div>
        {webinar.registrationUrl ? <a href={webinar.registrationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary justify-center" onClick={register}>{webinar.ctaLabel || "Register for Webinar"} <span aria-hidden="true">↗</span></a> : null}
      </div>
    </div>
  </HomeSection>;
}
