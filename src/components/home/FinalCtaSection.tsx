import { Link } from "react-router-dom";
import { HomeSection } from "./HomeSection";

export function FinalCtaSection() {
  return (
    <HomeSection className="bg-brand-navy py-16 sm:py-20">
      <div className="surface-card bg-white p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">Let’s talk</p>
            <h2 className="heading-section">Ready to take the next step?</h2>
            <p className="max-w-2xl text-base leading-7 text-brand-charcoal/80">Tell us whether you are looking for trained remote support or practical VMA training.</p>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <Link to="/classes" className="btn-secondary w-full lg:w-auto">Explore Training</Link>
            <Link to="/book-consultation" className="btn-primary w-full justify-center lg:w-auto">Book a Consultation</Link>
          </div>
        </div>
      </div>
    </HomeSection>
  );
}
