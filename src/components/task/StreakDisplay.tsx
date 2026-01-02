import { Flame, Trophy, Star, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

interface StreakDisplayProps {
  streak: number;
  showMilestone?: boolean;
}

const milestones = [
  { days: 7, label: 'First Week', icon: Star },
  { days: 14, label: 'Two Weeks', icon: Trophy },
  { days: 21, label: 'Habit Formed', icon: Zap },
  { days: 30, label: 'One Month', icon: Trophy },
];

const getMilestone = (streak: number) => {
  return milestones.find(m => m.days === streak);
};

const getNextMilestone = (streak: number) => {
  return milestones.find(m => m.days > streak);
};

const StreakDisplay = ({ streak, showMilestone = false }: StreakDisplayProps) => {
  const [animateMilestone, setAnimateMilestone] = useState(false);
  const milestone = getMilestone(streak);
  const nextMilestone = getNextMilestone(streak);

  useEffect(() => {
    if (showMilestone && milestone) {
      setAnimateMilestone(true);
      const timer = setTimeout(() => setAnimateMilestone(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showMilestone, milestone]);

  return (
    <div className="text-center space-y-3">
      {/* Main Streak Counter */}
      <div className={`inline-flex items-center gap-2 bg-card px-6 py-3 rounded-full border border-border transition-all duration-500 ${streak >= 7 ? 'glow-primary-subtle' : ''}`}>
        <Flame className={`h-6 w-6 ${streak > 0 ? 'text-accent animate-pulse' : 'text-muted-foreground'}`} />
        <span className="text-2xl font-bold text-foreground">{streak}</span>
        <span className="text-muted-foreground">day streak</span>
      </div>

      {/* Progress to Next Milestone */}
      {nextMilestone && streak > 0 && (
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>{nextMilestone.days - streak} days to "{nextMilestone.label}"</span>
          </div>
          <div className="w-40 mx-auto h-1 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ 
                width: `${Math.min(100, (streak / nextMilestone.days) * 100)}%` 
              }}
            />
          </div>
        </div>
      )}

      {/* Milestone Badge Animation */}
      {animateMilestone && milestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="text-center space-y-4 animate-scale-in">
            <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center glow-primary">
              <milestone.icon className="h-12 w-12 text-primary" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-bold text-primary">{milestone.label}!</p>
              <p className="text-muted-foreground">🔥 {streak} day streak</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreakDisplay;
