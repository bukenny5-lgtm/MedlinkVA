import { Link } from "react-router-dom";
import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { homeContent } from "../../content/home";

export function ClassesPreview() {
  const { classesPreview } = homeContent;

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
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-sky">Preview</p>
          <p className="mt-3 text-lg font-semibold text-brand-navy">
            {homeContent.classesPreview.title}
          </p>
          <p className="mt-3 text-sm leading-7 text-brand-charcoal/80">
            Upcoming learning opportunities will appear here.
          </p>
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

