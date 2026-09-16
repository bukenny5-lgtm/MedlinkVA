import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { InfoCard } from "../components/shared/InfoCard";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { ResponsiveDisclosure } from "../components/shared/ResponsiveDisclosure";
import { useCmsBundle } from "../lib/cms/SiteContentProvider";
import { healthcareAudienceCopy, healthcareAudienceMedia, healthcareAudiences } from "../content/healthcareAudiences";
import { trackEvent, trackHealthcareTeamCtaClick } from "../lib/analytics";

export function HealthcareTeamPage() {
  const { audienceSlug } = useParams();
  const audience = healthcareAudiences.find((item) => item.slug === audienceSlug);
  const copy = audience ? healthcareAudienceCopy[audience.slug] : undefined;
  const media = audience ? healthcareAudienceMedia[audience.slug] : undefined;
  const bundle = useCmsBundle();

  useEffect(() => {
    if (audience) trackEvent("healthcare_team_open", { team_type: audience.slug });
  }, [audience?.slug]);

  if (!audience || !copy) {
    return <article><Seo title="Healthcare Teams | MedLink VA" robots="noindex,follow" /><PageHero eyebrow="Healthcare teams" title="Explore support for healthcare teams" description="Choose a practice type to learn how remote administrative support may fit your day-to-day work." actions={[{ label: "Hire an MVA", to: "/hire-an-mva", variant: "primary" }]} /></article>;
  }

  const faqs = (bundle?.faqs ?? []).filter((faq) => faq.active !== false).slice(0, 4);
  const benefits = ["Reduce administrative pressure", "Help keep routine tasks moving", "Support organized communication", "Create more room for higher-priority work"];

  return <article>
    <Seo title={audience.seoTitle} description={audience.description} />
    <PageHero eyebrow={audience.eyebrow} title={audience.title} description={audience.description} actions={[{ label: audience.cta.label, to: audience.cta.to, variant: "primary" }, { label: "How We Prepare MVAs", to: "/how-we-prepare-mvas", variant: "secondary" }]} image={media ? { src: media.hero, alt: media.alt } : undefined} />

    <HomeSection className="bg-white py-16 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div><SectionHeading eyebrow="Support designed around your practice" title={copy.supportHeading} description={copy.intro} /><p className="mt-5 max-w-2xl text-base leading-8 text-brand-charcoal/80">{copy.supportNarrative}</p></div>
        {media ? <img src={media.workflow} alt={`${media.alt} example`} className="surface-card aspect-[4/3] w-full object-cover" loading="lazy" decoding="async" /> : null}
      </div>
    </HomeSection>

    <HomeSection className="bg-brand-background py-16 sm:py-20">
      <SectionHeading eyebrow="What support can look like day to day" title="Helping your team stay organized" description={copy.workflowNarrative} />
      <div className="mt-8 grid gap-5 md:grid-cols-2"><InfoCard title="The work around the visit" description={copy.supportNarrative} bullets={audience.supportAreas} /><InfoCard title="Why this can help" description={`${audience.challenges.join(" ")} Support is shaped around the practice’s agreed responsibilities, systems, communication channels, and escalation path.`} /></div>
    </HomeSection>

    <HomeSection className="bg-white py-16 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-center"><div className="order-2 lg:order-1">{media ? <img src={media.outcome} alt={`${media.alt} team support`} className="surface-card aspect-[4/3] w-full object-cover" loading="lazy" decoding="async" /> : null}</div><div className="order-1 lg:order-2"><SectionHeading eyebrow="Where remote support can make a difference" title={copy.benefitHeading} description={copy.benefitNarrative} /><ul className="mt-6 space-y-3 text-base leading-7 text-brand-charcoal/80">{benefits.map((benefit) => <li key={benefit} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-sky" aria-hidden="true" />{benefit}</li>)}</ul></div></div>
    </HomeSection>

    <HomeSection className="bg-brand-muted/50 py-16 sm:py-20"><SectionHeading eyebrow="A clear administrative support path" title="A workflow that fits your day-to-day rhythm" description="This is an example only; actual client procedures, systems, access, and supervision vary." /><ol className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">{audience.workflow.map((step, index) => <li key={step} className="surface-card p-5"><span className="text-sm font-bold text-brand-accent">0{index + 1}</span><p className="mt-3 text-sm leading-7 text-brand-charcoal/80">{step}</p></li>)}</ol></HomeSection>

    <HomeSection className="bg-white py-16 sm:py-20"><SectionHeading eyebrow="Responsible support" title="Prepared, privacy-conscious, and within the defined role" description={copy.boundary} /><div className="mt-8 grid gap-5 md:grid-cols-3"><InfoCard title="Explore Services" bullets={audience.relatedServices.map((service) => `${service} — discuss fit with your practice.`)} footer={<Link to="/services" className="font-semibold text-brand-accent">Explore Services →</Link>} /><InfoCard title="How we prepare MVAs" description="Our preparation focuses on professional communication, healthcare workflows, privacy-conscious working, remote collaboration, and knowing when to escalate." footer={<Link to="/how-we-prepare-mvas" className="font-semibold text-brand-accent">See How We Prepare MVAs →</Link>} /><InfoCard title="Privacy & compliance" description="Review educational guidance on confidentiality, responsible data handling, and approved workflows." footer={<Link to="/privacy-and-compliance" className="font-semibold text-brand-accent">Read Privacy Guidance →</Link>} /></div></HomeSection>

    <HomeSection className="bg-brand-background py-16 sm:py-20"><SectionHeading eyebrow="Relevant resources" title="Keep learning about this workflow" description="Open practical guides related to this healthcare audience." /><div className="mt-8 grid gap-5 md:grid-cols-2">{audience.relatedResources.map((resource) => <Link key={resource.slug} to={`/resources/${resource.slug}`} className="group surface-card p-6 transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"><p className="text-lg font-semibold text-brand-navy group-hover:underline">{resource.title}</p><span className="mt-4 inline-flex font-semibold text-brand-accent transition-transform group-hover:translate-x-1">Read guide →</span></Link>)}</div></HomeSection>

    {faqs.length ? <HomeSection className="bg-white py-16 sm:py-20"><SectionHeading eyebrow="FAQs" title="Common questions" description="Questions currently published in the MedLink VA FAQ content." /><div className="mt-8 space-y-4">{faqs.map((faq) => <ResponsiveDisclosure key={faq._id} title={faq.question}><p>{faq.answer?.map((block) => block.children.map((child) => child.text).join(" ")).join(" ") || "Contact MedLink VA to discuss this question."}</p></ResponsiveDisclosure>)}</div></HomeSection> : null}

    <PageCta title="Discuss support for your team" description="Tell us about the workflow, coordination, or administrative support your practice is considering." primaryAction={audience.cta} secondaryAction={{ label: "Hire an MVA", to: "/hire-an-mva" }} onPrimaryClick={() => trackHealthcareTeamCtaClick(audience.slug, audience.cta.to)} />
  </article>;
}
