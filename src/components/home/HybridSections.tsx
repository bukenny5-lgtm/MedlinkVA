import { Link } from "react-router-dom";
import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { InfoCard } from "../shared/InfoCard";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { trackImpactCtaClick } from "../../lib/analytics";

export function HomePathways() {
  return <HomeSection className="bg-brand-background py-16 sm:py-20"><SectionHeading eyebrow="Choose your pathway" title="Where would you like to start?" description="MedLink VA trains people, creates career opportunities, and connects healthcare practices with trained Virtual Medical Assistants." /><div className="mt-8 grid gap-5 lg:grid-cols-2"><InfoCard eyebrow="For aspiring MVAs" title="I Want to Become a Virtual Medical Assistant" description="Build practical healthcare administrative and clinical support skills, gain career preparation, and access placement support." footer={<Link to="/classes" className="btn-primary">Explore Training →</Link>} /><InfoCard eyebrow="For healthcare practices" title="I Want to Hire a Virtual Medical Assistant" description="Connect with trained Virtual Medical Assistants prepared to support healthcare workflows, patient coordination, scheduling, documentation, and administrative operations." footer={<Link to="/hire-an-mva" className="btn-primary">Hire an MVA →</Link>} /></div></HomeSection>;
}

export function HomeImpactPreview() {
  const metrics = useCmsBundle()?.aboutContent?.metrics?.filter((metric) => metric.active !== false && metric.label && metric.value) ?? [];
  return <HomeSection className="bg-white py-16 sm:py-20"><SectionHeading eyebrow="Our impact" title="Our Impact in Numbers" description="A snapshot of the people trained, opportunities created, and healthcare support enabled through MedLink VA." /><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{metrics.length ? metrics.slice(0, 4).map((metric) => <div key={`${metric.label}-${metric.value}`} className="surface-card p-6"><p className="text-4xl font-bold text-brand-accent">{metric.value}{metric.suffix ?? ""}</p><h3 className="mt-3 text-lg font-semibold text-brand-navy">{metric.label}</h3><p className="mt-2 text-sm leading-6 text-brand-charcoal/75">{metric.description}</p></div>) : <div className="surface-card p-6 sm:col-span-2"><p className="text-sm leading-7 text-brand-charcoal/75">Verified impact metrics will appear here as they are maintained in the CMS.</p></div>}</div><div className="mt-8"><Link to="/impact" className="btn-secondary" onClick={() => trackImpactCtaClick("Explore Our Impact", "/impact", "homepage_impact_preview")}>Explore Our Impact →</Link></div></HomeSection>;
}

export function HomeImpactModel() {
  const steps = [["Train", "Practical Virtual Medical Assistant education"], ["Prepare", "Healthcare workflows, simulations, and career readiness"], ["Connect", "Placement support and employer connections"], ["Support", "Ongoing learning, development, and professional support"]] as const;
  return <HomeSection className="bg-brand-muted/50 py-16 sm:py-20"><SectionHeading eyebrow="How MedLink VA creates impact" title="From learning to opportunity" description="A connected pathway for aspiring Virtual Medical Assistants and healthcare practices." /><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{steps.map(([title, description], index) => <InfoCard key={title} eyebrow={`0${index + 1}`} title={title} description={description} />)}</div></HomeSection>;
}

export function HomeTrustLinks() {
  return <HomeSection className="bg-white py-16 sm:py-20"><div className="grid gap-5 md:grid-cols-2"><InfoCard title="How we prepare MVAs" description="Learn about practical workflows, professional communication, responsible data handling, simulation, and career readiness." footer={<Link to="/how-we-prepare-mvas" className="font-semibold text-brand-accent">See our preparation approach →</Link>} /><InfoCard title="Privacy-conscious support" description="Explore educational guidance on HIPAA awareness, confidentiality, secure communication, and responsible data handling." footer={<Link to="/privacy-and-compliance" className="font-semibold text-brand-accent">Read privacy guidance →</Link>} /></div></HomeSection>;
}
