import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "How does DOLT choose my tasks?",
    answer: "AI analyzes your weekly goal and surfaces the highest-impact task. You explain priorities; we handle the rest.",
  },
  {
    question: "What if I disagree with the AI's choice?",
    answer: "You can always reorder tasks with a reason — you stay in control.",
  },
  {
    question: "Do I need a trial?",
    answer: "No fluff, no trial — you start your first task immediately.",
  },
];

const FooterSection = () => {
  return (
    <footer className="relative py-24 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
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
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Start your first task — it only takes 2 minutes.
          </h3>
          <Button variant="hero" size="lg" className="group mb-6">
            Start Now
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-muted-foreground">
            Stop spinning your wheels. Start moving forward. One task at a time.
          </p>
        </div>

        {/* Bottom Links */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <span className="text-border">•</span>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <span className="text-border">•</span>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>

          <p className="text-muted-foreground/60 text-xs">
            © 2026 DOLT. Built for doers who don't overthink.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;