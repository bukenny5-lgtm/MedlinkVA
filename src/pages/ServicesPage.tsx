import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { InfoCard } from "../components/shared/InfoCard";
import { ServiceMarquee } from "../components/services/ServiceMarquee";
import { howItWorksContent } from "../content/howItWorks";
import { clientAssets } from "../lib/assets";
import { TestimonialSection } from "../components/shared/TestimonialSection";
import { useCmsBundle } from "../lib/cms/SiteContentProvider";
import { resolveServicesContent } from "../lib/cms/siteContent";
import { trackEvent, trackServiceCtaClick } from "../lib/analytics";

export function ServicesPage() {
  const servicesContent = resolveServicesContent(useCmsBundle());
  const serviceSchemas = servicesContent.services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "MedLink VA",
    },
  }));

  return (
    <article className="space-y-12">
      <Seo
        title="Healthcare Administrative & Virtual Medical Assistant Services | MedLink VA"
        description={servicesContent.hero.description}
        image={clientAssets.hero}
        structuredData={serviceSchemas}
      />

      <PageHero
        eyebrow={servicesContent.hero.eyebrow}
        title={servicesContent.hero.title}
        description={servicesContent.hero.description}
        actions={servicesContent.hero.actions}
        chips={servicesContent.hero.chips}
      />

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Service library"
          title="Find the kind of support your practice needs"
          description="Different parts of a healthcare practice create different kinds of administrative pressure. Explore the support areas below to see where a trained Virtual Medical Assistant may be able to help your team stay organized, communicate clearly, and keep routine work moving."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {servicesContent.services.map((service) => (
            <Link key={service.id} to={service.ctaTo} className="surface-card group flex h-full flex-col p-6 transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent" onClick={() => { trackEvent("service_open", { service_type: service.id, destination: service.ctaTo }); trackServiceCtaClick(service.title, service.ctaLabel); }}>
              <h3 className="text-xl font-semibold text-brand-navy group-hover:underline group-hover:decoration-brand-accent group-hover:underline-offset-4">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-brand-charcoal/80">{service.description}</p>
              <p className="mt-4 text-sm leading-6 text-brand-charcoal/70"><span className="font-semibold text-brand-navy">Examples:</span> {service.examples.join(" · ")}</p>
              <span className="mt-5 inline-flex items-center font-semibold text-brand-accent transition-transform group-hover:translate-x-1">{service.ctaLabel}</span>
            </Link>
          ))}
        </div>
      </HomeSection>

      <ServiceMarquee />

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="From first conversation to ongoing support"
          title="A clear path from discovery to ongoing support"
          description="We start by learning how your practice currently works and where your team is feeling the most pressure. From there, we agree on the responsibilities that make sense to delegate, prepare the support around your existing workflow, and continue reviewing what is working as your needs change."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {howItWorksContent.steps.map((step) => (
            <InfoCard key={step.number} eyebrow={step.number} title={step.title} description={step.description} className="transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg" />
          ))}
        </div>
      </HomeSection>

      <HomeSection className="bg-white py-16 sm:py-20">
        <SectionHeading
          eyebrow="Benefits"
          title="More room for the work that matters"
          description="When routine administrative work is better organized, the rest of the practice has more room to focus on higher-priority responsibilities. Remote support can help reduce pressure, make communication easier to follow, and give teams more flexibility in how work is shared."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {servicesContent.benefits.map((benefit) => (
            <InfoCard key={benefit.title} title={benefit.title} description={benefit.description} className="transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg" />
          ))}
        </div>
      </HomeSection>

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Who we serve"
          title="Support for the way your healthcare team works"
          description="Different healthcare teams work in different ways. Explore how trained Virtual Medical Assistants can support the administrative routines, communication, coordination and follow-up that matter in your type of practice."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {servicesContent.whoWeServe.map((audience) => (
            <Link key={audience.title} to={`/healthcare-teams/${audience.slug}`} className="surface-card group flex h-full flex-col p-6 transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent" onClick={() => trackEvent("healthcare_team_open", { team_type: audience.slug, destination: `/healthcare-teams/${audience.slug}` })}>
              <h3 className="text-xl font-semibold text-brand-navy group-hover:underline group-hover:decoration-brand-accent group-hover:underline-offset-4">{audience.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-brand-charcoal/80">{audience.description}</p>
              <span className="mt-5 inline-flex items-center font-semibold text-brand-accent transition-transform group-hover:translate-x-1">See support for this {audience.slug === "healthcare-organizations" ? "organization" : "practice"} →</span>
            </Link>
          ))}
        </div>
      </HomeSection>

      <TestimonialSection audiences={["client", "practice"]} />

      <PageCta
        title={servicesContent.finalCta.title}
        description={servicesContent.finalCta.description}
        primaryAction={servicesContent.finalCta.primaryAction}
        secondaryAction={servicesContent.finalCta.secondaryAction}
      />
    </article>
  );
}
