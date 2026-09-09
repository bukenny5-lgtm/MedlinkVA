import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { InfoCard } from "../components/shared/InfoCard";
import { TeamMemberCard } from "../components/shared/TeamMemberCard";
import { clientAssets } from "../lib/assets";
import { useCmsBundle } from "../lib/cms/SiteContentProvider";
import { resolveAboutContent } from "../lib/cms/siteContent";

export function AboutPage() {
  const aboutContent = resolveAboutContent(useCmsBundle());

  return (
    <article className="space-y-12">
      <Seo
        title="About Medlink VA | Healthcare Virtual Support"
        description={aboutContent.hero.description}
        image={clientAssets.teamPhoto}
      />

      <PageHero
        eyebrow={aboutContent.hero.eyebrow}
        title={aboutContent.hero.title}
        description={aboutContent.hero.description}
        actions={aboutContent.hero.actions}
        image={aboutContent.hero.image}
      />

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Mission & vision"
          title="Purpose behind our training and support"
          description="Practical learning and thoughtful administration help people and healthcare teams move forward."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <InfoCard title={aboutContent.mission.title} description={aboutContent.mission.description} />
          <InfoCard title={aboutContent.vision.title} description={aboutContent.vision.description} />
        </div>
      </HomeSection>

      <HomeSection className="bg-white py-16 sm:py-20">
        <SectionHeading
          eyebrow="What we value"
          title="Values that guide the way we work"
          description="Clarity, respect, flexibility, and responsible working habits shape our approach to learners and practices."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {aboutContent.values.map((value) => (
            <InfoCard key={value.title} title={value.title} description={value.description} />
          ))}
        </div>
      </HomeSection>

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow={aboutContent.team.eyebrow}
          title={aboutContent.team.title}
          description={aboutContent.team.description}
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {aboutContent.team.members.map((member) => <TeamMemberCard key={member.name} member={member} />)}
        </div>
      </HomeSection>

      <HomeSection className="bg-white py-16 sm:py-20">
        <SectionHeading
          eyebrow={aboutContent.why.eyebrow}
          title={aboutContent.why.title}
          description={aboutContent.why.description}
        />

        <div className="mt-8">
          <InfoCard
            title="Training and support built around people"
            description="Discuss your goals with a team that values practical progress and open communication."
            bullets={aboutContent.why.bullets}
          />
        </div>
      </HomeSection>

      <PageCta
        title={aboutContent.finalCta.title}
        description={aboutContent.finalCta.description}
        primaryAction={aboutContent.finalCta.primaryAction}
        secondaryAction={aboutContent.finalCta.secondaryAction}
      />
    </article>
  );
}
