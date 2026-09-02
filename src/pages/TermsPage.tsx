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
        title="Terms of Use | Medlink VA"
        description="Review the provisional terms of use for Medlink VA. The page covers website use, informational content, intellectual property, external links, acceptable use, and a legal review note."
      />

      <PageHero
        eyebrow={termsContent.hero.eyebrow}
        title={termsContent.hero.title}
        description={termsContent.hero.description}
      />

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Terms sections"
          title="A practical website-terms structure"
          description="The page stays broad so the final review can tighten the language before launch."
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

      <HomeSection className="bg-white py-16 sm:py-20">
        <SectionHeading
          eyebrow="Review note"
          title="This page is a draft and needs legal review"
          description={termsContent.note}
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <InfoCard
            title="Website use"
            description="Visitors should use the site lawfully and respectfully."
          />
          <InfoCard
            title="Information only"
            description="Site content is informational and should not be treated as professional advice."
          />
          <InfoCard
            title="Changes"
            description="The terms can be updated as the business, site, or content model changes."
          />
        </div>
      </HomeSection>

      <PageCta
        title="Need to discuss the terms structure?"
        description="Use the contact page if the client wants to review wording before the launch checklist is finalized."
        primaryAction={{ label: "Contact Medlink VA", to: "/contact" }}
        secondaryAction={{ label: "Privacy Policy", to: "/privacy" }}
      />
    </article>
  );
}

