import HeroSection from "@/components/landing/HeroSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import EmotionalHookSection from "@/components/landing/EmotionalHookSection";
import FooterSection from "@/components/landing/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <BenefitsSection />
      <EmotionalHookSection />
      <FooterSection />
    </main>
  );
};

export default Index;