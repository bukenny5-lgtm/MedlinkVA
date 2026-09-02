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
        title="Privacy Policy | Medlink VA"
        description="Review the provisional privacy policy structure for Medlink VA, including forms, newsletter signup, third-party services, external links, and a recommended legal review note."
      />

      <PageHero
        eyebrow={privacyContent.hero.eyebrow}
        title={privacyContent.hero.title}
        description={privacyContent.hero.description}
      />

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Policy sections"
          title="Editable privacy topics that can be finalized before launch"
          description="The structure is intentionally broad so the final legal review can fill in the approved details."
        />

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

      <HomeSection className="bg-white py-16 sm:py-20">
        <SectionHeading
          eyebrow="Review note"
          title="This text is provisional, not legal advice"
          description={privacyContent.note}
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <InfoCard
            title="Forms"
            description="Public forms should stay focused on business contact details rather than sensitive patient information."
          />
          <InfoCard
            title="Third parties"
            description="Any future provider integrations should be disclosed and reviewed before launch."
          />
          <InfoCard
            title="Updates"
            description="This policy should be revisited if analytics, newsletters, or collection methods change."
          />
        </div>
      </HomeSection>

      <PageCta
        title="Questions about the policy structure?"
        description="Use the contact page if you need to discuss the final wording before launch."
        primaryAction={{ label: "Contact Medlink VA", to: "/contact" }}
        secondaryAction={{ label: "Terms of Use", to: "/terms" }}
      />
    </article>
  );
}

