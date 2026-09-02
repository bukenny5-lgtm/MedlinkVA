import { Link } from "react-router-dom";
import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { homeContent } from "../../content/home";

export function JobsPreview() {
  const { jobsPreview } = homeContent;

  return (
    <HomeSection className="bg-brand-muted/50 py-16 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <SectionHeading
          eyebrow={jobsPreview.eyebrow}
          title={jobsPreview.title}
          description={jobsPreview.description}
        />

        <div className="surface-card p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-sky">Placeholder</p>
          <p className="mt-3 text-sm leading-7 text-brand-charcoal/80">
            Current opportunities will appear here.
          </p>
          <div className="mt-6">
            <Link to={jobsPreview.cta.to} className="btn-secondary">
              {jobsPreview.cta.label}
            </Link>
          </div>
        </div>
      </div>
    </HomeSection>
  );
}

