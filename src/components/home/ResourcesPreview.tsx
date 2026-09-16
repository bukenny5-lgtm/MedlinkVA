import { Link } from "react-router-dom";
import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { resolveHomeContent, resolveResourcesContent } from "../../lib/cms/siteContent";
import { sanityImageSrc } from "../../lib/sanity/image";

export function ResourcesPreview() {
  const bundle = useCmsBundle();
  const { resourcesPreview } = resolveHomeContent(bundle);
  const resources = resolveResourcesContent(bundle).records.slice(0, 3);
  return <HomeSection className="bg-brand-sky/10 py-16 sm:py-20">
    <SectionHeading eyebrow={resourcesPreview.eyebrow} title={resourcesPreview.title} description={resourcesPreview.description} />
    <div className="mt-8 grid gap-5 md:grid-cols-3">{resources.length ? resources.map((post) => { const image = post.coverImage ? sanityImageSrc(post.coverImage, { width: 600, height: 400 }) : null; return <Link key={post._id} to={`/resources/${post.slug}`} className="surface-card group overflow-hidden transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent motion-reduce:transform-none">{image ? <img src={image} alt={post.coverImageAlt || post.title} className="aspect-[3/2] w-full object-cover" loading="lazy" decoding="async" /> : null}<div className="p-5"><p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">{post.resourceType || post.category}</p><h3 className="mt-2 text-lg font-semibold text-brand-navy group-hover:underline">{post.title}</h3><p className="mt-2 text-sm leading-6 text-brand-charcoal/75">{post.excerpt}</p><span className="mt-4 inline-flex text-sm font-semibold text-brand-accent transition-transform group-hover:translate-x-1">Read guide →</span></div></Link>; }) : resourcesPreview.concepts.slice(0, 3).map((concept) => <article key={concept} className="surface-card p-5"><h3 className="text-lg font-semibold text-brand-navy">{concept}</h3><p className="mt-2 text-sm leading-6 text-brand-charcoal/80">Practical topics for learners and healthcare teams.</p></article>)}</div>
    <div className="mt-8"><Link to="/resources" className="btn-secondary">Explore Resources</Link></div>
  </HomeSection>;
}
