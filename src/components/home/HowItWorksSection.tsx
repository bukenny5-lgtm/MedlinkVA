import { Link } from "react-router-dom";
import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { resolveHomeContent } from "../../lib/cms/siteContent";

export function HowItWorksSection() {
  const home = resolveHomeContent(useCmsBundle());
  const { howItWorks } = home;

  return (
    <HomeSection className="bg-white py-16 sm:py-20">
      <SectionHeading
        eyebrow={howItWorks.eyebrow}
        title={howItWorks.title}
        description={howItWorks.description}
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-4">
        {howItWorks.steps.map((step) => (
          <article key={step.number} className="surface-card group h-full p-6 transition hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-brand-accent motion-reduce:transform-none">
            <p className="text-sm font-semibold tracking-[0.3em] text-brand-accent transition-transform group-hover:translate-x-1">{step.number}</p>
            <h3 className="mt-3 text-xl font-semibold text-brand-navy">{step.title}</h3>
            <p className="mt-3 text-sm leading-7 text-brand-charcoal/80">{step.description}</p>
            <span className="mt-5 inline-flex text-sm font-semibold text-brand-accent transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Link to="/book-consultation" className="btn-secondary">
          {home.finalCta.cta.label}
        </Link>
      </div>
    </HomeSection>
  );
}
