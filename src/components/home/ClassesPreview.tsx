import { Link } from "react-router-dom";
import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { resolveClassesContent, resolveHomeContent } from "../../lib/cms/siteContent";

export function ClassesPreview() {
  const bundle = useCmsBundle();
  const { classesPreview } = resolveHomeContent(bundle);
  const training = resolveClassesContent(bundle);
  const featuredProgrammes = training.records.filter((item) => item.featured).slice(0, 3);

  return (
    <HomeSection className="bg-white py-16 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div className="space-y-8">
          <SectionHeading
            eyebrow={classesPreview.eyebrow}
            title={classesPreview.title}
            description={classesPreview.description}
          />

          <div className="flex flex-wrap gap-3">
            {classesPreview.concepts.map((concept) => (
              <span
                key={concept}
                className="rounded-full border border-brand-border bg-brand-muted/60 px-4 py-2 text-sm font-medium text-brand-navy"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>

        <div className="surface-card p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent">Structured VMA training</p>
          <p className="mt-3 text-lg font-semibold text-brand-navy">Choose a path for your learning goals</p>
          <div className="mt-5 space-y-3">
            {(featuredProgrammes.length ? featuredProgrammes : training.tiers.slice(0, 3)).map((item) => (
              <div key={"name" in item ? item.name : item._id} className="flex items-center justify-between gap-3 border-b border-brand-border pb-3 text-sm">
                <span className="font-semibold text-brand-navy">{"name" in item ? item.name : item.title}</span>
                <span className="shrink-0 text-brand-charcoal/70">{"price" in item ? item.price : item.priceLabel ?? (typeof item.price === "number" ? `$${item.price}` : "Enquire")}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-brand-charcoal/80">Explore practical healthcare administrative training for aspiring and developing VMAs.</p>
          <div className="mt-6">
            <Link to={classesPreview.cta.to} className="btn-primary">
              {classesPreview.cta.label}
            </Link>
          </div>
        </div>
      </div>
    </HomeSection>
  );
}
