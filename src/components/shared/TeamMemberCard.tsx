import type { TeamMember } from "../../content/team";

type TeamMemberCardProps = {
  member: TeamMember;
  showFeaturedLabel?: boolean;
};

export function TeamMemberCard({ member, showFeaturedLabel = false }: TeamMemberCardProps) {
  return (
    <article className="surface-card overflow-hidden transition-shadow duration-200 hover:shadow-lg">
      <img
        src={member.image}
        alt={member.alt}
        className="aspect-[4/5] w-full object-cover object-top"
        width="700"
        height="875"
        loading="lazy"
        decoding="async"
      />
      <div className="space-y-2 p-5">
        {showFeaturedLabel && member.featured ? <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-accent">Featured Leader</p> : null}
        <h3 className="text-lg font-semibold text-brand-navy">{member.name}</h3>
        <p className="text-sm font-medium text-brand-charcoal/80">{member.role}</p>
        {member.shortBio ? <p className="text-sm leading-6 text-brand-charcoal/70">{member.shortBio}</p> : null}
      </div>
    </article>
  );
}
