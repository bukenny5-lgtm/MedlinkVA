import { useEffect, useId, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { clientAssets } from "../../lib/assets";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { resolveResolvedSiteSettings } from "../../lib/cms/siteContent";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2",
    isActive ? "bg-brand-sky/15 text-brand-navy" : "text-brand-charcoal hover:bg-brand-muted hover:text-brand-navy",
  ].join(" ");

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const panelId = useId();
  const location = useLocation();
  const site = resolveResolvedSiteSettings(useCmsBundle());

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-border/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          aria-label="Medlink VA home"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-border bg-brand-muted/70 p-1 shadow-soft">
            <img
              src={clientAssets.logo}
              alt="Medlink VA logo"
              className="h-full w-full object-contain"
              loading="eager"
              decoding="async"
              width="640"
              height="640"
            />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold tracking-[0.2em] text-brand-sky">MEDLINK VA</span>
            <span className="text-xs text-brand-charcoal/70">{site.brandTagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {site.navigation.map((item) => (
            <NavLink key={item.path} to={item.path} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/book-consultation"
            className="btn-primary hidden whitespace-nowrap md:inline-flex"
          >
            {site.primaryCtaLabel}
          </Link>

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-full border border-brand-border bg-white px-4 text-sm font-semibold text-brand-navy shadow-soft transition-colors hover:bg-brand-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 lg:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-controls={panelId}
          >
            Menu
          </button>
        </div>
      </div>

      <div
        id={panelId}
        className={[
          "border-t border-brand-border/70 bg-white lg:hidden",
          isMenuOpen ? "block" : "hidden",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
            {site.navigation.map((item) => (
              <NavLink key={item.path} to={item.path} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <Link
            to="/book-consultation"
            className="btn-primary w-full justify-center"
          >
            {site.primaryCtaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}

