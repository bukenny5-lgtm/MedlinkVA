import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { EmptyState } from "../components/shared/EmptyState";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { siteContent } from "../content/site";
import { useCmsBundle } from "../lib/cms/SiteContentProvider";
import { resolveJobsContent } from "../lib/cms/siteContent";

export function JobsPage() {
  const jobsContent = resolveJobsContent(useCmsBundle());
  const hasRecords = !siteContent.jobsPaused && jobsContent.records.length > 0;

  return (
    <article className="space-y-12">
      <Seo
        title="Careers & Opportunities | Medlink VA"
        description="There are no current openings at MedLink VA. Explore training or contact us with questions about future opportunities."
      />

      <PageHero
        eyebrow={jobsContent.hero.eyebrow}
        title={jobsContent.hero.title}
        description={jobsContent.hero.description}
        actions={jobsContent.hero.actions}
      />

      <HomeSection className="bg-white py-16 sm:py-20">
        <SectionHeading
          eyebrow="Careers"
          title={hasRecords ? "Current opportunities" : "Future opportunities"}
          description={
            hasRecords
              ? "Explore available roles and application details."
              : "Please check back for opportunities as they become available."
          }
        />

        <div className="mt-8">
          {hasRecords ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {jobsContent.records.map((job) => (
                <article key={job._id} className="surface-card flex h-full flex-col p-6">
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                    <span>{job.status}</span>
                    <span>{job.location}</span>
                    <span>{job.employmentType}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-brand-navy">{job.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-brand-charcoal/80">{job.shortDescription}</p>
                  {job.requirements?.length ? (
                    <ul className="mt-5 space-y-2 text-sm leading-6 text-brand-charcoal/80">
                      {job.requirements.slice(0, 3).map((requirement) => (
                        <li key={requirement} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-accent" aria-hidden="true" />
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    {job.closingDate ? (
                      <p className="text-sm text-brand-charcoal/70">
                        Closing date:{" "}
                        <span className="font-medium text-brand-navy">
                          {new Date(job.closingDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </p>
                    ) : null}
                    {job.applicationUrl ? (
                      <a
                        href={job.applicationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex text-sm font-semibold text-brand-accent transition-colors hover:text-brand-navy"
                      >
                        Apply now
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title={jobsContent.emptyState.title}
              description={jobsContent.emptyState.description}
              badge="No current openings"
              action={{ label: "Contact Medlink VA", to: "/contact" }}
            />
          )}
        </div>
      </HomeSection>

      <PageCta
        title={jobsContent.interestCta.title}
        description={jobsContent.interestCta.description}
        primaryAction={jobsContent.interestCta.primaryAction}
        secondaryAction={jobsContent.interestCta.secondaryAction}
      />
    </article>
  );
}
