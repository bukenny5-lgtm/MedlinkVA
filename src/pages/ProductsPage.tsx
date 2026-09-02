import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { EmptyState } from "../components/shared/EmptyState";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { InfoCard } from "../components/shared/InfoCard";
import { productsContent } from "../content/products";

export function ProductsPage() {
  return (
    <article className="space-y-12">
      <Seo
        title="Products | Medlink VA"
        description="Explore the products landing page for Medlink VA. It is prepared for future externally sold products and links without inventing a store or product catalog."
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
          title="No products are configured yet"
          description="The layout remains content-ready and can be connected to an approved external sales link later."
        />

        <div className="mt-8">
          <EmptyState
            title={productsContent.emptyState.title}
            description={productsContent.emptyState.description}
            bullets={[
              "Future product cards can include an image, optional price, and external CTA label.",
              "External links should open safely and clearly disclose that they go off-site.",
            ]}
            action={{ label: "Contact Medlink VA", to: "/contact" }}
            footer={productsContent.disclosure}
          />
        </div>
      </HomeSection>

      <HomeSection className="bg-white py-16 sm:py-20">
        <SectionHeading
          eyebrow="Future product shape"
          title="The product card template is ready"
          description="This keeps the page CMS-ready without inventing products or prices."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {productsContent.futureFields.map((field) => (
            <InfoCard key={field} title={field} description="Planned field for future product entries." />
          ))}
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

