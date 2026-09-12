import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { ServicesPage } from "../pages/ServicesPage";
import { AboutPage } from "../pages/AboutPage";
import { HowItWorksPage } from "../pages/HowItWorksPage";
import { JobsPage } from "../pages/JobsPage";
import { ClassesPage } from "../pages/ClassesPage";
import { ResourcesPage } from "../pages/ResourcesPage";
import { ProductsPage } from "../pages/ProductsPage";
import { ContactPage } from "../pages/ContactPage";
import { BookConsultationPage } from "../pages/BookConsultationPage";
import { PrivacyPage } from "../pages/PrivacyPage";
import { TermsPage } from "../pages/TermsPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { CertificateVerifyPage } from "../pages/CertificateVerifyPage";
import { SiteLayout } from "../layouts/SiteLayout";

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="how-it-works" element={<HowItWorksPage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="classes" element={<ClassesPage />} />
        <Route path="resources" element={<ResourcesPage />} />
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
    </>
  );
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

