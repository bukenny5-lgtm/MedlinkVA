import { Link } from "react-router-dom";
import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { resolveHomeContent } from "../../lib/cms/homeContent";
import { resolveAboutContent } from "../../lib/cms/aboutContent";

export function HomeTrustStrip() {
  const items = resolveHomeContent(useCmsBundle()).trustStrip.slice(0, 3);
  return <HomeSection className="bg-brand-muted/50 py-10 sm:py-12"><div className="grid gap-4 md:grid-cols-3">{items.map((item) => <article key={item.title} className="border-l-2 border-brand-accent pl-4"><h2 className="text-base font-semibold text-brand-navy">{item.title}</h2><p className="mt-1 text-sm leading-6 text-brand-charcoal/75">{item.description}</p></article>)}</div></HomeSection>;
}

export function HomepageCredibility() {
  const about = resolveAboutContent(useCmsBundle());
  const members = [...about.team.members].sort((a, b) => a.displayOrder - b.displayOrder).slice(0, 2);
  return <HomeSection className="bg-brand-sky/10 py-14 sm:py-16"><div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center"><div><SectionHeading eyebrow="About MedLink VA" title="Practical training and thoughtful healthcare support" description="MedLink VA combines Virtual Medical Assistant training with healthcare support services designed for remote workflows." /><Link to="/about" className="btn-secondary mt-6">Learn About MedLink VA</Link><div className="mt-8 flex flex-wrap gap-3" aria-label="MedLink VA partners">{about.partners.map((partner) => <span key={partner.name} className="rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-semibold text-brand-navy">{partner.name}</span>)}</div></div><div><p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent">Meet the people behind MedLink VA</p><div className="mt-4 grid grid-cols-2 gap-4">{members.map((member) => <article key={member.name} className="surface-card overflow-hidden"><img src={member.image} alt={member.alt} className="aspect-[4/5] w-full object-cover object-top" loading="lazy" decoding="async" /><div className="p-4"><h3 className="font-semibold text-brand-navy">{member.name}</h3><p className="mt-1 text-sm text-brand-charcoal/70">{member.role}</p></div></article>)}</div><Link to="/about" className="mt-4 inline-flex font-semibold text-brand-accent underline underline-offset-4">Meet the Team</Link></div></div></HomeSection>;
}

export function HomepageQuickLinks() {
  const links = [["Training", "Build practical VMA skills.", "/classes"], ["Hire an MVA", "Find support for your practice.", "/hire-an-mva"], ["Services", "Explore healthcare workflow support.", "/services"], ["Impact", "See verified progress.", "/impact"], ["Resources", "Browse practical guides.", "/resources"], ["Products", "Find useful tools and learning materials.", "/products"], ["About", "Learn how MedLink VA works.", "/about"], ["FAQs", "Get answers to common questions.", "/faqs"]] as const;
  return <HomeSection className="bg-white py-14 sm:py-16"><SectionHeading eyebrow="Explore MedLink VA" title="Find the right MedLink VA resource" description="Use these quick links to navigate directly to the section most relevant to your needs." /><nav className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Homepage quick links">{links.map(([title, description, to]) => <Link key={to} to={to} className="surface-card group p-5 transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"><h3 className="font-semibold text-brand-navy group-hover:underline">{title}</h3><p className="mt-1 text-sm leading-6 text-brand-charcoal/70">{description}</p></Link>)}</nav></HomeSection>;
}
