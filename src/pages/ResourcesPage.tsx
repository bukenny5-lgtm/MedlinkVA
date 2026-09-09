import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { EmptyState } from "../components/shared/EmptyState";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { useCmsBundle } from "../lib/cms/SiteContentProvider";
import { resolveResourcesContent } from "../lib/cms/siteContent";
import { sanityImageSrc } from "../lib/sanity/image";

export function ResourcesPage() {
  const resourcesContent = resolveResourcesContent(useCmsBundle());
  const hasRecords = resourcesContent.records.length > 0;

  return (
    <article className="space-y-12">
      <Seo
        title="Healthcare VA Resources | Medlink VA"
        description="Explore healthcare administration, virtual support, and training resource updates from MedLink VA."
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
          title={hasRecords ? "Published resource categories" : "Topics to explore"}
          description={
            hasRecords
              ? "Explore the topics covered in our articles."
              : "Look out for practical guidance across these areas."
          }
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
          title={hasRecords ? "Published articles" : "No articles are published yet"}
          description={
            hasRecords
              ? "Browse the latest articles and insights."
              : "Check back for new resources or get in touch with your questions."
          }
        />

        <div className="mt-8">
          {hasRecords ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {resourcesContent.records.map((post) => (
                <article key={post._id} className="surface-card overflow-hidden">
                  {post.coverImage ? (
                    <img
                      src={sanityImageSrc(post.coverImage, { width: 1200, height: 800 }) ?? ""}
                      alt={post.coverImageAlt || post.title}
                      className="aspect-[3/2] w-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="800"
                    />
                  ) : null}
                  <div className="space-y-3 p-6">
                    <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                      <span>{post.category}</span>
                      {post.author ? <span>{post.author}</span> : null}
                      <span>{new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-brand-navy">{post.title}</h3>
                    <p className="text-sm leading-7 text-brand-charcoal/80">{post.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title={resourcesContent.emptyState.title}
              description={resourcesContent.emptyState.description}
              action={{ label: "Explore Services", to: "/services" }}
              footer={resourcesContent.editorialNote}
            />
          )}
        </div>
      </HomeSection>

      <PageCta
        title="Have a question about training or support?"
        description="Tell us what you would like to learn or discuss the administrative needs of your practice."
        primaryAction={{ label: "Book a Consultation", to: "/book-consultation" }}
        secondaryAction={{ label: "Contact Medlink VA", to: "/contact" }}
      />
    </article>
  );
}
