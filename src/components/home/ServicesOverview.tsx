import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { homeContent } from "../../content/home";
import { Link } from "react-router-dom";

export function ServicesOverview() {
  return (
    <HomeSection className="bg-white py-16 sm:py-20">
      <SectionHeading
        eyebrow="Services Overview"
        title="Six focused ways Medlink VA can support your practice"
        description="These cards use provisional marketing copy and are structured so they can later move cleanly into Sanity."
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {homeContent.services.map((service) => (
          <article key={service.title} className="surface-card flex h-full flex-col p-6">
            <h3 className="text-xl font-semibold text-brand-navy">{service.title}</h3>
            <p className="mt-3 text-sm leading-7 text-brand-charcoal/80">{service.description}</p>
            <Link
              to="/services"
              className="mt-6 inline-flex text-sm font-semibold text-brand-accent transition-colors hover:text-brand-navy"
            >
              Explore services
            </Link>
          </article>
        ))}
      </div>
    </HomeSection>
  );
}

