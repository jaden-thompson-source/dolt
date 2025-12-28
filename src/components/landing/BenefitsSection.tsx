import { Zap, Target, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Tasks vanish.",
    highlight: "Wins appear instantly.",
    description: "Complete one thing. See immediate progress. Feel the rush.",
  },
  {
    icon: Target,
    title: "Next move chosen.",
    highlight: "Momentum unstoppable.",
    description: "AI picks your priority. You just execute. No decisions.",
  },
  {
    icon: TrendingUp,
    title: "Action replaces overthinking.",
    highlight: "Confidence grows.",
    description: "Stop planning endlessly. Start shipping daily. Watch yourself win.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="relative py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why <span className="text-gradient-primary">DOLT</span> Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Minimalist. Momentum-first. One task at a time, every day.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border rounded-xl p-8 transition-all duration-300 hover:border-primary/50 hover:glow-primary-subtle"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-1">
                {benefit.title}
              </h3>
              <p className="text-primary font-medium mb-3">
                {benefit.highlight}
              </p>
              <p className="text-muted-foreground text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;