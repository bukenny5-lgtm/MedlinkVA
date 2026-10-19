import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { Link } from "react-router-dom";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { resolveHomeContent } from "../../lib/cms/homeContent";
import { trackEvent } from "../../lib/analytics";

export function ServicesOverview() {
  const { services } = resolveHomeContent(useCmsBundle());

  return (
    <HomeSection className="bg-white py-16 sm:py-20">
      <SectionHeading
        eyebrow="Services Overview"
        title="Support That Moves Your Practice Forward"
        description="From first patient contact through follow-up, MedLink VA helps healthcare practices keep everyday administrative work organized and moving."
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const serviceId = service.title === "Administrative & Front Desk Support" ? "administrative-front-desk" : service.title === "Virtual Medical Reception" ? "virtual-medical-reception" : service.title === "Patient Care & Coordination Support" ? "patient-care-coordination" : service.title === "Insurance & Billing Support" ? "insurance-billing" : service.title === "EHR / Practice Workflow Support Through AI Automation" ? "ehr-workflow-ai-automation" : "remote-patient-monitoring";
          return <Link key={service.title} to={`/services/${serviceId}`} className="surface-card group p-5 transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent motion-reduce:transform-none" onClick={() => trackEvent("service_open", { service_type: serviceId, destination: `/services/${serviceId}` })}>
            <h3 className="font-semibold text-brand-navy group-hover:underline">{service.title}</h3>
            <span className="mt-3 inline-flex text-sm font-semibold text-brand-accent transition-transform group-hover:translate-x-1">View service →</span>
          </Link>;
        })}
      </div>
    </HomeSection>
  );
}
