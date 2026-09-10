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
    <SectionHeading eyebrow={resourcesPreview.eyebrow} title="Practical resources for healthcare teams" description="Explore guides, workflow tips, training insights, and educational resources for Virtual Medical Assistants and healthcare practices." />
    <div className="mt-8 grid gap-5 md:grid-cols-3">{resources.length ? resources.map((post) => { const image = post.coverImage ? sanityImageSrc(post.coverImage, { width: 600, height: 400 }) : null; return <article key={post._id} className="surface-card overflow-hidden">{image ? <img src={image} alt={post.coverImageAlt || post.title} className="aspect-[3/2] w-full object-cover" loading="lazy" decoding="async" /> : null}<div className="p-5"><p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">{post.resourceType || post.category}</p><h3 className="mt-2 text-lg font-semibold text-brand-navy">{post.title}</h3><p className="mt-2 text-sm leading-6 text-brand-charcoal/75">{post.excerpt}</p></div></article>; }) : resourcesPreview.concepts.slice(0, 3).map((concept) => <article key={concept} className="surface-card p-5"><h3 className="text-lg font-semibold text-brand-navy">{concept}</h3><p className="mt-2 text-sm leading-6 text-brand-charcoal/80">Practical topics for learners and healthcare teams.</p></article>)}</div>
    <div className="mt-8"><Link to="/resources" className="btn-secondary">Explore Resources</Link></div>
  </HomeSection>;
}
