import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type EmptyStateProps = {
  title: string;
  description: string;
  bullets?: readonly string[];
  action?: {
    label: string;
    to: string;
    variant?: "primary" | "secondary";
  };
  badge?: string;
  footer?: ReactNode;
};

const actionClass = {
  primary: "btn-primary",
  secondary: "btn-secondary",
} as const;

export function EmptyState({ title, description, bullets, action, badge = "Coming soon", footer }: EmptyStateProps) {
  return (
    <div className="surface-card border-dashed p-6 sm:p-8">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-sky">{badge}</p>
        </div>
        <h3 className="text-xl font-semibold text-brand-navy">{title}</h3>
        <p className="max-w-3xl text-sm leading-7 text-brand-charcoal/80">{description}</p>
      </div>

      {bullets?.length ? (
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="rounded-2xl border border-brand-border bg-brand-muted/40 px-4 py-3 text-sm leading-6 text-brand-charcoal"
            >
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}

      {footer ? <div className="mt-6 text-sm leading-6 text-brand-charcoal/75">{footer}</div> : null}

      {action ? (
        <div className="mt-6">
          <Link to={action.to} className={actionClass[action.variant ?? "primary"]}>
            {action.label}
          </Link>
        </div>
      ) : null}
    </div>
  );
}

