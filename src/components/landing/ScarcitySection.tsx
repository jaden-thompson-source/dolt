import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const ScarcitySection = () => {
  const [spotsLeft, setSpotsLeft] = useState(37);
  const totalSpots = 100;
  const progressWidth = ((totalSpots - spotsLeft) / totalSpots) * 100;

  return (
    <section className="relative py-24 px-6 bg-secondary/30">
      <div className="max-w-3xl mx-auto text-center">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Limited Access — <span className="text-accent">Get In Now</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-10">
          Only the first 100 early adopters lock in $15/month forever.
        </p>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Spots claimed</span>
            <span className="text-accent font-semibold">{spotsLeft} left</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full transition-all duration-1000"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>

        {/* Urgency Card */}
        <div className="bg-card border border-border rounded-xl p-8 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
            <p className="text-foreground font-medium">Early access pricing ends soon</p>
          </div>
          <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className="text-5xl font-bold text-foreground">$15</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Lock in this rate forever. No price increases, ever.
          </p>
        </div>

        {/* CTA */}
        <Button variant="hero" size="lg">
          Claim Your Spot — Start Winning Today
        </Button>
      </div>
    </section>
  );
};

export default ScarcitySection;