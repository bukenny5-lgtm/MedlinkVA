import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { EmptyState } from "../components/shared/EmptyState";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { InfoCard } from "../components/shared/InfoCard";
import { useCmsBundle } from "../lib/cms/SiteContentProvider";
import { resolveClassesContent } from "../lib/cms/siteContent";
import { sanityImageSrc } from "../lib/sanity/image";

export function ClassesPage() {
  const classesContent = resolveClassesContent(useCmsBundle());
  const hasRecords = classesContent.records.length > 0;

  return (
    <article className="space-y-12">
      <Seo
        title="Classes & Training | Medlink VA"
        description="Review the classes and training page for Medlink VA. It is ready for future educational content, but it does not invent dates, pricing, or instructors."
      />

      <PageHero
        eyebrow={classesContent.hero.eyebrow}
        title={classesContent.hero.title}
        description={classesContent.hero.description}
        actions={classesContent.hero.actions}
      />

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Learning focus"
          title="A training page that can grow with future content"
          description="The copy stays descriptive and careful, leaving room for real class records later."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {classesContent.introduction.map((item) => (
            <InfoCard key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </HomeSection>

      <HomeSection className="bg-white py-16 sm:py-20">
        <SectionHeading
          eyebrow="Class status"
          title={hasRecords ? "Scheduled classes" : "No classes are scheduled right now"}
          description={
            hasRecords
              ? "Published class records from Sanity appear below."
              : "When approved training content exists, this section can switch from an empty state to structured cards."
          }
        />

        <div className="mt-8">
          {hasRecords ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {classesContent.records.map((item) => (
                <article key={item._id} className="surface-card overflow-hidden">
                  {item.image ? (
                    <img
                      src={sanityImageSrc(item.image, { width: 1200, height: 900 }) ?? ""}
                      alt={item.altText || item.title}
                      className="aspect-[4/3] w-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="900"
                    />
                  ) : null}
                  <div className="space-y-3 p-6">
                    <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-sky">
                      <span>{item.status}</span>
                      {item.instructor ? <span>{item.instructor}</span> : null}
                      {item.date ? <span>{item.date}</span> : null}
                    </div>
                    <h3 className="text-2xl font-semibold text-brand-navy">{item.title}</h3>
                    <p className="text-sm leading-7 text-brand-charcoal/80">{item.shortDescription}</p>
                    <div className="flex flex-wrap items-center gap-4">
                      {item.duration ? <p className="text-sm text-brand-charcoal/70">Duration: {item.duration}</p> : null}
                      {typeof item.price === "number" ? (
                        <p className="text-sm text-brand-charcoal/70">Price: ${item.price.toFixed(2)}</p>
                      ) : null}
                      {item.registrationUrl ? (
                        <a
                          href={item.registrationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex text-sm font-semibold text-brand-accent transition-colors hover:text-brand-navy"
                        >
                          Register now
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title={classesContent.emptyState.title}
              description={classesContent.emptyState.description}
              bullets={[
                "Future class cards can show title, instructor, date, duration, price, registration link, and status.",
                "The layout is already set up for future training announcements.",
              ]}
              action={{ label: "Stay in Touch", to: "/contact" }}
              footer="This page remains a polished placeholder until real classes are approved."
            />
          )}
        </div>
      </HomeSection>

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Future class shape"
          title="Planned fields for upcoming training cards"
          description="These labels can later map directly to Sanity and remain easy to scan on a phone."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {classesContent.futureFields.map((field) => (
            <InfoCard key={field} title={field} description="Planned field for future class records." />
          ))}
        </div>
      </HomeSection>

      <PageCta
        title={classesContent.stayInTouch.title}
        description={classesContent.stayInTouch.description}
        primaryAction={classesContent.stayInTouch.primaryAction}
        secondaryAction={classesContent.stayInTouch.secondaryAction}
      />
    </article>
  );
}
