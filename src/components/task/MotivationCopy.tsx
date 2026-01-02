import { useMemo } from 'react';

interface MotivationCopyProps {
  type: 'task' | 'completion' | 'streak';
  streak?: number;
}

const taskCopies = [
  "Momentum builds fast — keep going!",
  "One small action beats a perfect plan.",
  "Today's task, tomorrow's progress.",
  "You're closer than you think.",
  "Small steps, big results.",
  "Focus beats hustle. Do this one thing.",
  "Progress over perfection.",
];

const completionCopies = [
  "One small win builds unstoppable momentum.",
  "That's how it's done! 💪",
  "You just moved the needle.",
  "Progress unlocked.",
  "Another step forward. Nice work.",
  "Consistency is your superpower.",
  "You're building something real.",
];

const getStreakCopy = (streak: number) => {
  if (streak === 1) return "Day 1 — the hardest step is done!";
  if (streak === 3) return "3 days strong. Momentum is building.";
  if (streak === 5) return "5 days! You're on a roll.";
  if (streak === 7) return "One week! 🔥 This is becoming a habit.";
  if (streak === 14) return "Two weeks! You're unstoppable.";
  if (streak === 21) return "21 days — officially a habit! 🏆";
  if (streak >= 30) return `${streak} days! You're a machine. 🚀`;
  return `🔥 +1 Day Streak!`;
};

const MotivationCopy = ({ type, streak = 0 }: MotivationCopyProps) => {
  const copy = useMemo(() => {
    if (type === 'streak') {
      return getStreakCopy(streak);
    }
    
    const copies = type === 'task' ? taskCopies : completionCopies;
    return copies[Math.floor(Math.random() * copies.length)];
  }, [type, streak]);

  return (
    <p className={`text-sm ${type === 'completion' ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
      {copy}
    </p>
  );
};

export default MotivationCopy;
