import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { HomeSection } from "../home/HomeSection";
import { trackCtaClick } from "../../lib/analytics";

type HeroAction = {
  label: string;
  to: string;
  variant?: "primary" | "secondary";
};

type HeroChip = string | { label: string; to: string };

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: readonly HeroAction[];
  chips?: readonly HeroChip[];
  image?: {
    src: string;
    alt: string;
    objectPosition?: string;
    caption?: string;
  };
  mediaVariant?: "default" | "article" | "audience";
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
  mediaVariant = "default",
  children,
  className = "bg-white pb-14 pt-8 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-16",
}: PageHeroProps) {
  const hasMedia = Boolean(image);

  return (
    <HomeSection className={className}>
      <div className={`mx-auto grid w-full items-center gap-10 ${hasMedia ? (mediaVariant === "article" ? "lg:grid-cols-[1.2fr_0.8fr]" : mediaVariant === "audience" ? "max-w-[1180px] lg:grid-cols-[1.15fr_0.85fr]" : "lg:grid-cols-[1.02fr_0.98fr]") : ""}`}>
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-accent">{eyebrow}</p>
            <h1 className={`max-w-2xl ${mediaVariant === "audience" ? "heading-audience" : "heading-hero"}`}>
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-brand-charcoal/80 sm:text-lg">{description.replace(/\\n+/g, " ")}</p>
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
              {chips.map((chip) => typeof chip === "string" ? (
                <span key={chip} className="rounded-full border border-brand-border bg-brand-muted/70 px-4 py-2 text-sm font-medium text-brand-navy">{chip}</span>
              ) : (
                <Link key={chip.to} to={chip.to} className="group inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-muted/70 px-4 py-2 text-sm font-medium text-brand-navy transition hover:-translate-y-0.5 hover:border-brand-accent hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">
                  {chip.label}<span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          ) : null}

          {children}
        </div>

        {image ? (
          <div className={`relative ${mediaVariant === "article" ? "lg:justify-self-end lg:w-full lg:max-w-[480px]" : mediaVariant === "audience" ? "lg:justify-self-end lg:w-full lg:max-w-[500px]" : ""}`}>
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-brand-sky/10 blur-3xl" />
            <figure className="surface-card overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className={mediaVariant === "article" ? "aspect-video max-h-[260px] w-full object-cover object-center sm:max-h-none" : mediaVariant === "audience" ? "aspect-[4/3] max-h-[320px] w-full object-cover md:max-h-[400px] lg:max-h-[460px]" : "aspect-[4/3] w-full object-cover object-center lg:aspect-[4/5]"}
                style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
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
