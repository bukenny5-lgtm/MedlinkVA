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
import { sanityImageSrc } from "../lib/sanity/image";
import type { AboutMetric, AboutPartner } from "../content/about";

export function AboutPage() {
  const aboutContent = resolveAboutContent(useCmsBundle());
  const metrics = aboutContent.metrics as AboutMetric[];
  const partners = aboutContent.partners as AboutPartner[];

  return (
    <article className="space-y-12">
      <Seo
        title="About MedLink VA | Virtual Medical Assistant Training & Support"
        description="Learn how MedLink VA combines Virtual Medical Assistant training with thoughtful healthcare administrative support for learners, practices, and healthcare teams."
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
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <figure className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl bg-white p-3 shadow-soft">
            <img src={aboutContent.founder.image} alt={aboutContent.founder.imageAlt} className="aspect-[4/5] w-full rounded-2xl object-cover" loading="lazy" decoding="async" width="700" height="875" />
          </figure>
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">Founder’s message</p>
            <h2 className="heading-section">{aboutContent.founder.heading}</h2>
            <p className="font-semibold text-brand-navy">{aboutContent.founder.name} · {aboutContent.founder.role}</p>
            <p className="max-w-3xl text-base leading-8 text-brand-charcoal/80">{aboutContent.founder.message}</p>
          </div>
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

      {metrics.length ? <HomeSection className="bg-white py-16 sm:py-20"><SectionHeading eyebrow="MedLink VA at a glance" title="Verified details about our work" description="These figures are published only when entered and verified through Sanity." /><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{metrics.map((metric) => <article key={`${metric.label}-${metric.value}`} className="surface-card p-6"><p className="text-3xl font-bold text-brand-navy">{metric.value}{metric.suffix}</p><h3 className="mt-3 font-semibold text-brand-navy">{metric.label}</h3>{metric.description ? <p className="mt-2 text-sm leading-6 text-brand-charcoal/75">{metric.description}</p> : null}</article>)}</div></HomeSection> : null}

      {partners.length ? <HomeSection className="bg-brand-background py-16 sm:py-20"><SectionHeading eyebrow="Partners & collaborations" title="Organisations connected with MedLink VA" description="Meet the organisations MedLink VA works with and collaborates alongside." /><div className="mt-8 grid gap-4 sm:grid-cols-3">{partners.map((partner) => <article key={partner.name} className="surface-card flex min-h-24 items-center justify-center p-5 text-center">{partner.websiteUrl ? <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-navy underline-offset-4 hover:underline">{partner.logo ? <img src={sanityImageSrc(partner.logo, { width: 500 }) ?? ""} alt={partner.altText || `${partner.name} logo`} className="max-h-14 max-w-full object-contain" loading="lazy" decoding="async" /> : partner.name}<span className="sr-only"> (opens in a new tab)</span></a> : partner.logo ? <img src={sanityImageSrc(partner.logo, { width: 500 }) ?? ""} alt={partner.altText || `${partner.name} logo`} className="max-h-14 max-w-full object-contain" loading="lazy" decoding="async" /> : <span className="font-semibold text-brand-navy">{partner.name}</span>}</article>)}</div></HomeSection> : null}

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
