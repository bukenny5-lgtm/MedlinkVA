import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { resolveHomeContent } from "../../lib/cms/siteContent";

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
        {whoWeServe.audiences.map((audience) => (
          <article key={audience.title} className="surface-card p-5">
            <h3 className="text-lg font-semibold text-brand-navy">{audience.title}</h3>
            <p className="mt-2 text-sm leading-6 text-brand-charcoal/80">{audience.description}</p>
          </article>
        ))}
      </div>
    </HomeSection>
  );
}
