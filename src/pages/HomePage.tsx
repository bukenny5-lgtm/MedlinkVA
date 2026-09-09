import { Seo } from "../components/Seo";
import { ClassesPreview } from "../components/home/ClassesPreview";
import { FinalCtaSection } from "../components/home/FinalCtaSection";
import { HeroSection } from "../components/home/HeroSection";
import { HowItWorksSection } from "../components/home/HowItWorksSection";
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
        title="MedLink VA | Virtual Medical Assistant Training & Support"
        description="Practical Virtual Medical Assistant training and remote healthcare administrative support for scheduling, communication, and everyday practice operations."
        image={clientAssets.hero}
      />
      <HeroSection />
      <TrustStrip />
      <ClassesPreview />
      <ServicesOverview />
      <WhyMedlinkSection />
      <HowItWorksSection />
      <WhoWeServeSection />
      <TeamSupportSection />
      <MeetTeamSection />
      <ProductsPreview />
      <ResourcesPreview />
      <NewsletterSection />
      <FinalCtaSection />
    </>
  );
}

