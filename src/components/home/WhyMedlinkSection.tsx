import { Link } from "react-router-dom";
import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { resolveHomeContent } from "../../lib/cms/siteContent";

export function WhyMedlinkSection() {
  const { whyMedlink } = resolveHomeContent(useCmsBundle());

  return (
    <HomeSection className="bg-brand-sky/10 py-16 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <figure className="surface-card overflow-hidden">
          <img
            src={whyMedlink.image}
            alt={whyMedlink.imageAlt}
            className="aspect-[4/5] w-full object-cover object-center"
            width="1200"
            height="1500"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="space-y-8">
          <SectionHeading
            eyebrow={whyMedlink.eyebrow}
            title={whyMedlink.title}
            description={whyMedlink.description}
          />

          <ul className="grid gap-3 sm:grid-cols-2">
            {whyMedlink.bullets.map((bullet) => (
              <li
                key={bullet}
                className="rounded-2xl border border-brand-border bg-white px-4 py-3 text-sm font-medium text-brand-charcoal shadow-soft"
              >
                {bullet}
              </li>
            ))}
          </ul>

          <Link to="/services" className="btn-primary">
            Explore Our Services
          </Link>
        </div>
      </div>
    </HomeSection>
  );
}
