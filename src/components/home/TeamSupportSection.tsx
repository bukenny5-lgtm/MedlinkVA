import { Link } from "react-router-dom";
import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { resolveHomeContent } from "../../lib/cms/siteContent";

export function TeamSupportSection() {
  const { teamSupport } = resolveHomeContent(useCmsBundle());

  return (
    <HomeSection className="bg-white py-16 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="space-y-8">
          <SectionHeading
            eyebrow={teamSupport.eyebrow}
            title={teamSupport.title}
            description={teamSupport.description}
          />

          {teamSupport.bullets.length ? <ul className="space-y-3">
            {teamSupport.bullets.map((bullet) => <li key={bullet} className="flex items-start gap-3 text-sm leading-7 text-brand-charcoal/80"><span className="mt-2 h-2 w-2 rounded-full bg-brand-accent" aria-hidden="true" /><span>{bullet}</span></li>)}
          </ul> : null}

          <Link to="/about" className="btn-primary">
            Learn More About Us
          </Link>
        </div>

        <figure className="surface-card overflow-hidden">
          <img
            src={teamSupport.image}
            alt={teamSupport.imageAlt}
            className="aspect-[4/3] w-full object-cover object-center"
            width="1600"
            height="1200"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </HomeSection>
  );
}
