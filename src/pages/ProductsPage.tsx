import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { PageHero } from "../components/shared/PageHero";
import { Link } from "react-router-dom";
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
  return (
    <article className="surface-card flex h-full flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1">
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
          <a href={product.externalUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">{product.ctaLabel || "View Product"}<span aria-hidden="true"> ↗</span></a>
          <p className="text-xs text-brand-charcoal/60">Checkout and payment handled by Selar.</p>
        </div>
      </div>
    </article>
  );
}

export function ProductsPage() {
  const cmsBundle = useCmsBundle();
  const content = resolveProductsContent(cmsBundle);
  const site = resolveResolvedSiteSettings(cmsBundle);
  const featured = content.records.filter((product) => product.featured).slice(0, 3);
  const featuredIds = new Set(featured.map((product) => product._id));
  const allProducts = content.records.filter((product) => !featuredIds.has(product._id));
  const storeUrl = site.externalProductStoreUrl || "https://selar.com/m/rachealopasola";

  return <article className="space-y-0">
    <Seo title="Templates, Guides & Training Resources | MedLink VA" description="Explore practical templates, guides, classes, and training resources for healthcare administration and Virtual Medical Assistant workflows." />
    <PageHero eyebrow={content.hero.eyebrow} title={content.hero.title} description={content.hero.description} actions={content.hero.actions} chips={["Templates & Tools", "Training & Learning", "Selar checkout"]} />
    {featured.length ? <HomeSection id="featured-products" className="bg-brand-background py-16 sm:py-20"><SectionHeading eyebrow="Start here" title="Featured products" description="A focused selection of practical tools and learning resources for healthcare administration workflows." /><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{featured.map((product) => <ProductCard key={product._id} product={product} />)}</div></HomeSection> : null}
    <HomeSection className="bg-white py-16 sm:py-20"><SectionHeading eyebrow="Catalogue" title="All products" description="Browse the full MedLink VA catalogue. Select a product to review details and continue to Selar for checkout." /><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{(allProducts.length ? allProducts : content.records).map((product) => <ProductCard key={product._id} product={product} />)}</div></HomeSection>
    <HomeSection className="bg-brand-background py-16 sm:py-20"><div className="surface-card grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:p-10"><div className="space-y-3"><p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">Explore the MedLink VA Store</p><h2 className="heading-section">More templates, training resources, and professional tools</h2><p className="max-w-2xl text-base leading-7 text-brand-charcoal/80">Browse additional MedLink VA templates, training resources, and professional tools on our Selar storefront.</p><p className="text-sm text-brand-charcoal/65">Checkout and payment are handled by Selar.</p></div><a href={storeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary justify-center">Visit Store <span aria-hidden="true">↗</span></a></div></HomeSection>
    <section className="bg-white py-16 sm:py-20"><div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-6 md:grid-cols-3"><div><h2 className="text-lg font-semibold text-brand-navy">Why these resources help</h2><p className="mt-2 text-sm leading-6 text-brand-charcoal/75">Clear templates can support more organized administrative routines.</p></div><div><h3 className="font-semibold text-brand-navy">Practical by design</h3><p className="mt-2 text-sm leading-6 text-brand-charcoal/75">Use the catalogue to find focused tools for recurring workflow needs.</p></div><div><h3 className="font-semibold text-brand-navy">Learn at your pace</h3><p className="mt-2 text-sm leading-6 text-brand-charcoal/75">Classes and guides offer structured ways to build relevant support skills.</p></div></div><div className="mt-10 rounded-2xl bg-brand-navy p-6 text-white sm:p-8"><h2 className="text-2xl font-semibold">Need help choosing a resource?</h2><p className="mt-2 max-w-2xl text-white/80">Contact MedLink VA with a question about the catalogue or your workflow needs.</p><Link to="/contact" className="btn-secondary mt-6">Contact MedLink VA</Link></div></div></section>
  </article>;
}
