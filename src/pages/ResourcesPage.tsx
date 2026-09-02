import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { EmptyState } from "../components/shared/EmptyState";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { InfoCard } from "../components/shared/InfoCard";
import { resourcesContent } from "../content/resources";

export function ResourcesPage() {
  return (
    <article className="space-y-12">
      <Seo
        title="Healthcare VA Resources | Medlink VA"
        description="Explore the resources landing page for Medlink VA. It is structured for future articles, SEO growth, and educational content without publishing fictional posts."
      />

      <PageHero
        eyebrow={resourcesContent.hero.eyebrow}
        title={resourcesContent.hero.title}
        description={resourcesContent.hero.description}
        actions={resourcesContent.hero.actions}
      />

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Categories"
          title="Topic areas that can support future SEO content"
          description="The category list mirrors the kinds of topics the brand may publish later in Sanity."
        />

        <div className="mt-8 flex flex-wrap gap-3">
          {resourcesContent.categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-medium text-brand-navy shadow-soft"
            >
              {category}
            </span>
          ))}
        </div>
      </HomeSection>

      <HomeSection className="bg-white py-16 sm:py-20">
        <SectionHeading
          eyebrow="Status"
          title="No articles are published yet"
          description="The page remains accurate while still giving future posts room to slot in without a redesign."
        />

        <div className="mt-8">
          <EmptyState
            title={resourcesContent.emptyState.title}
            description={resourcesContent.emptyState.description}
            bullets={[
              "Future article detail pages can be introduced later if the content volume justifies them.",
              "The page is ready to support topic clusters and internal linking.",
            ]}
            action={{ label: "Explore Services", to: "/services" }}
            footer={resourcesContent.editorialNote}
          />
        </div>
      </HomeSection>

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Future post shape"
          title="The resource schema is already mapped out"
          description="These fields can later become a Sanity blog post model without changing the layout."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {resourcesContent.futurePostFields.map((field) => (
            <InfoCard key={field} title={field} description="Planned field for future resource posts." />
          ))}
        </div>
      </HomeSection>

      <PageCta
        title="Need help with a topic before articles exist?"
        description="Use the consultation page or services page while the editorial library is still being built."
        primaryAction={{ label: "Book a Consultation", to: "/book-consultation" }}
        secondaryAction={{ label: "Contact Medlink VA", to: "/contact" }}
      />
    </article>
  );
}

