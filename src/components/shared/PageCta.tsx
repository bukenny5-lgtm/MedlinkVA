import { Link } from "react-router-dom";
import { trackCtaClick } from "../../lib/analytics";

type Action = {
  label: string;
  to: string;
  variant?: "primary" | "secondary";
};

type PageCtaProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryAction: Action;
  secondaryAction?: Action;
  note?: string;
  onPrimaryClick?: () => void;
};

const actionClass = {
  primary: "btn-primary",
  secondary: "btn-secondary",
} as const;

export function PageCta({ eyebrow = "Next step", title, description, primaryAction, secondaryAction, note, onPrimaryClick }: PageCtaProps) {
  const isExternal = (to: string) => /^https?:\/\//i.test(to);
  const renderAction = (action: Action, location: string, click?: () => void) => {
    const className = actionClass[action.variant ?? "primary"];
    const onClick = () => { trackCtaClick(action.label, action.to, location); click?.(); };
    return isExternal(action.to) ? <a href={action.to} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>{action.label}</a> : <Link to={action.to} className={className} onClick={onClick}>{action.label}</Link>;
  };
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-card grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-10">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">{eyebrow}</p>
            <h2 className="heading-section">{title}</h2>
            <p className="max-w-2xl text-base leading-7 text-brand-charcoal/80">{description.replace(/\\n+/g, " ")}</p>
            {note ? <p className="text-sm leading-6 text-brand-charcoal/65">{note}</p> : null}
          </div>

          <div className="flex flex-col flex-wrap gap-3 sm:flex-row lg:justify-end">
            {renderAction(primaryAction, "page_cta", onPrimaryClick)}
            {secondaryAction ? (
              renderAction(secondaryAction, "page_cta")
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

