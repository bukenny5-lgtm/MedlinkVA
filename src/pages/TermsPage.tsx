import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { InfoCard } from "../components/shared/InfoCard";
import { termsContent } from "../content/legal";

export function TermsPage() {
  return (
    <article className="space-y-12">
      <Seo
        title="Terms of Use | MedLink VA"
        description="Read the terms that apply when you access or use the MedLink VA website, training information, resources, consultation forms, certificate verification tools, and related online services."
      />

      <PageHero
        eyebrow={termsContent.hero.eyebrow}
        title={termsContent.hero.title}
        description={termsContent.hero.description}
      />

      <p className="mx-auto w-full max-w-7xl px-4 text-sm text-brand-charcoal/65 sm:px-6 lg:px-8">Last updated: {termsContent.lastUpdated}</p>

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Terms sections"
          title="Using the MedLink VA website"
          description="Read the terms relating to website use, information, and external links."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {termsContent.sections.map((section) => (
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
        title="Questions about these terms?"
        description="Contact us if you have a question about these terms."
        primaryAction={{ label: "Contact Medlink VA", to: "/contact" }}
        secondaryAction={{ label: "Privacy Policy", to: "/privacy" }}
      />
    </article>
  );
}

