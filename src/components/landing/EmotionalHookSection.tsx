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
          A Week of <span className="text-gradient-primary">Momentum</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
          Your Week: <span className="text-primary font-semibold">{visibleDays} tasks shipped</span>
        </p>

        {/* Week Table */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-2 border-b border-border bg-muted/30">
              <div className="p-4 text-left">
                <span className="text-muted-foreground font-medium text-sm">Day</span>
              </div>
              <div className="p-4 text-left">
                <span className="text-muted-foreground font-medium text-sm">Task</span>
              </div>
            </div>
            
            {/* Table Rows */}
            {streakDays.slice(0, 5).map((day, index) => (
              <div 
                key={day.day} 
                className={`grid grid-cols-2 border-b border-border last:border-b-0 transition-all duration-300 ${
                  index < visibleDays ? "bg-primary/5" : ""
                }`}
              >
                <div className="p-4 text-left flex items-center gap-3">
                  {index < visibleDays && (
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  )}
                  <span className={`font-medium ${index < visibleDays ? "text-foreground" : "text-muted-foreground"}`}>
                    {day.day}
                  </span>
                </div>
                <div className="p-4 text-left">
                  <span className={index < visibleDays ? "text-foreground" : "text-muted-foreground"}>
                    {day.task}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reframe */}
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          No hacks. No magic. Just <span className="text-primary font-medium">real progress every day</span>.
        </p>
      </div>
    </section>
  );
};

export default EmotionalHookSection;