import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { ResponsiveDisclosure } from "../components/shared/ResponsiveDisclosure";
import { InfoCard } from "../components/shared/InfoCard";
import { howItWorksContent } from "../content/howItWorks";
import { clientAssets } from "../lib/assets";
import { TestimonialSection } from "../components/shared/TestimonialSection";
import { useCmsBundle } from "../lib/cms/SiteContentProvider";
import { resolveServicesContent } from "../lib/cms/siteContent";

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
          title="Find the support category that fits your practice"
          description="Choose the area where your team needs the most support, then explore the services designed to strengthen that part of your workflow."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {servicesContent.services.map((service) => (
            <ResponsiveDisclosure key={service.id} id={service.id} title={service.title}>
              <p>{service.description}</p>
              <ul className="list-disc space-y-2 pl-5">
                {service.examples.map((example) => <li key={example}>{example}</li>)}
              </ul>

                <Link
                  to={service.ctaTo}
                  className="inline-flex text-sm font-semibold text-brand-accent transition-colors hover:text-brand-navy"
                >
                  {service.ctaLabel}
                </Link>
            </ResponsiveDisclosure>
          ))}
        </div>
      </HomeSection>

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="From first conversation to ongoing support"
          title="A clear path from discovery to delivery"
          description="Use the consultation to clarify your priorities, match the right support, and agree on practical next steps."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {howItWorksContent.steps.map((step) => (
            <InfoCard key={step.number} eyebrow={step.number} title={step.title} description={step.description} />
          ))}
        </div>
      </HomeSection>

      <HomeSection className="bg-white py-16 sm:py-20">
        <SectionHeading
          eyebrow="Benefits"
          title="More room for the work that matters"
          description="Keep administrative tasks organized, communication clear, and support aligned with your needs."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {servicesContent.benefits.map((benefit) => (
            <InfoCard key={benefit.title} title={benefit.title} description={benefit.description} />
          ))}
        </div>
      </HomeSection>

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Who we serve"
          title="Support for the way your healthcare team works"
          description="Explore flexible administrative support across practice settings."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {servicesContent.whoWeServe.map((audience) => (
            <InfoCard key={audience.title} title={audience.title} description={audience.description} />
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
