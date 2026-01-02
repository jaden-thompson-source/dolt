import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
          DOLT gives you the one task that matters most today — and nothing else.
        </p>

        {/* CTA Button */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Link to="/auth">
            <Button variant="hero" size="lg" className="group">
              Start your first task
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Analogy - mental model */}
        <p className="text-muted-foreground mb-16 animate-slide-up" style={{ animationDelay: '0.25s' }}>
          Think <span className="text-primary font-medium">Duolingo</span>, but for real-life progress.
        </p>

        {/* How It Works - 3 Simple Steps */}
        <div 
          className="max-w-2xl mx-auto animate-slide-up"
          style={{ animationDelay: '0.3s' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            How It Works — 3 Simple Steps
          </h2>
          <div className="bg-card/50 border border-border rounded-xl p-8 backdrop-blur-sm">
            <div className="flex flex-col gap-6 text-left">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold">1</span>
                <p className="text-foreground text-lg">Tell us your goal.</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold">2</span>
                <p className="text-foreground text-lg">DOLT chooses your next step.</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold">3</span>
                <p className="text-foreground text-lg">You do it. Momentum builds.</p>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground mt-6 text-lg">
            One task. One day. One step closer to your goals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;