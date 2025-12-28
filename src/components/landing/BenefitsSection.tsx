import { ArrowRight } from "lucide-react";

const BenefitsSection = () => {
  return (
    <section className="relative py-24 px-6 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        {/* Before/After Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The difference is <span className="text-gradient-primary">brutal</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Before */}
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-accent font-semibold mb-4 uppercase text-sm tracking-wider">Without DOLT</p>
            <p className="text-foreground text-lg leading-relaxed">
              You wake up, stare at <span className="text-accent font-medium">27 unfinished ideas</span>, open 4 apps, close 3, 
              scroll Twitter "for inspiration", and by noon you've done nothing meaningful.
            </p>
            <p className="text-muted-foreground mt-4 text-sm">Sound familiar?</p>
          </div>

          {/* After */}
          <div className="bg-card border border-primary/30 rounded-xl p-8 glow-primary-subtle">
            <p className="text-primary font-semibold mb-4 uppercase text-sm tracking-wider">With DOLT</p>
            <p className="text-foreground text-lg leading-relaxed">
              You wake up to <span className="text-primary font-medium">one clear action</span>. You do it. 
              You're done before lunch. Tomorrow, another step. In a week, you've shipped.
            </p>
            <p className="text-muted-foreground mt-4 text-sm">That's it. That's the whole system.</p>
          </div>
        </div>

        {/* Concrete Use Case */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Here's what Day 1 looks like
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
                <span className="text-primary font-bold">Day 1</span>
                <ArrowRight className="w-4 h-4 text-primary" />
                <p className="text-foreground">"Create a one-page portfolio"</p>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg opacity-60">
                <span className="text-muted-foreground font-bold">Day 2</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <p className="text-muted-foreground">"Send it to 3 people"</p>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg opacity-40">
                <span className="text-muted-foreground font-bold">Day 3</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <p className="text-muted-foreground">"Post in 2 relevant communities"</p>
              </div>
            </div>
            
            <div className="p-6 bg-muted/30 border-t border-border">
              <p className="text-muted-foreground text-center text-sm">
                No planning. No overwhelm. Just <span className="text-primary font-medium">one task</span> until it's done.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;