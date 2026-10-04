import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "../../lib/analytics";

const items = [
  ["Scheduling Support", "/services/administrative-front-desk"],
  ["Patient Communication", "/services/virtual-medical-reception"],
  ["Front Desk Coordination", "/services/administrative-front-desk"],
  ["Referral Follow-up", "/services/patient-care-coordination"],
  ["Insurance Administration", "/services/insurance-billing"],
  ["Workflow Support", "/services/ehr-workflow-ai-automation"],
  ["Documentation Support", "/services/ehr-workflow-ai-automation"],
  ["Remote Patient Monitoring", "/services/remote-patient-monitoring"],
  ["Administrative Follow-up", "/services/patient-care-coordination"],
  ["Practice Coordination", "/services/patient-care-coordination"],
] as const;

export function ServiceMarquee() {
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resumeTimer.current), []);

  function pauseBriefly() {
    window.clearTimeout(resumeTimer.current);
    setPaused(true);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 3500);
  }

  return (
    <section aria-label="Service areas" className="overflow-hidden border-y border-brand-border bg-brand-muted/60 py-4">
      <div className={`service-marquee-track ${paused ? "is-paused" : ""}`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={copy === 1}>
            {items.map(([label, to]) => (
              <Link
                key={`${copy}-${label}`}
                to={to}
                tabIndex={copy === 1 ? -1 : undefined}
                className="group inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-semibold text-brand-navy shadow-soft transition hover:-translate-y-0.5 hover:border-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                onPointerDown={pauseBriefly}
                onFocus={pauseBriefly}
                onClick={() => trackEvent("service_open", { service_type: to.replace("/services/", ""), destination: to })}
              >
                {label}<span className="text-brand-accent transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
