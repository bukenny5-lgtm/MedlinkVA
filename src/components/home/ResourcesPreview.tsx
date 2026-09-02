import { Link } from "react-router-dom";
import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { homeContent } from "../../content/home";

export function ResourcesPreview() {
  const { resourcesPreview } = homeContent;

  return (
    <HomeSection className="bg-brand-sky/10 py-16 sm:py-20">
      <SectionHeading
        eyebrow={resourcesPreview.eyebrow}
        title={resourcesPreview.title}
        description={resourcesPreview.description}
      />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {resourcesPreview.concepts.map((concept) => (
          <article key={concept} className="surface-card p-5">
            <h3 className="text-lg font-semibold text-brand-navy">{concept}</h3>
            <p className="mt-2 text-sm leading-6 text-brand-charcoal/80">
              Editorial ideas that can evolve into educational content later.
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Link to={resourcesPreview.cta.to} className="btn-secondary">
          {resourcesPreview.cta.label}
        </Link>
      </div>
    </HomeSection>
  );
}

