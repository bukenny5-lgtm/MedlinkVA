import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { InfoCard } from "../components/shared/InfoCard";
import { privacyContent } from "../content/legal";

export function PrivacyPage() {
  return (
    <article className="space-y-12">
      <Seo
        title="Privacy Policy | MedLink VA"
        description="Learn what information MedLink VA may collect through medlinkva.com, how it is used, and which services may process information on our behalf."
      />

      <PageHero
        eyebrow={privacyContent.hero.eyebrow}
        title={privacyContent.hero.title}
        description={privacyContent.hero.description}
      />

      <p className="mx-auto w-full max-w-7xl px-4 text-sm text-brand-charcoal/65 sm:px-6 lg:px-8">Last updated: {privacyContent.lastUpdated}</p>

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Policy sections"
          title="Privacy topics"
          description="Read about contact details, website use, and the handling of information."
        />

        <p className="mt-8 rounded-2xl border border-brand-accent/30 bg-brand-sky/10 px-5 py-4 text-sm font-medium leading-7 text-brand-navy">{privacyContent.warning}</p>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {privacyContent.sections.map((section) => (
            <InfoCard
              key={section.title}
              title={section.title}
              description={section.paragraphs[0]}
              bullets={section.paragraphs.slice(1)}
            />
          ))}
        </div>
      </HomeSection>

      <PageCta
        title="Questions about privacy?"
        description="Contact us with questions about this policy."
        primaryAction={{ label: "Contact Medlink VA", to: "/contact" }}
        secondaryAction={{ label: "Terms of Use", to: "/terms" }}
      />
    </article>
  );
}

