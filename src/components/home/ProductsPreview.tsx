import { Link } from "react-router-dom";
import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { resolveProductsContent } from "../../lib/cms/productsContent";
import { sanityImageSrc } from "../../lib/sanity/image";
import { trackEvent } from "../../lib/analytics";

export function ProductsPreview() {
  const products = resolveProductsContent(useCmsBundle()).records;
  const featured = (products.filter((product) => product.featured).length ? products.filter((product) => product.featured) : products).slice(0, 1);
  return <HomeSection className="bg-white py-16 sm:py-20">
    <SectionHeading eyebrow="Products" title="Useful tools for learning and work" description="Discover a featured MedLink VA resource below and explore the full product collection for additional tools and learning materials." />
    <div className="mx-auto mt-8 max-w-5xl">{featured.map((product) => {
      const image = typeof product.image === "string" ? product.image : sanityImageSrc(product.image, { width: 600 });
      return <Link key={product._id} to="/products#products" onClick={() => trackEvent("product_open", { product_slug: product.slug?.current ?? product.name, destination: "/products#products" })} className="surface-card group grid overflow-hidden transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent md:grid-cols-[0.9fr_1.1fr]">
        <div className="flex min-h-64 items-center justify-center bg-brand-muted/40 p-6 sm:min-h-72"><>{image ? <img src={image} alt={product.altText || `MedLink VA ${product.name} cover`} className="h-full max-h-72 w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy" decoding="async" /> : null}</></div>
        <div className="flex flex-col justify-center p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">{product.category ?? "Resource"}</p><h3 className="mt-2 text-2xl font-semibold text-brand-navy group-hover:underline">{product.name}</h3><p className="mt-3 text-sm leading-7 text-brand-charcoal/75">{product.shortDescription}</p><span className="mt-6 inline-flex font-semibold text-brand-accent">View Product <span aria-hidden="true" className="ml-1 transition-transform group-hover:translate-x-1">→</span></span></div>
      </Link>;
    })}</div>
    <div className="mt-8"><Link to="/products" className="btn-primary">Explore Products</Link></div>
  </HomeSection>;
}
