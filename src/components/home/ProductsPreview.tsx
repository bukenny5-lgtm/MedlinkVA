import { Link } from "react-router-dom";
import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { resolveProductsContent } from "../../lib/cms/siteContent";
import { sanityImageSrc } from "../../lib/sanity/image";

export function ProductsPreview() {
  const products = resolveProductsContent(useCmsBundle()).records;
  const featured = (products.filter((product) => product.featured).length ? products.filter((product) => product.featured) : products).slice(0, 3);
  return <HomeSection className="bg-white py-16 sm:py-20">
    <SectionHeading eyebrow="Products & learning" title="Practical tools for healthcare workflows" description="Explore templates, checklists, classes, and guides for Virtual Medical Assistant training and healthcare administration." />
    <div className="mt-8 grid gap-5 md:grid-cols-3">{featured.map((product) => {
      const image = typeof product.image === "string" ? product.image : sanityImageSrc(product.image, { width: 600 });
      return <article key={product._id} className="surface-card overflow-hidden">
        <div className="flex h-44 items-center justify-center bg-brand-muted/40 p-3"><>{image ? <img src={image} alt={product.altText || `MedLink VA ${product.name} cover`} className="h-full w-full object-contain" loading="lazy" decoding="async" /> : null}</></div>
        <div className="p-5"><p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">{product.category ?? "Resource"}</p><h3 className="mt-2 text-lg font-semibold text-brand-navy">{product.name}</h3><p className="mt-2 text-sm leading-6 text-brand-charcoal/75">{product.shortDescription}</p></div>
      </article>;
    })}</div>
    <div className="mt-8"><Link to="/products" className="btn-primary">Explore Products</Link></div>
  </HomeSection>;
}
