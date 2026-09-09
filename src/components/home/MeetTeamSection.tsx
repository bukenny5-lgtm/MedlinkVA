import { Link } from "react-router-dom";
import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { TeamMemberCard } from "../shared/TeamMemberCard";
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

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {sortedTeamMembers.map((member) => (
          <TeamMemberCard key={member.name} member={member} showFeaturedLabel />
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
