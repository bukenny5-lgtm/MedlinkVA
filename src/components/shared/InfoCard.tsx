import type { ReactNode } from "react";

type InfoCardProps = {
  eyebrow?: string;
  title: string;
  description: string;
  bullets?: readonly string[];
  footer?: ReactNode;
  className?: string;
};

export function InfoCard({ eyebrow, title, description, bullets, footer, className = "" }: InfoCardProps) {
  return (
    <article className={`surface-card flex h-full flex-col p-6 ${className}`}>
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sky">{eyebrow}</p> : null}
      <h3 className="mt-2 text-xl font-semibold text-brand-navy">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-brand-charcoal/80">{description}</p>

      {bullets?.length ? (
        <ul className="mt-5 space-y-2 text-sm leading-6 text-brand-charcoal/75">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-sky" aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {footer ? <div className="mt-5 text-sm leading-6 text-brand-charcoal/70">{footer}</div> : null}
    </article>
  );
}

