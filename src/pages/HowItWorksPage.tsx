import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { InfoCard } from "../components/shared/InfoCard";
import { howItWorksContent } from "../content/howItWorks";

export function HowItWorksPage() {
  return (
    <article className="space-y-12">
      <Seo
        title="How Medlink VA Works | Virtual Healthcare Support"
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
          title="The current four-step model"
          description="Each step is concise, conversion-focused, and careful not to promise outcomes that have not been approved."
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
          title="A clear consultation path without unsupported promises"
          description="The page explains the journey at a high level so visitors know what happens next."
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
          description="The process page links back to the service set so the page still supports SEO and internal navigation."
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
          eyebrow="FAQ teaser"
          title="Short answers that reduce hesitation"
          description="These preview answers can later move into a full FAQ section or Sanity content type."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {howItWorksContent.faqTeaser.map((item) => (
            <InfoCard key={item.question} title={item.question} description={item.answer} />
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

