import { useEffect, useState, type FormEvent } from "react";
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
import { trackEvent, trackResourceCategoryOpen, trackResourceOpen } from "../lib/analytics";
import { eligibleForResources, eventImage, resolveEvents } from "../lib/events";

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
  const [query, setQuery] = useState("");
  const selectedSlug = searchParams.get("category") ?? "";
  const selectedCategory = resourceCategories.find((category) => category.slug === selectedSlug)?.name;
  const records = selectedCategory ? resources.records.filter((post) => post.category.toLowerCase() === selectedCategory.toLowerCase()) : resources.records;
  const normalizedQuery = query.trim().toLowerCase();
  const filteredRecords = normalizedQuery ? records.filter((post) => `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(normalizedQuery)) : records;
  const featured = filteredRecords.filter((post) => post.featured).slice(0, 3);
  const latest = filteredRecords.filter((post) => !featured.some((item) => item._id === post._id));
  const recent = [...records].sort((a, b) => new Date(b.lastReviewedAt ?? b.publishedAt ?? 0).getTime() - new Date(a.lastReviewedAt ?? a.publishedAt ?? 0).getTime()).slice(0, 3);
  const events = resolveEvents(bundle?.events);
  const upcomingEvents = events.filter(eligibleForResources);
  const pastEvents = events.filter((event) => event.active && event.showInResources && event.status === "past");
  const upcoming = classes.records.find((item) => (item.startDate ?? item.date)?.startsWith("2026-10-10"));
  const categoryChips = resourceCategories.map((category) => ({ label: category.name, to: `/resources?category=${category.slug}` }));

  useEffect(() => {
    if (!selectedSlug) return;
    trackResourceCategoryOpen(selectedSlug);
    document.getElementById("resource-library")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedSlug]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackEvent("resource_search", { query_length: query.trim().length, result_count: filteredRecords.length });
  }

  return <article>
    <Seo title="Virtual Medical Assistant Resources | MedLink VA" description="Explore practical Virtual Medical Assistant training guidance, healthcare administration guides, career resources, workflow tips, and remote healthcare support resources." />
    <PageHero eyebrow={resources.hero.eyebrow} title={resources.hero.title} description={resources.hero.description} actions={resources.hero.actions} chips={categoryChips} />
    <HomeSection className="bg-brand-background py-16 sm:py-20"><SectionHeading eyebrow="Start with what you need" title="What would you like help with?" description="Choose a topic to find practical guidance for learning, career preparation, or healthcare operations." /><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{resourceCategories.map((category) => <Link key={category.slug} to={`/resources?category=${category.slug}`} className={`group surface-card overflow-hidden transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${selectedSlug === category.slug ? "border-brand-accent ring-2 ring-brand-accent/20" : ""}`} onClick={() => trackResourceCategoryOpen(category.slug)}><img src={category.image} alt={`${category.name} resources`} className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy" decoding="async" /><div className="p-5"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">{selectedSlug === category.slug ? "Selected category" : "Resource category"}</p><h3 className="mt-2 text-xl font-semibold text-brand-navy">{category.name}</h3><p className="mt-2 text-sm leading-6 text-brand-charcoal/80">{category.description}</p><span className="mt-4 inline-flex font-semibold text-brand-accent transition-transform group-hover:translate-x-1">Explore <span aria-hidden="true" className="ml-1">→</span></span></div></Link>)}</div></HomeSection>
    <HomeSection className="bg-white py-16 sm:py-20"><SectionHeading eyebrow="Choose your path" title="Resources for the next step" description="Start with the perspective that best matches what you are working toward." /><div className="mt-8 grid gap-5 lg:grid-cols-2"><Link to="/resources?category=vma-training" className="surface-card group p-6 transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-accent">For aspiring Virtual Medical Assistants</p><h3 className="mt-3 text-2xl font-semibold text-brand-navy">Build confidence for the work ahead</h3><p className="mt-3 max-w-xl leading-7 text-brand-charcoal/80">Learn about VMA responsibilities, training, professional communication, interviews, and the habits that support dependable remote healthcare work.</p><span className="mt-5 inline-flex font-semibold text-brand-accent transition-transform group-hover:translate-x-1">Explore learner resources <span aria-hidden="true" className="ml-1">→</span></span></Link><Link to="/resources?category=healthcare-administration" className="surface-card group p-6 transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-accent">For healthcare practices</p><h3 className="mt-3 text-2xl font-semibold text-brand-navy">Make support workflows easier to understand</h3><p className="mt-3 max-w-xl leading-7 text-brand-charcoal/80">Explore practical context for scheduling, coordination, communication, billing support, and the role boundaries that help remote support work well.</p><span className="mt-5 inline-flex font-semibold text-brand-accent transition-transform group-hover:translate-x-1">Explore practice resources <span aria-hidden="true" className="ml-1">→</span></span></Link></div></HomeSection>
    {featured.length ? <HomeSection className="bg-brand-background py-16 sm:py-20"><SectionHeading eyebrow="Featured resources" title="A good place to start" description="These practical guides are a useful first step for understanding the work, the expectations, and the workflows behind remote healthcare support." /><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{featured.map((post) => <ResourceCard key={post._id} post={post} />)}</div></HomeSection> : null}
    {upcomingEvents.length ? <HomeSection className="bg-brand-sky/10 py-12 sm:py-16"><SectionHeading eyebrow="Upcoming & featured events" title="Events from MedLink VA" description="Join upcoming training, webinars, launch activities, and workshops." /><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{upcomingEvents.map((event) => <EventCard key={event.id} event={event} />)}</div></HomeSection> : null}
    {upcoming ? <HomeSection className="bg-white py-12 sm:py-16"><div className="surface-card border-brand-accent/30 bg-brand-sky/10 p-6 sm:p-8"><div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">Upcoming training</p><h2 className="mt-3 text-2xl font-semibold text-brand-navy">{upcoming.title}</h2><p className="mt-2 text-sm font-semibold text-brand-navy">Starts {formatDate(upcoming.startDate ?? upcoming.date)}</p><p className="mt-3 max-w-2xl text-base leading-7 text-brand-charcoal/80">{upcoming.shortDescription}</p></div><Link to="/classes" className="btn-primary justify-center">View Training</Link></div></div></HomeSection> : null}
    {pastEvents.length ? <HomeSection className="bg-brand-background py-16 sm:py-20"><SectionHeading eyebrow="Archive" title="Past Events" description="Explore previous MedLink VA events, training sessions, webinars, and launch activities." /><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{pastEvents.map((event) => <EventCard key={event.id} event={event} />)}</div></HomeSection> : null}
    {recent.length ? <HomeSection className="bg-brand-background py-16 sm:py-20"><SectionHeading eyebrow="Recently added or reviewed" title="Keep your understanding current" description="Browse the latest additions and recently reviewed guides before exploring the full library." /><div className="mt-8 grid gap-5 lg:grid-cols-3">{recent.map((post) => <ResourceCard key={post._id} post={post} />)}</div></HomeSection> : null}
    <HomeSection id="resource-library" className="scroll-mt-24 bg-white py-16 sm:py-20"><SectionHeading eyebrow={selectedCategory ?? "Resource library"} title="Explore the resource library" description="Search the library or filter by topic to find practical guidance for your next question." /><form className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row" onSubmit={submitSearch}><label htmlFor="resource-search" className="sr-only">Search guides and resources</label><input id="resource-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search guides and resources" className="min-h-12 flex-1 rounded-full border border-brand-navy/15 bg-white px-5 text-base text-brand-navy outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20" /><button type="submit" className="btn-primary justify-center">Search</button>{query ? <button type="button" className="btn-secondary justify-center" onClick={() => setQuery("")}>Clear</button> : null}</form><div className="mt-8">{filteredRecords.length ? <div className="grid gap-5 lg:grid-cols-2">{filteredRecords.map((post) => <ResourceCard key={post._id} post={post} />)}</div> : <p className="surface-card p-6 text-sm leading-7 text-brand-charcoal/75">No guides match that search yet. Try another phrase or clear the search.</p>}</div>{selectedCategory ? <Link to="/resources" className="mt-8 inline-flex font-semibold text-brand-accent">View all resources →</Link> : null}</HomeSection>
    <NewsletterSection />
    <PageCta eyebrow="Need more help?" title="Not sure which resource is right for you?" description="If you are not sure where to begin, we can help you connect your goals with the right training, support, or next conversation." primaryAction={{ label: "Explore Training", to: "/classes" }} secondaryAction={{ label: "Book a Consultation", to: "/book-consultation" }} />
  </article>;
}

function ResourceCard({ post }: { post: ReturnType<typeof resolveResourcesContent>["records"][number] }) {
  const image = post.coverImage ? sanityImageSrc(post.coverImage, { width: 900, height: 506 }) : categoryImage(post.category);
  const label = post.callToActionLabel || "Read guide";
  const slug = post.slug?.current;
  return <Link to={slug ? `/resources/${slug}` : "/resources"} className="surface-card group flex h-full cursor-pointer flex-col overflow-hidden border-transparent transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">{image ? <img src={image} alt={post.coverImageAlt || `${post.category} resource`} className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy" decoding="async" /> : null}<div className="flex flex-1 flex-col gap-3 p-6"><div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent"><span>{post.category}</span><span>{readTime(post.excerpt)}</span>{post.publishedAt ? <span>Published {formatDate(post.publishedAt)}</span> : null}{post.lastReviewedAt ? <span>Reviewed {formatDate(post.lastReviewedAt)}</span> : null}</div><h3 className="text-2xl font-semibold text-brand-navy group-hover:underline group-focus-visible:underline">{post.title}</h3><p className="text-sm leading-7 text-brand-charcoal/80">{post.excerpt}</p><span className="mt-auto inline-flex pt-2 font-semibold text-brand-accent transition-transform group-hover:translate-x-1">{label} <span aria-hidden="true" className="ml-1">→</span></span></div></Link>;
}

function EventCard({ event }: { event: ReturnType<typeof resolveEvents>[number] }) {
  const image = eventImage(event, 900);
  const date = new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date(event.startDateTime));
  return <Link to={event.path} onClick={() => trackResourceOpen(event.slug, event.title)} className="surface-card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">{image ? <img src={image} alt={`${event.title} cover`} className="aspect-video w-full object-cover" loading="lazy" decoding="async" /> : null}<div className="flex flex-1 flex-col gap-3 p-6"><div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent"><span>{event.status === "live" ? "Live now" : event.status === "past" ? "Event completed" : "Upcoming"}</span><span>{date}</span>{event.format ? <span>{event.format}</span> : null}</div><h3 className="text-2xl font-semibold text-brand-navy group-hover:underline">{event.title}</h3><p className="text-sm leading-7 text-brand-charcoal/80">{event.shortDescription}</p><span className="mt-auto inline-flex pt-2 font-semibold text-brand-accent">{event.status === "past" ? "View Event Summary" : "View Event"} <span aria-hidden="true" className="ml-1">→</span></span></div></Link>;
}
