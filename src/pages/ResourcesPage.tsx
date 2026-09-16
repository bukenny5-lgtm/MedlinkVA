import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { NewsletterSection } from "../components/home/NewsletterSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { useCmsBundle } from "../lib/cms/SiteContentProvider";
import { resolveClassesContent, resolveResourcesContent } from "../lib/cms/siteContent";
import { sanityImageSrc } from "../lib/sanity/image";

function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(date);
}

export function ResourcesPage() {
  const bundle = useCmsBundle();
  const resources = resolveResourcesContent(bundle);
  const classes = resolveClassesContent(bundle);
  const upcoming = classes.records.find((item) => (item.startDate ?? item.date)?.startsWith("2026-10-10"));
  const featured = resources.records.filter((post) => post.featured).slice(0, 3);
  const latest = resources.records.filter((post) => !featured.some((item) => item._id === post._id));

  return <article>
    <Seo title="Virtual Medical Assistant Resources | MedLink VA" description="Explore Virtual Medical Assistant resources, VMA training guidance, healthcare administration guides, workflow tips, insurance verification guidance, and remote healthcare administration resources." />
    <PageHero eyebrow={resources.hero.eyebrow} title={resources.hero.title} description={resources.hero.description} actions={resources.hero.actions} chips={["VMA training", "Healthcare administration", "Practice workflows"]} />

    {featured.length ? <HomeSection className="bg-brand-background py-16 sm:py-20"><SectionHeading eyebrow="Featured resources" title="Start with practical guidance" description="Published resources selected for learners, healthcare teams, and practices building organized workflows." /><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{featured.map((post) => <ResourceCard key={post._id} post={post} />)}</div></HomeSection> : null}

    {upcoming ? <HomeSection className="bg-white py-12 sm:py-16"><div className="surface-card border-brand-accent/30 bg-brand-sky/10 p-6 sm:p-8"><div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">Upcoming training</p><h2 className="mt-3 text-2xl font-semibold text-brand-navy">{upcoming.title}</h2><p className="mt-2 text-sm font-semibold text-brand-navy">Starts {formatDate(upcoming.startDate ?? upcoming.date)}</p><p className="mt-3 max-w-2xl text-base leading-7 text-brand-charcoal/80">{upcoming.shortDescription}</p></div><Link to="/classes" className="btn-primary justify-center">View Training</Link></div></div></HomeSection> : null}

    <HomeSection className="bg-brand-background py-16 sm:py-20"><SectionHeading eyebrow="Browse by category" title="Find a useful starting point" description="Explore resource topics as the library grows." /><div className="mt-8 flex flex-wrap gap-3">{resources.categories.map((category) => <span key={category} className="rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-medium text-brand-navy shadow-soft">{category}</span>)}</div></HomeSection>

    <HomeSection className="bg-white py-16 sm:py-20"><SectionHeading eyebrow="Latest articles & guides" title={latest.length ? "Ideas for everyday healthcare workflows" : "New resources are on the way"} description={latest.length ? "Read the latest published guidance from MedLink VA." : resources.emptyState.description} /><div className="mt-8">{latest.length ? <div className="grid gap-5 lg:grid-cols-2">{latest.map((post) => <ResourceCard key={post._id} post={post} />)}</div> : <p className="surface-card p-6 text-sm leading-7 text-brand-charcoal/75">{resources.editorialNote}</p>}</div></HomeSection>

    <NewsletterSection />
    <PageCta title="Have a question about training or support?" description="Tell us what you would like to learn or discuss the administrative needs of your practice." primaryAction={{ label: "Book a Consultation", to: "/book-consultation" }} secondaryAction={{ label: "Contact Medlink VA", to: "/contact" }} />
  </article>;
}

function ResourceCard({ post }: { post: ReturnType<typeof resolveResourcesContent>["records"][number] }) {
  const image = post.coverImage ? sanityImageSrc(post.coverImage, { width: 900, height: 600 }) : null;
  const label = post.callToActionLabel || "Read Resource";
  return <article className="surface-card flex h-full flex-col overflow-hidden">{image ? <img src={image} alt={post.coverImageAlt || post.title} className="aspect-[3/2] w-full object-cover" loading="lazy" decoding="async" /> : null}<div className="flex flex-1 flex-col gap-3 p-6"><div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent"><span>{post.resourceType || post.category}</span>{post.publishedAt ? <span>{formatDate(post.publishedAt)}</span> : null}</div><h3 className="text-2xl font-semibold text-brand-navy">{post.title}</h3><p className="text-sm leading-7 text-brand-charcoal/80">{post.excerpt}</p><div className="mt-auto pt-2">{post.slug?.current ? <Link to={`/resources/${post.slug.current}`} className="btn-secondary">{label} <span aria-hidden="true">→</span></Link> : post.externalUrl ? <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">{label} <span aria-hidden="true">↗</span></a> : null}</div></div></article>;
}
