import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ArrowRight, Loader2, Target, Briefcase, BookOpen, Rocket, Heart } from 'lucide-react';

const categories = [
  { id: 'career', label: 'Career', icon: Briefcase },
  { id: 'learning', label: 'Learning', icon: BookOpen },
  { id: 'side_project', label: 'Side Project', icon: Rocket },
  { id: 'health', label: 'Health', icon: Heart },
];

const Goal = () => {
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [checkingGoal, setCheckingGoal] = useState(true);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }

    // Check if user already has an active goal
    const checkExistingGoal = async () => {
      if (!user) return;
      
      const { data: existingGoal } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (existingGoal) {
        navigate('/task');
      }
      setCheckingGoal(false);
    };

    if (user) {
      checkExistingGoal();
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!goal.trim()) {
      toast.error('Please enter your goal');
      return;
    }

    if (!user) return;

    setIsLoading(true);

    try {
      // Create the goal
      const { error: goalError } = await supabase
        .from('goals')
        .insert({
          user_id: user.id,
          goal_text: goal,
          category: category,
        });

      if (goalError) throw goalError;

      // Initialize user progress if not exists
      const { error: progressError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          streak: 0,
          current_task_index: 0,
        }, {
          onConflict: 'user_id',
        });

      if (progressError) throw progressError;

      toast.success('Goal set! Here\'s your first task.');
      navigate('/task');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save goal');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || checkingGoal) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">What's your goal this week?</h1>
          <p className="text-muted-foreground">Be specific. We'll break it into daily tasks.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Goal Input */}
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="e.g., Start freelancing on the side"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="h-14 text-lg bg-card border-border px-4"
              autoFocus
            />
          </div>

          {/* Category Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">
              Category (optional)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 ${
                      category === cat.id
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'bg-card border-border text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Generate my first task
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Goal;
