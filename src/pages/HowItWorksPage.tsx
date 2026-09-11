import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { ResponsiveDisclosure } from "../components/shared/ResponsiveDisclosure";
import { InfoCard } from "../components/shared/InfoCard";
import { howItWorksContent } from "../content/howItWorks";

export function HowItWorksPage() {
  return (
    <article className="space-y-12">
      <Seo
        title="How MedLink VA Works | Virtual Healthcare Support"
        description="See the four-step support process Medlink VA uses to frame a consultation, define support needs, begin workflow support, and grow with ongoing help."
      />

      <PageHero
        eyebrow={howItWorksContent.hero.eyebrow}
        title={howItWorksContent.hero.title}
        description={howItWorksContent.hero.description}
        actions={howItWorksContent.hero.actions}
        chips={howItWorksContent.hero.chips}
      />

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Process"
          title="Six steps to practical support"
          description="Start with your priorities and agree on a clear way to work together."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {howItWorksContent.steps.map((step) => (
            <InfoCard
              key={step.number}
              eyebrow={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </HomeSection>

      <HomeSection className="bg-white py-16 sm:py-20">
        <SectionHeading
          eyebrow="What to expect"
          title="A conversation centered on your needs"
          description="Get to know the support options and discuss what would work for your practice."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {howItWorksContent.expectations.map((item) => (
            <InfoCard key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </HomeSection>

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Service categories"
          title="A quick reminder of the support themes this process can cover"
          description="Choose the areas you would like to discuss during your consultation."
        />

        <div className="mt-8 flex flex-wrap gap-3">
          {howItWorksContent.serviceCategories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-medium text-brand-navy shadow-soft"
            >
              {category}
            </span>
          ))}
        </div>
      </HomeSection>

      <HomeSection className="bg-white py-16 sm:py-20">
        <SectionHeading
          eyebrow="Common questions"
          title="Short answers that reduce hesitation"
          description="Find answers about getting started and shaping your support."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {howItWorksContent.faqTeaser.map((item) => (
            <ResponsiveDisclosure key={item.question} title={item.question}><p>{item.answer}</p></ResponsiveDisclosure>
          ))}
        </div>
      </HomeSection>

      <PageCta
        title={howItWorksContent.finalCta.title}
        description={howItWorksContent.finalCta.description}
        primaryAction={howItWorksContent.finalCta.primaryAction}
        secondaryAction={howItWorksContent.finalCta.secondaryAction}
      />
    </article>
  );
}

