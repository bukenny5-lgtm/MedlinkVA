import { Seo } from "../components/Seo";
import { ClassesPreview } from "../components/home/ClassesPreview";
import { FinalCtaSection } from "../components/home/FinalCtaSection";
import { HeroSection } from "../components/home/HeroSection";
import { ProductsPreview } from "../components/home/ProductsPreview";
import { ResourcesPreview } from "../components/home/ResourcesPreview";
import { ServicesOverview } from "../components/home/ServicesOverview";
import { clientAssets } from "../lib/assets";
import { HomeImpactPreview, HomePathways } from "../components/home/HybridSections";
import { HomepagePromotion } from "../components/home/HomepagePromotion";
import { HomeTrustStrip, HomepageCredibility, HomepageQuickLinks } from "../components/home/HomepageConversionSections";
import { HomepageWebinar } from "../components/home/HomepageWebinar";

export function HomePage() {
  return (
    <>
      <Seo
        title="Virtual Medical Assistant Training & Healthcare Support | MedLink VA"
        description="MedLink VA provides practical Virtual Medical Assistant training and helps healthcare practices access trained remote healthcare support."
        image={clientAssets.hero}
      />
      <HeroSection />
      <HomeTrustStrip />
      <HomePathways />
      <ClassesPreview />
      <ServicesOverview />
      <HomepagePromotion />
      <HomepageCredibility />
      <HomeImpactPreview />
      <ResourcesPreview />
      <HomepageWebinar />
      <ProductsPreview />
      <HomepageQuickLinks />
      <FinalCtaSection />
    </>
  );
}

