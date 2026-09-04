import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { InfoCard } from "../components/shared/InfoCard";
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
          title="Editable brand statements that can be refined later"
          description="These statements are intentionally polished but still clearly provisional so they can be updated with client-approved language."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <InfoCard title={aboutContent.mission.title} description={aboutContent.mission.description} />
          <InfoCard title={aboutContent.vision.title} description={aboutContent.vision.description} />
        </div>
      </HomeSection>

      <HomeSection className="bg-white py-16 sm:py-20">
        <SectionHeading
          eyebrow="What we value"
          title="A professional tone with room to grow"
          description="The brand values below are meant to support trust, accessibility, and a calm experience for prospective clients."
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

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {aboutContent.team.members.map((member) => (
            <article key={member.name} className="surface-card overflow-hidden">
              <img
                src={member.image}
                alt={member.alt}
                className="aspect-[4/3] w-full object-cover object-top"
                loading="lazy"
                decoding="async"
                width="1200"
                height="900"
              />
              <div className="space-y-2 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sky">{member.role}</p>
                <h3 className="text-lg font-semibold text-brand-navy">{member.name}</h3>
                <p className="text-sm leading-6 text-brand-charcoal/70">
                  {member.shortBio ?? "Confirmed team member shown without invented biography or unsupported claims."}
                </p>
              </div>
            </article>
          ))}
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
            title="Why Medlink VA is presented this way"
            description="This section helps keep the brand story clear without crossing into unsupported factual claims."
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
