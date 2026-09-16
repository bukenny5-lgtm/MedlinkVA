import { Link } from "react-router-dom";
import { siteContent } from "../../content/site";
import { clientAssets } from "../../lib/assets";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { resolveResolvedSiteSettings } from "../../lib/cms/siteContent";

export function SiteFooter() {
  const site = resolveResolvedSiteSettings(useCmsBundle());

  return (
    <footer className="border-t border-brand-border bg-brand-navy text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.9fr_1fr] lg:gap-6 lg:px-8 lg:py-8">
        <div className="space-y-4">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/95 p-1 shadow-soft">
              <img
                src={clientAssets.logo}
                alt="Medlink VA logo"
                className="h-full w-full object-contain"
                loading="lazy"
                decoding="async"
                width="640"
                height="640"
              />
            </span>
            <span className="text-sm font-semibold tracking-[0.2em] text-brand-sky">MEDLINK VA</span>
          </Link>
          <p className="max-w-md text-sm leading-6 text-white/80">
            {site.brandTagline}.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-white">Explore</p>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            {site.navigation.slice(1).map((item) => (
              <Link key={item.path} to={item.path} className="inline-flex min-h-11 items-center transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link to="/videos" className="inline-flex min-h-11 items-center transition-colors hover:text-white">Video Hub</Link>
            <Link to="/impact" className="inline-flex min-h-11 items-center transition-colors hover:text-white">Impact</Link>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-white">For Healthcare Practices</p>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            <Link to="/hire-an-mva" className="inline-flex min-h-11 items-center transition-colors hover:text-white">Hire an MVA</Link>
            <Link to="/services" className="inline-flex min-h-11 items-center transition-colors hover:text-white">Services</Link>
            <Link to="/how-we-prepare-mvas" className="inline-flex min-h-11 items-center transition-colors hover:text-white">How We Prepare MVAs</Link>
            <Link to="/book-consultation" className="inline-flex min-h-11 items-center transition-colors hover:text-white">Book a Consultation</Link>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-white">Contact</p>
          <Link to="/book-consultation" className="btn-secondary">{site.primaryCtaLabel}</Link>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            <Link className="inline-flex min-h-11 items-center transition-colors hover:text-white" to="/contact">
              Contact page
            </Link>
            <Link className="inline-flex min-h-11 items-center transition-colors hover:text-white" to="/verify">
              Verify Certificate
            </Link>
            <a className="inline-flex min-h-11 items-center transition-colors hover:text-white" href={`mailto:${site.contactEmail}`}>
              {site.contactEmail}
            </a>
            {site.phone ? (
              <a className="inline-flex min-h-11 items-center transition-colors hover:text-white" href={`tel:${site.phone.replace(/\s+/g, "")}`}>
                {site.phone}
              </a>
            ) : null}
            <a href={siteContent.whatsappUrl} className="inline-flex min-h-11 items-center font-semibold text-white underline underline-offset-4" target="_blank" rel="noopener noreferrer">Chat on WhatsApp <span className="sr-only">(opens in a new tab)</span></a>
            {site.socialLinks?.length ? (
              <div className="pt-2">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/50">Social</p>
                <div className="flex flex-col gap-2">
                  {site.socialLinks.map((link) => (
                    <a
                      key={`${link.label}-${link.url}`}
                      className="inline-flex min-h-11 items-center transition-colors hover:text-white"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit MedLink VA on ${link.platform?.trim() || link.label}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 lg:py-3">
          <p>© {new Date().getFullYear()} MedLink VA.</p>
          <div className="flex flex-wrap gap-4">
            {site.footerNavigation.map((item) => (
              <Link key={item.path} to={item.path} className="inline-flex min-h-11 items-center transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

