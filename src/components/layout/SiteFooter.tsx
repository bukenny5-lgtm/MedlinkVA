import { Link } from "react-router-dom";
import { siteContent } from "../../content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-border bg-brand-navy text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold tracking-[0.2em] text-brand-sky">MEDLINK VA</p>
          <p className="max-w-md text-sm leading-6 text-white/80">
            {siteContent.brandTagline}. This foundation is intentionally lean so the site can grow into a
            CMS-backed, conversion-focused public presence in later phases.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-white">Explore</p>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            {siteContent.navigation.slice(1).map((item) => (
              <Link key={item.path} to={item.path} className="transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-white">Contact</p>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            <Link className="transition-colors hover:text-white" to="/contact">
              Contact page
            </Link>
            <a className="transition-colors hover:text-white" href={`mailto:${siteContent.contactEmail}`}>
              {siteContent.contactEmail}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Medlink VA. Foundation phase.</p>
          <div className="flex flex-wrap gap-4">
            {siteContent.footerNavigation.map((item) => (
              <Link key={item.path} to={item.path} className="transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

