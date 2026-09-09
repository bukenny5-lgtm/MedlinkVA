import { Link } from "react-router-dom";

type Action = {
  label: string;
  to: string;
  variant?: "primary" | "secondary";
};

type PageCtaProps = {
  title: string;
  description: string;
  primaryAction: Action;
  secondaryAction?: Action;
  note?: string;
};

const actionClass = {
  primary: "btn-primary",
  secondary: "btn-secondary",
} as const;

export function PageCta({ title, description, primaryAction, secondaryAction, note }: PageCtaProps) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-card grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-10">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">Next step</p>
            <h2 className="heading-section">{title}</h2>
            <p className="max-w-2xl text-base leading-7 text-brand-charcoal/80">{description}</p>
            {note ? <p className="text-sm leading-6 text-brand-charcoal/65">{note}</p> : null}
          </div>

          <div className="flex flex-col flex-wrap gap-3 sm:flex-row lg:justify-end">
            <Link to={primaryAction.to} className={actionClass[primaryAction.variant ?? "primary"]}>
              {primaryAction.label}
            </Link>
            {secondaryAction ? (
              <Link to={secondaryAction.to} className={actionClass[secondaryAction.variant ?? "secondary"]}>
                {secondaryAction.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

