import { Cases } from "./components/cases/Cases";
import { DesignCta } from "./components/design/DesignCta";
import { ProjectGallery } from "./components/gallery/ProjectGallery";
import { Hero } from "./components/hero/Hero";
import { Pricing } from "./components/pricing/Pricing";
import { Quality } from "./components/quality/QualitySection";
import { RepairQuizSection } from "./components/quiz/RepairQuizSection";
import { Stats } from "./components/stats/Stats";
import { FinalSection } from "./components/final/FinalSection";
import { CertificatesSection } from "./components/trust/CertificatesSection";
import { PartnersSection } from "./components/trust/PartnersSection";
import { ReviewsSection } from "./components/trust/ReviewsSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Cases />
      <RepairQuizSection />
      <Pricing />
      <Quality />
      <ProjectGallery />
      <DesignCta />
      <CertificatesSection />
      <PartnersSection />
      <ReviewsSection />
      <FinalSection />
    </main>
  );
}
