import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { NewsletterSection } from "../components/home/NewsletterSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { useCmsBundle } from "../lib/cms/SiteContentProvider";
import { resolveClassesContent, resolveResourcesContent } from "../lib/cms/siteContent";
import { sanityImageSrc } from "../lib/sanity/image";
import { categoryImage, resourceCategories } from "../lib/resources";
import { trackResourceCategoryOpen } from "../lib/analytics";

function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(date);
}

function readTime(excerpt: string) {
  return `${Math.max(2, Math.ceil(excerpt.trim().split(/\s+/).length / 35))} min read`;
}

export function ResourcesPage() {
  const bundle = useCmsBundle();
  const resources = resolveResourcesContent(bundle);
  const classes = resolveClassesContent(bundle);
  const [searchParams] = useSearchParams();
  const selectedSlug = searchParams.get("category") ?? "";
  const selectedCategory = resourceCategories.find((category) => category.slug === selectedSlug)?.name;
  const records = selectedCategory ? resources.records.filter((post) => post.category.toLowerCase() === selectedCategory.toLowerCase()) : resources.records;
  const featured = records.filter((post) => post.featured).slice(0, 3);
  const latest = records.filter((post) => !featured.some((item) => item._id === post._id));
  const upcoming = classes.records.find((item) => (item.startDate ?? item.date)?.startsWith("2026-10-10"));

  useEffect(() => {
    if (!selectedSlug) return;
    trackResourceCategoryOpen(selectedSlug);
    document.getElementById("resource-articles")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedSlug]);

  return <article>
    <Seo title="Virtual Medical Assistant Resources | MedLink VA" description="Explore practical Virtual Medical Assistant training guidance, healthcare administration guides, career resources, workflow tips, and remote healthcare support resources." />
    <PageHero eyebrow={resources.hero.eyebrow} title={resources.hero.title} description={resources.hero.description} actions={resources.hero.actions} chips={["VMA training", "Healthcare administration", "Practice workflows"]} />
    {featured.length ? <HomeSection className="bg-brand-background py-16 sm:py-20"><SectionHeading eyebrow="Featured resources" title="Start with practical guidance" description="Published resources selected for learners, healthcare teams, and practices building organized workflows." /><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{featured.map((post) => <ResourceCard key={post._id} post={post} />)}</div></HomeSection> : null}
    {upcoming ? <HomeSection className="bg-white py-12 sm:py-16"><div className="surface-card border-brand-accent/30 bg-brand-sky/10 p-6 sm:p-8"><div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">Upcoming training</p><h2 className="mt-3 text-2xl font-semibold text-brand-navy">{upcoming.title}</h2><p className="mt-2 text-sm font-semibold text-brand-navy">Starts {formatDate(upcoming.startDate ?? upcoming.date)}</p><p className="mt-3 max-w-2xl text-base leading-7 text-brand-charcoal/80">{upcoming.shortDescription}</p></div><Link to="/classes" className="btn-primary justify-center">View Training</Link></div></div></HomeSection> : null}
    <HomeSection className="bg-brand-background py-16 sm:py-20"><SectionHeading eyebrow="Browse by category" title="Choose a useful starting point" description="Explore visual topic paths, then open a guide for deeper practical context." /><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{resourceCategories.map((category) => <Link key={category.slug} to={`/resources?category=${category.slug}`} className={`group surface-card overflow-hidden transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${selectedSlug === category.slug ? "border-brand-accent ring-2 ring-brand-accent/20" : ""}`} onClick={() => trackResourceCategoryOpen(category.slug)}><img src={category.image} alt="" className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy" decoding="async" /><div className="p-5"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">{selectedSlug === category.slug ? "Selected category" : "Resource category"}</p><h3 className="mt-2 text-xl font-semibold text-brand-navy">{category.name}</h3><p className="mt-2 text-sm leading-6 text-brand-charcoal/80">{category.description}</p><span className="mt-4 inline-flex font-semibold text-brand-accent transition-transform group-hover:translate-x-1">Explore <span aria-hidden="true" className="ml-1">→</span></span></div></Link>)}</div></HomeSection>
    <HomeSection id="resource-articles" className="scroll-mt-24 bg-white py-16 sm:py-20"><SectionHeading eyebrow={selectedCategory ?? "Latest articles & guides"} title={records.length ? "Practical reading for real workflows" : "New resources are on the way"} description={records.length ? "Open a guide for deeper explanations, related reading, and a relevant next step." : resources.emptyState.description} /><div className="mt-8">{records.length ? <div className="grid gap-5 lg:grid-cols-2">{latest.map((post) => <ResourceCard key={post._id} post={post} />)}</div> : <p className="surface-card p-6 text-sm leading-7 text-brand-charcoal/75">{resources.editorialNote}</p>}</div>{selectedCategory ? <Link to="/resources" className="mt-8 inline-flex font-semibold text-brand-accent">View all resources →</Link> : null}</HomeSection>
    <NewsletterSection />
    <PageCta title="Have a question about training or support?" description="Tell us what you would like to learn or discuss about healthcare administration and remote support." primaryAction={{ label: "Book a Consultation", to: "/book-consultation" }} secondaryAction={{ label: "Contact Medlink VA", to: "/contact" }} />
  </article>;
}

function ResourceCard({ post }: { post: ReturnType<typeof resolveResourcesContent>["records"][number] }) {
  const image = post.coverImage ? sanityImageSrc(post.coverImage, { width: 900, height: 506 }) : categoryImage(post.category);
  const label = post.callToActionLabel || "Read guide";
  const slug = post.slug?.current;
  return <Link to={slug ? `/resources/${slug}` : "/resources"} className="surface-card group flex h-full cursor-pointer flex-col overflow-hidden border-transparent transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">{image ? <img src={image} alt={post.coverImageAlt || ""} className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy" decoding="async" /> : null}<div className="flex flex-1 flex-col gap-3 p-6"><div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent"><span>{post.category}</span><span>{readTime(post.excerpt)}</span>{post.publishedAt ? <span>Published {formatDate(post.publishedAt)}</span> : null}{post.lastReviewedAt ? <span>Reviewed {formatDate(post.lastReviewedAt)}</span> : null}</div><h3 className="text-2xl font-semibold text-brand-navy group-hover:underline group-focus-visible:underline">{post.title}</h3><p className="text-sm leading-7 text-brand-charcoal/80">{post.excerpt}</p><span className="mt-auto inline-flex pt-2 font-semibold text-brand-accent transition-transform group-hover:translate-x-1">{label} <span aria-hidden="true" className="ml-1">→</span></span></div></Link>;
}
