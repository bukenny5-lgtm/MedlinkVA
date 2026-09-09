import { Outlet } from "react-router-dom";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";

export function SiteLayout() {
  return (
    <div className="min-h-screen bg-brand-background text-brand-charcoal">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-navy focus:shadow-soft"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="mx-auto w-full max-w-7xl py-4 sm:py-6">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

