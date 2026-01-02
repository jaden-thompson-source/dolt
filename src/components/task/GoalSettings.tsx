import { useState } from 'react';
import { Settings, X, Briefcase, BookOpen, Rocket, Heart, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface GoalSettingsProps {
  userId: string;
  currentGoal: string;
  currentCategory: string;
  onUpdate: () => void;
}

const categories = [
  { id: 'career', label: 'Career', icon: Briefcase },
  { id: 'learning', label: 'Learning', icon: BookOpen },
  { id: 'side_project', label: 'Side Project', icon: Rocket },
  { id: 'health', label: 'Health', icon: Heart },
];

const GoalSettings = ({ userId, currentGoal, currentCategory, onUpdate }: GoalSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [goal, setGoal] = useState(currentGoal);
  const [category, setCategory] = useState(currentCategory);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!goal.trim()) {
      toast.error('Goal cannot be empty');
      return;
    }

    setIsSaving(true);
    try {
      // Update the active goal
      const { error } = await supabase
        .from('goals')
        .update({ 
          goal_text: goal,
          category: category 
        })
        .eq('user_id', userId)
        .eq('is_active', true);

      if (error) throw error;

      toast.success('Goal updated!');
      setIsOpen(false);
      onUpdate();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update goal');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="text-muted-foreground hover:text-foreground"
      >
        <Settings className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm animate-fade-in">
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Edit Goal</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Your Goal</label>
              <Input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="h-12 bg-card border-border"
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Category</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-3 rounded-lg border transition-all flex items-center gap-2 ${
                        category === cat.id
                          ? 'bg-primary/20 border-primary text-primary'
                          : 'bg-card border-border text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalSettings;
