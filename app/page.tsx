import { Cases } from "./components/cases/Cases";
import { Hero } from "./components/hero/Hero";
import { Pricing } from "./components/pricing/Pricing";
import { Quality } from "./components/quality/QualitySection";
import { RepairQuizSection } from "./components/quiz/RepairQuizSection";
import { Stats } from "./components/stats/Stats";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Cases />
      <RepairQuizSection />
      <Pricing />
      <Quality />
    </main>
  );
}
