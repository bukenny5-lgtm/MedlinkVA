import { Link } from "react-router-dom";
import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { resolveHomeContent } from "../../lib/cms/siteContent";

export function MeetTeamSection() {
  const { teamPreview, teamMembers } = resolveHomeContent(useCmsBundle());
  const sortedTeamMembers = [...teamMembers].sort((left, right) => left.displayOrder - right.displayOrder);

  return (
    <HomeSection className="bg-brand-sky/10 py-16 sm:py-20">
      <SectionHeading
        eyebrow={teamPreview.eyebrow}
        title={teamPreview.title}
        description={teamPreview.description}
      />

      <div className="mt-8 grid gap-5 xl:grid-cols-4">
        {sortedTeamMembers.map((member) => (
          <article
            key={member.name}
            className={[
              "surface-card overflow-hidden",
              member.featured ? "xl:col-span-2" : "",
            ].join(" ")}
          >
            <div className={member.featured ? "grid h-full gap-0 lg:grid-cols-[0.9fr_1.1fr]" : "h-full"}>
              <figure className={member.featured ? "h-full" : ""}>
                <img
                  src={member.image}
                  alt={member.alt}
                  className={[
                    "w-full object-cover object-center",
                    member.featured ? "h-full min-h-[320px] lg:min-h-[440px]" : "aspect-[4/5]",
                  ].join(" ")}
                  width="1200"
                  height={member.featured ? "1400" : "1500"}
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              <div className="flex h-full flex-col justify-between p-5">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-sky">
                    {member.featured ? "Featured Leader" : "Team Member"}
                  </p>
                  <h3 className="text-xl font-semibold text-brand-navy">{member.name}</h3>
                  <p className="text-sm font-medium text-brand-charcoal/80">{member.role}</p>
                  {member.shortBio ? (
                    <p className="text-sm leading-7 text-brand-charcoal/80">{member.shortBio}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Link to="/about" className="btn-secondary">
          {teamPreview.cta.label}
        </Link>
      </div>
    </HomeSection>
  );
}
