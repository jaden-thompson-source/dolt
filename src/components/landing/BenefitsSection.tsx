import { ArrowRight, X, Check } from "lucide-react";

const BenefitsSection = () => {
  return (
    <section className="relative py-24 px-6 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        {/* Before/After Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Difference is <span className="text-gradient-primary">Brutal</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Without DOLT */}
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-accent font-semibold mb-6 uppercase text-sm tracking-wider">Without DOLT</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Wake up to 27 unfinished ideas</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Open 4 apps, close 3</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Scroll for "inspiration"</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-foreground">By noon, done nothing meaningful</span>
              </li>
            </ul>
          </div>

          {/* With DOLT */}
          <div className="bg-card border border-primary/30 rounded-xl p-8 glow-primary-subtle">
            <p className="text-primary font-semibold mb-6 uppercase text-sm tracking-wider">With DOLT</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Wake up to one clear action</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Complete it before lunch</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Repeat tomorrow</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground">In a week, you've shipped meaningful progress</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-lg mb-20">
          That's it. That's the whole system.
        </p>

        {/* Concrete Use Case */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Here's What Day 1 Looks Like
          </h3>
          
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Goal Input */}
            <div className="p-6 border-b border-border">
              <p className="text-muted-foreground text-sm mb-2">Your goal:</p>
              <p className="text-foreground font-medium text-lg">"Start freelancing on the side"</p>
            </div>
            
            {/* Task Sequence */}
            <div className="p-6 space-y-4">
              <p className="text-muted-foreground text-sm mb-4">DOLT generates your path:</p>
              
              <div className="flex items-center gap-4 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <span className="text-primary font-bold whitespace-nowrap">Day 1</span>
                <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-foreground">Create a one-page portfolio</p>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg opacity-70">
                <span className="text-muted-foreground font-bold whitespace-nowrap">Day 2</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <p className="text-muted-foreground">Send it to 3 people</p>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg opacity-50">
                <span className="text-muted-foreground font-bold whitespace-nowrap">Day 3</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <p className="text-muted-foreground">Post in 2 relevant communities</p>
              </div>
            </div>
            
            <div className="p-6 bg-muted/30 border-t border-border">
              <p className="text-muted-foreground text-center">
                No planning. No overwhelm. Just one task at a time — <span className="text-primary font-medium">done</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;