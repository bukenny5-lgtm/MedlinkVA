import { useEffect, useId, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { clientAssets } from "../../lib/assets";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { resolveResolvedSiteSettings } from "../../lib/cms/siteContent";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "inline-flex min-h-11 items-center rounded-xl px-2 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2",
    isActive ? "bg-brand-sky/15 text-brand-navy" : "text-brand-charcoal hover:bg-brand-muted hover:text-brand-navy",
  ].join(" ");

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const panelId = useId();
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const location = useLocation();
  const site = resolveResolvedSiteSettings(useCmsBundle());

  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!isMenuOpen) {
      if (dialog.open) dialog.close();
      return;
    }

    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => { if (desktop.matches) setIsMenuOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    closeOnDesktop();
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
      if (dialog.open) dialog.close();
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-brand-border/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3 rounded-2xl" aria-label="MedLink VA home">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-border bg-brand-muted/70 p-1">
              <img src={clientAssets.logo} alt="" className="h-full w-full object-contain" loading="eager" decoding="async" width="640" height="640" />
            </span>
            <span className="flex min-w-0 max-w-[16rem] flex-col leading-tight">
              <span className="text-sm font-bold tracking-[0.18em] text-brand-navy sm:text-base">MEDLINK VA</span>
              <span className="mt-1 text-xs font-medium leading-snug text-brand-charcoal sm:text-[0.8125rem]">{site.brandTagline}</span>
            </span>
          </Link>
          <nav className="hidden shrink-0 items-center gap-1 xl:flex" aria-label="Primary navigation">
            {site.navigation.map((item) => (
              <NavLink key={item.path} to={item.path} className={navLinkClass}>{item.label}</NavLink>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Link to="/book-consultation" className="btn-primary hidden md:inline-flex">{site.primaryCtaLabel}</Link>
            <button type="button" className="btn-secondary px-4 xl:hidden" onClick={() => setIsMenuOpen(true)} aria-expanded={isMenuOpen} aria-controls={panelId} aria-haspopup="dialog">Menu</button>
          </div>
        </div>
      </header>
      <dialog
        ref={dialogRef}
        id={panelId}
        aria-labelledby={titleId}
        className="mobile-drawer"
        onCancel={(event) => { event.preventDefault(); setIsMenuOpen(false); }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setIsMenuOpen(false);
          }
        }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-brand-border p-4">
          <h2 id={titleId} className="text-lg font-bold text-brand-navy">Explore MedLink VA</h2>
          <button type="button" autoFocus className="btn-secondary px-4" onClick={() => setIsMenuOpen(false)}>Close</button>
        </div>
        <div className="space-y-6 p-4">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {site.navigation.map((item) => (
              <NavLink key={item.path} to={item.path} className={navLinkClass} onClick={() => setIsMenuOpen(false)}>{item.label}</NavLink>
            ))}
          </nav>
          <Link to="/book-consultation" className="btn-primary w-full" onClick={() => setIsMenuOpen(false)}>{site.primaryCtaLabel}</Link>
          <div className="flex flex-col border-t border-brand-border pt-3 text-sm font-medium text-brand-accent">
            <a href={"mailto:" + site.contactEmail} className="inline-flex min-h-11 items-center break-all">{site.contactEmail}</a>
            {site.phone ? <a href={"tel:" + site.phone.replace(/[^+\d]/g, "")} className="inline-flex min-h-11 items-center">{site.phone}</a> : null}
          </div>
        </div>
      </dialog>
    </>
  );
}
