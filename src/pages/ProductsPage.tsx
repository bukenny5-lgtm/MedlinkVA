import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { EmptyState } from "../components/shared/EmptyState";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { useCmsBundle } from "../lib/cms/SiteContentProvider";
import { resolveProductsContent, resolveResolvedSiteSettings } from "../lib/cms/siteContent";
import { sanityImageSrc } from "../lib/sanity/image";

export function ProductsPage() {
  const cmsBundle = useCmsBundle();
  const productsContent = resolveProductsContent(cmsBundle);
  const site = resolveResolvedSiteSettings(cmsBundle);
  const hasRecords = productsContent.records.length > 0;

  return (
    <article className="space-y-12">
      <Seo
        title="Products | Medlink VA"
        description={productsContent.hero.description}
      />

      <PageHero
        eyebrow={productsContent.hero.eyebrow}
        title={productsContent.hero.title}
        description={productsContent.hero.description}
        actions={productsContent.hero.actions}
      />

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Status"
          title={hasRecords ? "Featured products" : "Product updates"}
          description={
            hasRecords
              ? "Explore available products and follow a link for details."
              : "Check back for available products or contact us with a question."
          }
        />

        <div className="mt-8">
          {hasRecords ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {productsContent.records.map((product) => (
                <article key={product._id} className="surface-card overflow-hidden">
                  {product.image ? (
                    <img
                      src={sanityImageSrc(product.image, { width: 1200, height: 900 }) ?? ""}
                      alt={product.altText || product.name}
                      className="aspect-[4/3] w-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="900"
                    />
                  ) : null}
                  <div className="space-y-3 p-6">
                    <h3 className="text-2xl font-semibold text-brand-navy">{product.name}</h3>
                    <p className="text-sm leading-7 text-brand-charcoal/80">{product.shortDescription}</p>
                    {typeof product.price === "number" ? (
                      <p className="text-sm font-medium text-brand-navy">${product.price.toFixed(2)}</p>
                    ) : null}
                    <a
                      href={product.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex text-sm font-semibold text-brand-accent transition-colors hover:text-brand-navy"
                    >
                      {product.ctaLabel}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title={productsContent.emptyState.title}
              description={productsContent.emptyState.description}
              action={{ label: "Contact Medlink VA", to: "/contact" }}
              footer={site.externalProductStoreUrl ? `External product store: ${site.externalProductStoreUrl}` : productsContent.disclosure}
            />
          )}
        </div>
      </HomeSection>

      <PageCta
        title={productsContent.cta.title}
        description={productsContent.cta.description}
        primaryAction={productsContent.cta.primaryAction}
        secondaryAction={productsContent.cta.secondaryAction}
      />
    </article>
  );
}
