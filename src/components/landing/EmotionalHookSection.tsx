import { useState, useEffect } from "react";
import { Check } from "lucide-react";

const streakDays = [
  { day: "Mon", task: "Set up portfolio" },
  { day: "Tue", task: "Write intro copy" },
  { day: "Wed", task: "Add 3 projects" },
  { day: "Thu", task: "Share with 5 people" },
  { day: "Fri", task: "Apply to 2 gigs" },
  { day: "Sat", task: null },
  { day: "Sun", task: null },
];

const EmotionalHookSection = () => {
  const [visibleDays, setVisibleDays] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleDays((prev) => {
        if (prev >= 5) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          5 days. <span className="text-gradient-primary">5 tasks done.</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          This is what a week of actual progress looks like.
        </p>

        {/* Streak Visualization */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-foreground font-semibold">Your Week</h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">{visibleDays}</span>
                <span className="text-muted-foreground text-sm">tasks shipped</span>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-6">
              {streakDays.map((day, index) => (
                <div key={day.day} className="text-center">
                  <p className="text-muted-foreground text-xs mb-2">{day.day}</p>
                  <div
                    className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center transition-all duration-300 ${
                      index < visibleDays
                        ? "bg-primary/20 border-2 border-primary"
                        : "bg-muted border-2 border-transparent"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {index < visibleDays && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* What got done */}
            <div className="text-left space-y-2 pt-4 border-t border-border">
              {streakDays.slice(0, visibleDays).map((day, index) => (
                <div 
                  key={day.day} 
                  className="flex items-center gap-3 text-sm animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{day.day}:</span>
                  <span className="text-foreground">{day.task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reframe */}
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          No magic. No hacks. Just <span className="text-primary font-medium">one task per day</span> that you actually finish.
        </p>
      </div>
    </section>
  );
};

export default EmotionalHookSection;