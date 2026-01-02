import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Check, Loader2, Flame, LogOut, RefreshCw } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string | null;
  day_order: number;
}

interface UserProgress {
  streak: number;
  current_task_index: number;
  last_task_completed_at: string | null;
}

const Task = () => {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [category, setCategory] = useState('general');
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const loadTaskData = useCallback(async () => {
    if (!user) return;

    try {
      // Get user's active goal for category
      const { data: goal } = await supabase
        .from('goals')
        .select('category')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      const userCategory = goal?.category || 'general';
      setCategory(userCategory);

      // Get user progress
      const { data: userProgress } = await supabase
        .from('user_progress')
        .select('streak, current_task_index, last_task_completed_at')
        .eq('user_id', user.id)
        .single();

      if (userProgress) {
        setProgress(userProgress);

        // Get the current task based on index
        const taskIndex = userProgress.current_task_index % 7; // Cycle through 7 tasks
        
        const { data: task } = await supabase
          .from('tasks')
          .select('*')
          .eq('category', userCategory)
          .eq('day_order', taskIndex + 1)
          .single();

        setCurrentTask(task);
      }
    } catch (error) {
      console.error('Error loading task data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      loadTaskData();
    }
  }, [user, loading, navigate, loadTaskData]);

  const handleCompleteTask = async () => {
    if (!user || !progress) return;

    setIsCompleting(true);

    try {
      const now = new Date();
      const lastCompleted = progress.last_task_completed_at 
        ? new Date(progress.last_task_completed_at) 
        : null;

      // Calculate streak
      let newStreak = progress.streak;
      
      if (lastCompleted) {
        const daysDiff = Math.floor((now.getTime() - lastCompleted.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 0) {
          // Already completed today, just increment task index
        } else if (daysDiff === 1) {
          // Consecutive day - increment streak
          newStreak += 1;
        } else {
          // Streak broken - reset
          newStreak = 1;
        }
      } else {
        // First ever completion
        newStreak = 1;
      }

      // Update progress
      const { error } = await supabase
        .from('user_progress')
        .update({
          streak: newStreak,
          current_task_index: progress.current_task_index + 1,
          last_task_completed_at: now.toISOString(),
        })
        .eq('user_id', user.id);

      if (error) throw error;

      // Show success animation
      setShowConfetti(true);
      setProgress({
        ...progress,
        streak: newStreak,
        current_task_index: progress.current_task_index + 1,
        last_task_completed_at: now.toISOString(),
      });

      toast.success(`Momentum +1! 🔥 Streak: ${newStreak}`);

      // Load next task after animation
      setTimeout(() => {
        setShowConfetti(false);
        loadTaskData();
      }, 2000);

    } catch (error: any) {
      toast.error(error.message || 'Failed to complete task');
    } finally {
      setIsCompleting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleNewGoal = async () => {
    if (!user) return;

    // Deactivate current goal
    await supabase
      .from('goals')
      .update({ is_active: false })
      .eq('user_id', user.id)
      .eq('is_active', true);

    // Reset progress
    await supabase
      .from('user_progress')
      .update({ current_task_index: 0 })
      .eq('user_id', user.id);

    navigate('/goal');
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-border">
        <h1 className="text-xl font-bold text-primary">DOLT</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleNewGoal}>
            <RefreshCw className="h-4 w-4 mr-2" />
            New Goal
          </Button>
          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          {/* Streak Counter */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-card px-6 py-3 rounded-full border border-border">
              <Flame className="h-6 w-6 text-accent" />
              <span className="text-2xl font-bold text-foreground">{progress?.streak || 0}</span>
              <span className="text-muted-foreground">day streak</span>
            </div>
          </div>

          {/* Task Card */}
          <div className={`bg-card border border-border rounded-2xl p-8 space-y-6 transition-all duration-300 ${showConfetti ? 'scale-105 border-primary glow-primary' : ''}`}>
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground uppercase tracking-wide">
                Day {(progress?.current_task_index || 0) % 7 + 1} of 7
              </p>
              <h2 className="text-2xl font-bold text-foreground">
                {currentTask?.title || 'Loading...'}
              </h2>
              {currentTask?.description && (
                <p className="text-muted-foreground">
                  {currentTask.description}
                </p>
              )}
            </div>

            {/* Complete Button */}
            <Button
              variant="hero"
              size="lg"
              className="w-full h-16 text-lg"
              onClick={handleCompleteTask}
              disabled={isCompleting || showConfetti}
            >
              {isCompleting ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : showConfetti ? (
                <>
                  <Check className="h-6 w-6" />
                  Done!
                </>
              ) : (
                <>
                  <Check className="h-6 w-6" />
                  Mark Done
                </>
              )}
            </Button>
          </div>

          {/* Motivation Text */}
          <p className="text-center text-muted-foreground text-sm">
            Complete this task. Return tomorrow. Build momentum.
          </p>
        </div>
      </main>

      {/* Success Animation Overlay */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}
    </div>
  );
};

export default Task;
