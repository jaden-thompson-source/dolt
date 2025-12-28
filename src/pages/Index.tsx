import HeroSection from "@/components/landing/HeroSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import ScarcitySection from "@/components/landing/ScarcitySection";
import EmotionalHookSection from "@/components/landing/EmotionalHookSection";
import FooterSection from "@/components/landing/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <BenefitsSection />
      <ScarcitySection />
      <EmotionalHookSection />
      <FooterSection />
    </main>
  );
};

export default Index;