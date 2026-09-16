import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { Link } from "react-router-dom";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { resolveHomeContent } from "../../lib/cms/siteContent";
import { healthcareAudienceForTitle } from "../../content/healthcareAudiences";
import { trackEvent } from "../../lib/analytics";

export function WhoWeServeSection() {
  const { whoWeServe } = resolveHomeContent(useCmsBundle());

  return (
    <HomeSection className="bg-brand-muted/50 py-16 sm:py-20">
      <SectionHeading
        eyebrow={whoWeServe.eyebrow}
        title={whoWeServe.title}
        description={whoWeServe.description}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {whoWeServe.audiences.map((audience) => {
          const detail = healthcareAudienceForTitle(audience.title);
          return <Link key={audience.title} to={detail ? `/healthcare-teams/${detail.slug}` : "/hire-an-mva"} className="group surface-card p-5 transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent" onClick={() => trackEvent("healthcare_team_open", { team_type: detail?.slug ?? audience.title })}>
            <h3 className="text-lg font-semibold text-brand-navy">{audience.title}</h3>
            <p className="mt-2 text-sm leading-6 text-brand-charcoal/80">{audience.description}</p>
            <span className="mt-4 inline-flex font-semibold text-brand-accent transition-transform group-hover:translate-x-1">Learn more →</span>
          </Link>;
        })}
      </div>
    </HomeSection>
  );
}
