import { useEffect, useId, useRef, useState, type ReactNode } from "react";

type ResponsiveDisclosureProps = { id?: string; title: string; children: ReactNode };

// Keep longer service details and FAQs scannable on phones and tablets.
export function ResponsiveDisclosure({ id, title, children }: ResponsiveDisclosureProps) {
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [desktop, setDesktop] = useState(() => window.matchMedia("(min-width: 1024px)").matches);
  const isOpen = desktop || expanded;

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      if (!media.matches && panelRef.current?.contains(document.activeElement)) setExpanded(true);
      setDesktop(media.matches);
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <article id={id} className="surface-card scroll-mt-28 p-5 sm:p-6">
      <h3 className="text-xl font-semibold text-brand-navy">
        <span className="hidden lg:block">{title}</span>
        <button type="button" className="flex min-h-11 w-full items-center justify-between gap-4 text-left lg:hidden" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setExpanded((current) => !current)}>
          {title}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={"h-5 w-5 shrink-0 transition-transform duration-200 " + (isOpen ? "rotate-180" : "")} aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </h3>
      <div ref={panelRef} id={panelId} hidden={!isOpen} className="disclosure-content mt-3 space-y-4 text-sm leading-7 text-brand-charcoal/80">{children}</div>
    </article>
  );
}
