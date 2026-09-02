import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { EmptyState } from "../components/shared/EmptyState";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { InfoCard } from "../components/shared/InfoCard";
import { classesContent } from "../content/classes";

export function ClassesPage() {
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
          title="No classes are scheduled right now"
          description="When approved training content exists, this section can switch from an empty state to structured cards."
        />

        <div className="mt-8">
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

