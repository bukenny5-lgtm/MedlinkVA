import { Link } from "react-router-dom";
import { HomeSection } from "./HomeSection";
import { homeContent } from "../../content/home";

export function HeroSection() {
  const { hero } = homeContent;

  return (
    <HomeSection className="bg-white pb-14 pt-8 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-sky">{hero.eyebrow}</p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-brand-charcoal/80 sm:text-lg">
              {hero.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to={hero.primaryCta.to} className="btn-primary">
              {hero.primaryCta.label}
            </Link>
            <Link to={hero.secondaryCta.to} className="btn-secondary">
              {hero.secondaryCta.label}
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            {hero.supportLine.map((item) => (
              <span
                key={item}
                className="rounded-full border border-brand-border bg-brand-muted/70 px-4 py-2 text-sm font-medium text-brand-navy"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-brand-sky/10 blur-3xl" />
          <figure className="surface-card overflow-hidden">
            <img
              src={hero.image}
              alt={hero.imageAlt}
              className="aspect-[4/5] w-full object-cover object-center"
              width="1200"
              height="1500"
              loading="eager"
              fetchPriority="high"
            />
          </figure>
        </div>
      </div>
    </HomeSection>
  );
}

