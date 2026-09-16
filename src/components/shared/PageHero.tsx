import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { HomeSection } from "../home/HomeSection";
import { trackCtaClick } from "../../lib/analytics";

type HeroAction = {
  label: string;
  to: string;
  variant?: "primary" | "secondary";
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: readonly HeroAction[];
  chips?: readonly string[];
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  children?: ReactNode;
  className?: string;
};

const actionClass = {
  primary: "btn-primary",
  secondary: "btn-secondary",
} as const;

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  chips,
  image,
  children,
  className = "bg-white pb-14 pt-8 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-16",
}: PageHeroProps) {
  const hasMedia = Boolean(image);

  return (
    <HomeSection className={className}>
      <div className={`grid items-center gap-10 ${hasMedia ? "lg:grid-cols-[1.02fr_0.98fr]" : ""}`}>
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-accent">{eyebrow}</p>
            <h1 className="max-w-2xl heading-hero">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-brand-charcoal/80 sm:text-lg">{description}</p>
          </div>

          {actions?.length ? (
            <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
              {actions.map((action) => (
                <Link key={action.to} to={action.to} className={actionClass[action.variant ?? "secondary"]} onClick={() => trackCtaClick(action.label, action.to, "page_hero")}>
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}

          {chips?.length ? (
            <div className="flex flex-wrap gap-3">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-brand-border bg-brand-muted/70 px-4 py-2 text-sm font-medium text-brand-navy"
                >
                  {chip}
                </span>
              ))}
            </div>
          ) : null}

          {children}
        </div>

        {image ? (
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-brand-sky/10 blur-3xl" />
            <figure className="surface-card overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="aspect-[4/3] w-full lg:aspect-[4/5] object-cover object-center"
                width="1200"
                height="1500"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              {image.caption ? (
                <figcaption className="border-t border-brand-border bg-brand-muted/40 px-5 py-3 text-sm text-brand-charcoal/75">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          </div>
        ) : null}
      </div>
    </HomeSection>
  );
}
