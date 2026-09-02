import { Seo } from "../components/Seo";
import { ClassesPreview } from "../components/home/ClassesPreview";
import { FinalCtaSection } from "../components/home/FinalCtaSection";
import { HeroSection } from "../components/home/HeroSection";
import { HowItWorksSection } from "../components/home/HowItWorksSection";
import { JobsPreview } from "../components/home/JobsPreview";
import { MeetTeamSection } from "../components/home/MeetTeamSection";
import { NewsletterSection } from "../components/home/NewsletterSection";
import { ProductsPreview } from "../components/home/ProductsPreview";
import { ResourcesPreview } from "../components/home/ResourcesPreview";
import { ServicesOverview } from "../components/home/ServicesOverview";
import { TeamSupportSection } from "../components/home/TeamSupportSection";
import { TrustStrip } from "../components/home/TrustStrip";
import { WhyMedlinkSection } from "../components/home/WhyMedlinkSection";
import { WhoWeServeSection } from "../components/home/WhoWeServeSection";
import { clientAssets } from "../lib/assets";

export function HomePage() {
  return (
    <>
      <Seo
        title="Medlink VA | Virtual Medical Assistant Support"
        description="Professional virtual medical assistant support for healthcare practices seeking help with scheduling, patient communication, administration, and day-to-day operations."
        image={clientAssets.hero}
      />
      <HeroSection />
      <TrustStrip />
      <ServicesOverview />
      <WhyMedlinkSection />
      <HowItWorksSection />
      <WhoWeServeSection />
      <TeamSupportSection />
      <MeetTeamSection />
      <ClassesPreview />
      <JobsPreview />
      <ProductsPreview />
      <ResourcesPreview />
      <NewsletterSection />
      <FinalCtaSection />
    </>
  );
}

