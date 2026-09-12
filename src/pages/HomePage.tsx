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
import { TestimonialSection } from "../components/shared/TestimonialSection";

export function HomePage() {
  return (
    <>
      <Seo
        title="Virtual Medical Assistant Training & Healthcare Support | MedLink VA"
        description="MedLink VA provides Virtual Medical Assistant training and healthcare administrative support for individuals, healthcare teams, and modern practices."
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
      <TestimonialSection />
      <ProductsPreview />
      <ResourcesPreview />
      <NewsletterSection />
      <FinalCtaSection />
    </>
  );
}

