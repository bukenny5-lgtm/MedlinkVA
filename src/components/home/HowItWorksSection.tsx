import { Link } from "react-router-dom";
import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { homeContent } from "../../content/home";

export function HowItWorksSection() {
  const { howItWorks } = homeContent;

  return (
    <HomeSection className="bg-white py-16 sm:py-20">
      <SectionHeading
        eyebrow={howItWorks.eyebrow}
        title={howItWorks.title}
        description={howItWorks.description}
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-4">
        {howItWorks.steps.map((step) => (
          <article key={step.number} className="surface-card h-full p-6">
            <p className="text-sm font-semibold tracking-[0.3em] text-brand-sky">{step.number}</p>
            <h3 className="mt-3 text-xl font-semibold text-brand-navy">{step.title}</h3>
            <p className="mt-3 text-sm leading-7 text-brand-charcoal/80">{step.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Link to="/book-consultation" className="btn-secondary">
          {homeContent.hero.primaryCta.label}
        </Link>
      </div>
    </HomeSection>
  );
}

