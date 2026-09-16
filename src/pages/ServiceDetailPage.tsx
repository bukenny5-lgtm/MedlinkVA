import { Link, useParams } from "react-router-dom";
import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { PageHero } from "../components/shared/PageHero";
import { PageCta } from "../components/shared/PageCta";
import { InfoCard } from "../components/shared/InfoCard";
import { getServiceDetail } from "../content/serviceDetails";
import { trackEvent, trackServiceCtaClick } from "../lib/analytics";
import { useEffect } from "react";

export function ServiceDetailPage() {
  const { serviceSlug = "" } = useParams();
  const service = getServiceDetail(serviceSlug);

  useEffect(() => {
    if (service) trackEvent("service_open", { service_type: service.slug, destination: `/services/${service.slug}` });
  }, [service?.slug]);

  if (!service) return <article><Seo title="Service not found | MedLink VA" robots="noindex,follow" /><PageHero eyebrow="Services" title="Service not found" description="Return to the services page to explore available support categories." actions={[{ label: "Explore Services", to: "/services", variant: "primary" }]} /></article>;

  return <article>
    <Seo title={service.seoTitle} description={service.description} />
    <PageHero eyebrow="Healthcare administrative support" title={service.title} description={service.description} actions={[{ label: "Book a Consultation", to: "/book-consultation", variant: "primary" }, { label: "Explore Services", to: "/services", variant: "secondary" }]} image={{ src: service.image, alt: service.imageAlt }} mediaVariant="article" />

    <HomeSection className="bg-white py-16 sm:py-20"><SectionHeading eyebrow="An overview" title="Support that fits the work already happening" description={service.intro} /><p className="mt-5 max-w-3xl text-base leading-8 text-brand-charcoal/80">{service.support}</p></HomeSection>
    <HomeSection className="bg-brand-background py-16 sm:py-20"><SectionHeading eyebrow="In practice" title="What this support can look like" description="The exact responsibilities, systems, access, and supervision are agreed with each practice." /><div className="mt-8 grid gap-5 lg:grid-cols-2"><InfoCard title="Typical responsibilities" bullets={service.responsibilities} /><InfoCard title="Where it can help the team" description={service.teamBenefit} /></div></HomeSection>
    <HomeSection className="bg-white py-16 sm:py-20"><SectionHeading eyebrow="Example workflow" title="A clear path from request to follow-up" description="This example is for orientation. Each practice defines its own process and escalation route." /><ol className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">{service.workflow.map((step, index) => <li key={step} className="surface-card p-5"><span className="text-sm font-bold text-brand-accent">0{index + 1}</span><p className="mt-3 text-sm leading-7 text-brand-charcoal/80">{step}</p></li>)}</ol></HomeSection>
    <HomeSection className="bg-brand-muted/50 py-16 sm:py-20"><SectionHeading eyebrow="Role boundaries" title="Responsible, non-clinical support" description={service.boundaries} /></HomeSection>
    <HomeSection className="bg-white py-16 sm:py-20"><SectionHeading eyebrow="Related paths" title="Explore related healthcare teams and resources" description="See where this service may fit and keep learning about the work." /><div className="mt-8 grid gap-5 md:grid-cols-2"><InfoCard title="Healthcare audiences" bullets={service.audiences.map((item) => item.label)} footer={<div className="space-y-2">{service.audiences.map((item) => <Link key={item.to} to={item.to} className="block font-semibold text-brand-accent hover:underline">Explore {item.label} →</Link>)}</div>} /><InfoCard title="Related resources" bullets={service.resources.map((item) => item.label)} footer={<div className="space-y-2">{service.resources.map((item) => <Link key={item.to} to={item.to} className="block font-semibold text-brand-accent hover:underline">Read {item.label} →</Link>)}</div>} /></div></HomeSection>
    <PageCta title="Discuss this kind of support" description="Tell us about the responsibilities, systems, and routine work your practice is considering." primaryAction={{ label: "Book a Consultation", to: "/book-consultation" }} secondaryAction={{ label: "Contact MedLink VA", to: "/contact" }} onPrimaryClick={() => trackServiceCtaClick(service.slug, "Book a Consultation")} />
  </article>;
}
