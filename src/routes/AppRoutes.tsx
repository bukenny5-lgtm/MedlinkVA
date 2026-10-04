import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { SiteLayout } from "../layouts/SiteLayout";
import { trackPageView } from "../lib/analytics";

const ServicesPage = lazy(() => import("../pages/ServicesPage").then(({ ServicesPage: component }) => ({ default: component })));
const AboutPage = lazy(() => import("../pages/AboutPage").then(({ AboutPage: component }) => ({ default: component })));
const HowItWorksPage = lazy(() => import("../pages/HowItWorksPage").then(({ HowItWorksPage: component }) => ({ default: component })));
const JobsPage = lazy(() => import("../pages/JobsPage").then(({ JobsPage: component }) => ({ default: component })));
const ClassesPage = lazy(() => import("../pages/ClassesPage").then(({ ClassesPage: component }) => ({ default: component })));
const ResourcesPage = lazy(() => import("../pages/ResourcesPage").then(({ ResourcesPage: component }) => ({ default: component })));
const FaqsPage = lazy(() => import("../pages/FaqsPage").then(({ FaqsPage: component }) => ({ default: component })));
const ProductsPage = lazy(() => import("../pages/ProductsPage").then(({ ProductsPage: component }) => ({ default: component })));
const ContactPage = lazy(() => import("../pages/ContactPage").then(({ ContactPage: component }) => ({ default: component })));
const BookConsultationPage = lazy(() => import("../pages/BookConsultationPage").then(({ BookConsultationPage: component }) => ({ default: component })));
const PrivacyPage = lazy(() => import("../pages/PrivacyPage").then(({ PrivacyPage: component }) => ({ default: component })));
const TermsPage = lazy(() => import("../pages/TermsPage").then(({ TermsPage: component }) => ({ default: component })));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage").then(({ NotFoundPage: component }) => ({ default: component })));
const CertificateVerifyPage = lazy(() => import("../pages/CertificateVerifyPage").then(({ CertificateVerifyPage: component }) => ({ default: component })));
const VideosPage = lazy(() => import("../pages/VideosPage").then(({ VideosPage: component }) => ({ default: component })));
const HireAnMvaPage = lazy(() => import("../pages/HybridPages").then(({ HireAnMvaPage: component }) => ({ default: component })));
const ImpactPage = lazy(() => import("../pages/HybridPages").then(({ ImpactPage: component }) => ({ default: component })));
const PrepareMvasPage = lazy(() => import("../pages/HybridPages").then(({ PrepareMvasPage: component }) => ({ default: component })));
const PrivacyCompliancePage = lazy(() => import("../pages/HybridPages").then(({ PrivacyCompliancePage: component }) => ({ default: component })));
const ResourceDetailPage = lazy(() => import("../pages/HybridPages").then(({ ResourceDetailPage: component }) => ({ default: component })));
const HealthcareTeamPage = lazy(() => import("../pages/HealthcareTeamPage").then(({ HealthcareTeamPage: component }) => ({ default: component })));
const ServiceDetailPage = lazy(() => import("../pages/ServiceDetailPage").then(({ ServiceDetailPage: component }) => ({ default: component })));
const OfficialLaunchPage = lazy(() => import("../pages/OfficialLaunchPage").then(({ OfficialLaunchPage: component }) => ({ default: component })));

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <AnalyticsTracker />
      <Suspense fallback={<div className="min-h-screen bg-brand-background" aria-hidden="true" />}>
      <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="hire-an-mva" element={<HireAnMvaPage />} />
        <Route path="impact" element={<ImpactPage />} />
        <Route path="how-we-prepare-mvas" element={<PrepareMvasPage />} />
        <Route path="privacy-and-compliance" element={<PrivacyCompliancePage />} />
        <Route path="healthcare-teams/:audienceSlug" element={<HealthcareTeamPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:serviceSlug" element={<ServiceDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="how-it-works" element={<HowItWorksPage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="classes" element={<ClassesPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="events/:slug" element={<OfficialLaunchPage />} />
        <Route path="faqs" element={<FaqsPage />} />
        <Route path="resources/:slug" element={<ResourceDetailPage />} />
        <Route path="videos" element={<VideosPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="book-consultation" element={<BookConsultationPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="verify" element={<CertificateVerifyPage />} />
        <Route path="verify/:token" element={<CertificateVerifyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      </Routes>
      </Suspense>
    </>
  );
}

function AnalyticsTracker() {
  const { pathname } = useLocation();

useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return null;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

