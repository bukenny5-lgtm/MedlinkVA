import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { InfoCard } from "../components/shared/InfoCard";
import { servicesContent } from "../content/services";

export function ServicesPage() {
  return (
    <article className="space-y-12">
      <Seo
        title="Medlink VA Services | Virtual Medical Assistant Support"
        description="Explore the provisional service categories Medlink VA can support, including scheduling, reception, communication, administration, billing support, and workflow help."
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
          title="What these support areas can look like in practice"
          description="Each card stays focused on non-clinical support, practical examples, and a clear next step."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {servicesContent.services.map((service) => (
            <InfoCard
              key={service.title}
              title={service.title}
              description={service.description}
              bullets={service.examples}
              footer={
                <Link
                  to={service.ctaTo}
                  className="inline-flex text-sm font-semibold text-brand-accent transition-colors hover:text-brand-navy"
                >
                  {service.ctaLabel}
                </Link>
              }
            />
          ))}
        </div>
      </HomeSection>

      <HomeSection className="bg-white py-16 sm:py-20">
        <SectionHeading
          eyebrow="Benefits"
          title="Why these service categories are organized this way"
          description="The page is designed to help prospects quickly understand the kind of support Medlink VA can discuss."
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
          title="A broad healthcare audience, without narrowing the site too early"
          description="These audience types mirror the homepage and help keep the site useful for multiple kinds of prospects."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {servicesContent.whoWeServe.map((audience) => (
            <InfoCard key={audience.title} title={audience.title} description={audience.description} />
          ))}
        </div>
      </HomeSection>

      <PageCta
        title={servicesContent.finalCta.title}
        description={servicesContent.finalCta.description}
        primaryAction={servicesContent.finalCta.primaryAction}
        secondaryAction={servicesContent.finalCta.secondaryAction}
      />
    </article>
  );
}

