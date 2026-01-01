import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up">
          Stop overthinking.{" "}
          <span className="text-gradient-primary">Start finishing.</span>
        </h1>

        {/* Subheadline - concrete explanation */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          DOLT gives you one high-impact task each day so you actually make progress.
        </p>

        {/* Process Steps - the "what actually happens" */}
        <div 
          className="max-w-lg mx-auto mb-12 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="bg-card/50 border border-border rounded-xl p-6 backdrop-blur-sm">
            <div className="flex flex-col gap-4 text-left">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-sm">1</span>
                <p className="text-foreground">You tell us your goal.</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-sm">2</span>
                <p className="text-foreground">We choose the next step.</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-sm">3</span>
                <p className="text-foreground">You do it. Momentum builds.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analogy - mental model */}
        <p className="text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '0.25s' }}>
          Think <span className="text-primary font-medium">Duolingo</span>, but for real-life progress.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Button variant="hero" size="lg" className="group">
            Start your first task — $15/month
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-accent text-sm font-medium">
            Only 100 spots available
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;