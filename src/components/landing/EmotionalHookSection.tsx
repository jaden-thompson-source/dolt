import { useState, useEffect } from "react";
import { Check } from "lucide-react";

const streakDays = [
  { day: "Mon", completed: true },
  { day: "Tue", completed: true },
  { day: "Wed", completed: true },
  { day: "Thu", completed: true },
  { day: "Fri", completed: true },
  { day: "Sat", completed: false },
  { day: "Sun", completed: false },
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
    }, 300);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          Your to-do list stops{" "}
          <span className="text-gradient-primary">controlling you.</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Watch yourself achieve more than you thought possible. One task, one win, one unstoppable streak.
        </p>

        {/* Streak Visualization */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-foreground font-semibold">Your Week</h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">5</span>
                <span className="text-muted-foreground text-sm">day streak</span>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
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

            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Weekly progress</span>
                <span className="text-primary font-medium">5/7 tasks</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full transition-all duration-1000"
                  style={{ width: '71%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quote */}
        <p className="text-muted-foreground italic max-w-xl mx-auto">
          "Stop being paralyzed by choice. Let AI handle the thinking. You just do."
        </p>
      </div>
    </section>
  );
};

export default EmotionalHookSection;