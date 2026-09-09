import { Link } from "react-router-dom";
import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { resolveHomeContent } from "../../lib/cms/siteContent";

export function ProductsPreview() {
  const { productsPreview } = resolveHomeContent(useCmsBundle());

  return (
    <HomeSection className="bg-white py-16 sm:py-20">
      <SectionHeading
        eyebrow={productsPreview.eyebrow}
        title={productsPreview.title}
        description={productsPreview.description}
      />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {productsPreview.concepts.map((concept) => (
          <article key={concept} className="surface-card p-5">
            <h3 className="text-lg font-semibold text-brand-navy">{concept}</h3>
            <p className="mt-2 text-sm leading-6 text-brand-charcoal/80">
              Check available products and updates.
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Link to={productsPreview.cta.to} className="btn-primary">
          {productsPreview.cta.label}
        </Link>
      </div>
    </HomeSection>
  );
}
