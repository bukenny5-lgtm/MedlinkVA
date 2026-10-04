import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { useCmsBundle } from "../lib/cms/SiteContentProvider";
import { resolveProductsContent, resolveResolvedSiteSettings } from "../lib/cms/siteContent";
import { sanityImageSrc } from "../lib/sanity/image";
import type { ProductLinkDocument } from "../lib/sanity/types";
import type { LocalProduct } from "../content/products";

type Product = ProductLinkDocument | LocalProduct;

function productImage(product: Product) {
  return typeof product.image === "string" ? product.image : sanityImageSrc(product.image, { width: 800 });
}

function ProductCard({ product }: { product: Product }) {
  const image = productImage(product);
  const features = product.features?.slice(0, 3) ?? [];
  const actionLabel = product.ctaLabel && !/selar/i.test(product.ctaLabel) ? product.ctaLabel : "View Product";

  return <article className="surface-card flex h-full flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1">
    <div className="flex h-64 items-center justify-center bg-brand-muted/40 p-4 sm:h-72">
      {image ? <img src={image} alt={product.altText || `MedLink VA ${product.name} cover`} className="h-full w-full object-contain" loading="lazy" decoding="async" /> : <div className="text-sm text-brand-charcoal/60">Product cover coming soon</div>}
    </div>
    <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-brand-sky/15 px-3 py-1 text-xs font-semibold text-brand-navy">{product.category ?? "MedLink VA resource"}</span>
        {product.featured ? <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent">Featured</span> : null}
      </div>
      <h3 className="text-xl font-semibold leading-tight text-brand-navy">{product.name}</h3>
      <p className="text-sm leading-6 text-brand-charcoal/80">{product.shortDescription}</p>
      {features.length ? <ul className="space-y-1 text-sm text-brand-charcoal/75">{features.map((feature) => <li key={feature}>• {feature}</li>)}</ul> : null}
      <div className="mt-auto space-y-3 pt-2">
        {product.priceLabel ? <p className="text-sm font-medium text-brand-navy">{product.priceLabel}</p> : null}
        <a href={product.externalUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">{actionLabel}<span aria-hidden="true"> ↗</span></a>
        <p className="text-xs text-brand-charcoal/60">Opens the secure external purchase page.</p>
      </div>
    </div>
  </article>;
}

export function ProductsPage() {
  const cmsBundle = useCmsBundle();
  const content = resolveProductsContent(cmsBundle);
  const site = resolveResolvedSiteSettings(cmsBundle);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const categories = useMemo(() => Array.from(new Set(content.records.map((product) => product.category).filter((value) => value != null))) as string[], [content.records]);
  const selectedCategory = category && categories.includes(category) ? category : "";
  const filteredRecords = selectedCategory ? content.records.filter((product) => product.category === selectedCategory) : content.records;
  const featured = filteredRecords.filter((product) => product.featured).slice(0, 3);
  const featuredIds = new Set(featured.map((product) => product._id));
  const allProducts = filteredRecords.filter((product) => !featuredIds.has(product._id));
  const storeUrl = site.externalProductStoreUrl || "https://selar.com/m/rachealopasola";

  useEffect(() => {
    if (category) document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [category]);

  return <article className="space-y-0">
    <Seo title="Templates, Guides & Training Resources | MedLink VA" description="Explore practical templates, guides, classes, and training resources for healthcare administration and Virtual Medical Assistant workflows." />
    <PageHero eyebrow={content.hero.eyebrow} title={content.hero.title} description={content.hero.description} actions={content.hero.actions} chips={categories.map((item) => ({ label: item, to: `/products?category=${encodeURIComponent(item)}#products` }))} />
    {featured.length ? <HomeSection id="products" className="scroll-mt-24 bg-brand-background py-16 sm:py-20"><SectionHeading eyebrow="Start here" title="Start with something useful" description="These featured resources are a good place to begin if you are looking for practical tools, learning materials, or workflow support you can use right away. Each product is designed around common needs in Virtual Medical Assistant training and healthcare administration." /><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{featured.map((product) => <ProductCard key={product._id} product={product} />)}</div></HomeSection> : null}
    <HomeSection id={featured.length ? undefined : "products"} className="scroll-mt-24 bg-white py-16 sm:py-20"><SectionHeading eyebrow="Catalogue" title="Explore the full collection" description="Browse the complete MedLink VA product collection and choose the resources that match what you are learning, building, or trying to improve. Open any product to see what it includes, who it is designed for, and how it may help you." /><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{(allProducts.length ? allProducts : filteredRecords).map((product) => <ProductCard key={product._id} product={product} />)}</div>{selectedCategory ? <Link to="/products#products" className="mt-8 inline-flex font-semibold text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">View all products →</Link> : null}</HomeSection>
    <HomeSection className="bg-brand-background py-16 sm:py-20"><div className="surface-card grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:p-10"><div className="space-y-3"><p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">Explore more resources</p><h2 className="heading-section">More templates, training resources, and professional tools</h2><p className="max-w-2xl text-base leading-7 text-brand-charcoal/80">Browse additional MedLink VA templates, training resources, and professional tools from the wider collection.</p><p className="text-sm text-brand-charcoal/65">Product details and purchase options are available through the linked external destinations.</p></div><a href={storeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary justify-center">Browse Collection <span aria-hidden="true">↗</span></a></div></HomeSection>
    <HomeSection className="bg-white py-16 sm:py-20"><SectionHeading eyebrow="Built to be practical" title="Built to be practical" description="MedLink VA products are designed around real learning and administrative needs rather than unnecessary complexity." /><div className="mt-8 grid gap-5 md:grid-cols-3"><article className="surface-card p-6 transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg"><h3 className="text-xl font-semibold text-brand-navy">Useful for real tasks</h3><p className="mt-3 text-sm leading-7 text-brand-charcoal/80">Our templates and tools are created around everyday administrative needs so you can spend less time figuring out where to start and more time putting the resource to use.</p></article><article className="surface-card p-6 transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg"><h3 className="text-xl font-semibold text-brand-navy">Focused, not complicated</h3><p className="mt-3 text-sm leading-7 text-brand-charcoal/80">Each product is designed to support a specific need, whether that is organizing a workflow, preparing for work, or building confidence in a new skill.</p></article><article className="surface-card p-6 transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg"><h3 className="text-xl font-semibold text-brand-navy">Learn at your own pace</h3><p className="mt-3 text-sm leading-7 text-brand-charcoal/80">Guides and learning resources give you a structured way to build practical skills without feeling overwhelmed by unnecessary complexity.</p></article></div></HomeSection>
    <PageCta eyebrow="Need help choosing?" title="Not sure which resource is right for you?" description="Tell us what you are trying to learn, organize, or improve and we can point you toward the most relevant MedLink VA resource." primaryAction={{ label: "Explore Products", to: "#products" }} secondaryAction={{ label: "Contact MedLink VA", to: "/contact" }} />
  </article>;
}
