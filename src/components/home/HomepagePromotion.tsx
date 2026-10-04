import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { eligibleForHomepage, eventImage, resolveEvents } from "../../lib/events";
import { trackEvent } from "../../lib/analytics";

const dismissalKey = "medlink-va-promotion-dismissed";

export function HomepagePromotion() {
  const promotion = resolveEvents(useCmsBundle()?.events).filter((event) => eligibleForHomepage(event)).sort((a, b) => Number(b.featured) - Number(a.featured) || a.displayOrder - b.displayOrder || a.startDateTime.localeCompare(b.startDateTime))[0];
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  useEffect(() => { if (!promotion || sessionStorage.getItem(dismissalKey) === promotion.id) return; const timer = window.setTimeout(() => { previousFocus.current = document.activeElement as HTMLElement; setOpen(true); trackEvent("promotion_view", { promotion_id: promotion.id, destination_type: "internal" }); }, 1400); return () => window.clearTimeout(timer); }, [promotion]);
  useEffect(() => { if (!open) return; closeButtonRef.current?.focus(); const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") { event.preventDefault(); close(); return; } if (event.key !== "Tab" || !dialogRef.current) return; const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')); if (!focusable.length) return; const first = focusable[0], last = focusable[focusable.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } }; document.addEventListener("keydown", handleKeyDown); return () => document.removeEventListener("keydown", handleKeyDown); }, [open]);
  function close() { if (!promotion) return; sessionStorage.setItem(dismissalKey, promotion.id); setOpen(false); trackEvent("promotion_dismiss", { promotion_id: promotion.id, destination_type: "internal" }); window.setTimeout(() => previousFocus.current?.focus(), 0); }
  if (!open || !promotion) return null;
  const image = eventImage(promotion, 900);
  return <div className="fixed inset-0 z-40 flex items-end justify-center bg-brand-navy/35 p-4 sm:items-center" role="presentation"><div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="homepage-promotion-title" aria-describedby="homepage-promotion-description" className="relative max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-[1.5rem] border border-brand-border bg-white p-6 shadow-2xl sm:p-8">{image ? <img src={image} alt={`${promotion.title} cover`} className="mb-6 aspect-video w-full rounded-xl object-cover" loading="lazy" /> : null}<button ref={closeButtonRef} type="button" onClick={close} aria-label="Close event promotion" className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-2xl text-brand-charcoal/65 hover:bg-brand-muted hover:text-brand-navy">×</button><p className="pr-10 text-sm font-semibold uppercase tracking-[0.22em] text-brand-accent">Featured event</p><h2 id="homepage-promotion-title" className="mt-3 pr-10 text-3xl font-semibold text-brand-navy">{promotion.title}</h2><p id="homepage-promotion-description" className="mt-4 text-base leading-7 text-brand-charcoal/80">{promotion.shortDescription}</p><div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"><Link to={promotion.path} onClick={() => { trackEvent("promotion_click", { promotion_id: promotion.id, destination_type: "internal" }); close(); }} className="btn-primary">View Event</Link><button type="button" onClick={close} className="btn-secondary">Not now</button></div></div></div>;
}
