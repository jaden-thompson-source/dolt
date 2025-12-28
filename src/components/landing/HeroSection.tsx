import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

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
          Decisions pile up.{" "}
          <span className="text-gradient-primary">You fall behind.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          One task. Done. Momentum unlocked.
        </p>

        {/* Task Preview Card */}
        <div 
          className="max-w-md mx-auto mb-12 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="relative bg-card border border-border rounded-xl p-6 glow-primary-subtle animate-glow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center animate-float">
                <Check className="w-6 h-6 text-primary animate-check" />
              </div>
              <div className="text-left">
                <p className="text-foreground font-medium">Ship landing page MVP</p>
                <p className="text-muted-foreground text-sm">Your one focus. Nothing else.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Button variant="hero" size="lg">
            Join Early Access — $15/month
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