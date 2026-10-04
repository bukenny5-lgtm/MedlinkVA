import { Link } from "react-router-dom";
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
import type { AboutPartner } from "../content/about";
import { trackEvent } from "../lib/analytics";
import chetacareLogo from "../assets/partners/chetacare.png.webp";
import hiJobLogo from "../assets/partners/hijob.png.webp";
import converseToClarityLogo from "../assets/partners/converse-to-clarity.png.jpeg";
import weMakeChangeLogo from "../assets/partners/we_make_change.png";

export function AboutPage() {
  const aboutContent = resolveAboutContent(useCmsBundle());
  const partners = aboutContent.partners as AboutPartner[];
  const partnerLogos: Record<string, string> = { "Chetacare": chetacareLogo, "HiJob": hiJobLogo, "Converse to Clarity": converseToClarityLogo, "We Make Change": weMakeChangeLogo };

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
          title="Values that shape how we work"
          description="The way we train, communicate, and support people matters just as much as the work itself. These values guide how MedLink VA works with learners, healthcare practices, partners, and the people behind every opportunity."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {aboutContent.values.map((value) => (
            <InfoCard key={value.title} title={value.title} description={value.description} className="transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg" />
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

      <HomeSection className="bg-white py-16 sm:py-20"><SectionHeading eyebrow="Our Impact" title="See the progress behind the work" description="MedLink VA is growing through the people we train, the opportunities learners move into, and the healthcare teams our work is designed to support. Visit our Impact page to see the latest verified training and placement figures and learn more about the progress behind the numbers." /><div className="mt-8"><Link to="/impact" className="btn-secondary" onClick={() => trackEvent("about_impact_open", { destination: "/impact" })}>Explore Our Impact <span aria-hidden="true">→</span></Link></div></HomeSection>

      {partners.length ? <HomeSection className="bg-brand-background py-16 sm:py-20"><SectionHeading eyebrow="Partners & Collaborations" title="Organisations we grow alongside" description="MedLink VA works alongside organisations that share an interest in training, professional development, healthcare support, and creating meaningful opportunities for people." /><div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 xl:grid-cols-4">{partners.map((partner) => { const logo = partner.logo ? sanityImageSrc(partner.logo, { width: 500 }) ?? undefined : partnerLogos[partner.name]; const content = <div className="flex min-h-28 flex-col items-center justify-center gap-3"><span className="flex min-h-16 w-full items-center justify-center">{logo ? <img src={logo} alt={partner.altText || `${partner.name} logo`} className="max-h-16 max-w-[250px] object-contain grayscale transition duration-300 group-hover:grayscale-0 group-hover:scale-[1.03]" loading="lazy" decoding="async" /> : <span className="font-semibold text-brand-navy">{partner.name}</span>}</span><span className="text-sm font-medium text-brand-navy">{partner.name}</span></div>; return <div key={partner.name} className="group surface-card flex min-h-36 items-center justify-center bg-white p-6 text-center">{partner.websiteUrl ? <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent" onClick={() => trackEvent("partner_open", { partner_name: partner.name, destination: partner.websiteUrl })}>{content}<span className="sr-only"> (opens in a new tab)</span></a> : content}</div>; })}</div></HomeSection> : null}

      <HomeSection className="bg-white py-16 sm:py-20">
        <SectionHeading
          eyebrow={aboutContent.why.eyebrow}
          title={aboutContent.why.title}
          description={aboutContent.why.description}
        />

        <div className="mt-8">
          <InfoCard
            title="Training and support built around people"
            description="We take time to understand where someone is starting, what they are trying to achieve, and what kind of guidance or support will be most useful. Whether you are learning or looking for help in your practice, the goal is practical progress rather than complicated processes."
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
