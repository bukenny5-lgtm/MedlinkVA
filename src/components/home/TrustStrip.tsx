import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { resolveHomeContent } from "../../lib/cms/siteContent";

export function TrustStrip() {
  const { trustStrip } = resolveHomeContent(useCmsBundle());

  return (
    <HomeSection className="bg-brand-muted/50 py-14 sm:py-16">
      <SectionHeading
        eyebrow="Trust / Value Strip"
        title="A clear value proposition for healthcare teams"
        description="The section below reinforces the positioning without relying on unsupported claims or certifications."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {trustStrip.map((item) => (
          <article key={item.title} className="surface-card h-full p-5">
            <h3 className="text-lg font-semibold text-brand-navy">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-brand-charcoal/80">{item.description}</p>
          </article>
        ))}
      </div>
    </HomeSection>
  );
}
