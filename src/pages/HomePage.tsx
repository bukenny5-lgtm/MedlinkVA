import { Link } from "react-router-dom";
import { ContentPage } from "../components/ui/ContentPage";
import { pageContent } from "../content/pages";
import { siteContent } from "../content/site";

export function HomePage() {
  return (
    <ContentPage page={pageContent.home}>
      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-sky">Route map</p>
            <h2 className="text-2xl font-semibold tracking-tight text-brand-navy">Current foundation pages</h2>
          </div>
          <Link to="/services" className="btn-secondary hidden sm:inline-flex">
            View Services
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {siteContent.routeSummaries.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className="surface-card group flex h-full flex-col gap-3 p-5 transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-brand-navy">{route.label}</h3>
                <span className="rounded-full bg-brand-sky/15 px-3 py-1 text-xs font-semibold text-brand-accent">
                  Live
                </span>
              </div>
              <p className="text-sm leading-6 text-brand-charcoal/80">{route.description}</p>
              <span className="mt-auto text-sm font-semibold text-brand-accent transition-colors group-hover:text-brand-navy">
                Open page
              </span>
            </Link>
          ))}
        </div>
      </section>
    </ContentPage>
  );
}

