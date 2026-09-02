import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { EmptyState } from "../components/shared/EmptyState";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { InfoCard } from "../components/shared/InfoCard";
import { jobsContent } from "../content/jobs";

export function JobsPage() {
  return (
    <article className="space-y-12">
      <Seo
        title="Careers & Opportunities | Medlink VA"
        description="Explore the careers page for Medlink VA. It currently shows a polished empty state and a CMS-ready structure for future job listings."
      />

      <PageHero
        eyebrow={jobsContent.hero.eyebrow}
        title={jobsContent.hero.title}
        description={jobsContent.hero.description}
        actions={jobsContent.hero.actions}
      />

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Why this page exists"
          title="A responsible placeholder for future opportunities"
          description="The page is intentionally honest about the current vacancy status while still feeling polished and complete."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {jobsContent.whyWorkWithUs.map((item) => (
            <InfoCard key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </HomeSection>

      <HomeSection className="bg-white py-16 sm:py-20">
        <SectionHeading
          eyebrow="Open roles"
          title="Current opportunities are not published yet"
          description="When real records are added later, this area can expand into structured job cards without changing the route."
        />

        <div className="mt-8">
          <EmptyState
            title={jobsContent.emptyState.title}
            description={jobsContent.emptyState.description}
            bullets={[
              "Future listings can include title, location, employment type, closing date, and application link.",
              "The page will continue to show only approved openings.",
            ]}
            action={{ label: "Contact Medlink VA", to: "/contact" }}
            footer="This placeholder preserves the layout for future openings and keeps the site accurate."
          />
        </div>
      </HomeSection>

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Future listing shape"
          title="The job card template is already planned"
          description="These fields can later map cleanly into Sanity and remain easy to scan on mobile."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {jobsContent.futureFields.map((field) => (
            <InfoCard
              key={field}
              title={field}
              description="Planned field for future job records."
            />
          ))}
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

