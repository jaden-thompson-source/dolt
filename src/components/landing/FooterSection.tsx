import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "How does DOLT choose my tasks?",
    answer: "AI analyzes your weekly goal and surfaces the highest-impact task. You explain your priorities, we handle the rest.",
  },
  {
    question: "What if I disagree with the AI's choice?",
    answer: "You can always reorder with a reason. We give you agency while keeping you focused.",
  },
  {
    question: "Is there a free trial?",
    answer: "No fluff, no trial. Early adopters get locked-in pricing at $15/month forever.",
  },
];

const FooterSection = () => {
  return (
    <footer className="relative py-24 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-foreground text-center mb-8">
            Quick Questions
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-5">
                <p className="text-foreground font-medium mb-2 text-sm">{faq.question}</p>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Early access is <span className="text-foreground font-medium">$15/month</span>. Limited to 100 users.
          </p>
          <Button variant="hero" size="lg" className="mb-8">
            Join DOLT — Crush Your Goals Now
          </Button>

          {/* Bottom Links */}
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <span className="text-border">•</span>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <span className="text-border">•</span>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>

          <p className="text-muted-foreground/60 text-xs mt-8">
            © 2024 DOLT. Built for doers who don't overthink.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;