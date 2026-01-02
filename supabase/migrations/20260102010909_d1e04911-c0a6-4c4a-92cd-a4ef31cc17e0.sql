-- User progress table to track streaks and task completion
CREATE TABLE public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  streak INTEGER NOT NULL DEFAULT 0,
  last_task_completed_at TIMESTAMP WITH TIME ZONE,
  current_task_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Goals table to store user weekly goals
CREATE TABLE public.goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  goal_text TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Static tasks table (pre-populated by category)
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  day_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- User progress policies (users can only access their own data)
CREATE POLICY "Users can view their own progress"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON public.user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Goals policies
CREATE POLICY "Users can view their own goals"
  ON public.goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own goals"
  ON public.goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals"
  ON public.goals FOR UPDATE
  USING (auth.uid() = user_id);

-- Tasks are public (read-only for everyone)
CREATE POLICY "Anyone can view tasks"
  ON public.tasks FOR SELECT
  USING (true);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert static tasks for each category
INSERT INTO public.tasks (category, title, description, day_order) VALUES
-- Career tasks
('career', 'Update your resume with recent experience', 'Spend 15 minutes refreshing your resume', 1),
('career', 'Reach out to 2 people in your network', 'Send a quick message or email', 2),
('career', 'Research 3 companies you''d like to work for', 'List what you like about each', 3),
('career', 'Draft a cover letter template', 'Create one you can customize later', 4),
('career', 'Apply to one job posting', 'Just one. Quality over quantity', 5),
('career', 'Schedule an informational interview', 'Reach out to someone in your target field', 6),
('career', 'Review and practice common interview questions', 'Prepare 3 strong answers', 7),
-- Learning tasks
('learning', 'Spend 20 minutes on your chosen topic', 'Read, watch, or practice', 1),
('learning', 'Take notes on one key concept', 'Write it in your own words', 2),
('learning', 'Teach what you learned to someone', 'Or explain it out loud to yourself', 3),
('learning', 'Complete one exercise or practice problem', 'Apply what you''ve learned', 4),
('learning', 'Find one additional resource on your topic', 'A video, article, or book', 5),
('learning', 'Review your notes from this week', 'Reinforce your knowledge', 6),
('learning', 'Create a simple project using what you learned', 'Build something small', 7),
-- Side project tasks
('side_project', 'Create a one-page portfolio', 'Simple is better than perfect', 1),
('side_project', 'Send it to 3 people for feedback', 'Friends, family, or online communities', 2),
('side_project', 'Post in 2 relevant communities', 'Share what you''re building', 3),
('side_project', 'Add one feature or improvement', 'Based on feedback received', 4),
('side_project', 'Document your progress', 'Write a short update or changelog', 5),
('side_project', 'Reach out to one potential user or customer', 'Get real-world feedback', 6),
('side_project', 'Set up a simple landing page', 'Capture interest for your project', 7),
-- Health tasks
('health', 'Take a 15-minute walk', 'Fresh air and movement', 1),
('health', 'Drink 8 glasses of water today', 'Track it throughout the day', 2),
('health', 'Do a 10-minute stretching session', 'Focus on areas that feel tight', 3),
('health', 'Prepare one healthy meal', 'Cook something simple and nutritious', 4),
('health', 'Get to bed 30 minutes earlier', 'Better sleep = better everything', 5),
('health', 'Try a 5-minute meditation', 'Use an app or just breathe deeply', 6),
('health', 'Take a break from screens for 1 hour', 'Read, walk, or just rest', 7),
-- General/default tasks
('general', 'Write down your main goal for the week', 'Be specific and realistic', 1),
('general', 'Break your goal into 3 smaller steps', 'Make it actionable', 2),
('general', 'Complete the first step today', 'Start with the easiest one', 3),
('general', 'Review your progress so far', 'What''s working? What isn''t?', 4),
('general', 'Adjust your plan if needed', 'Flexibility is key', 5),
('general', 'Complete another step towards your goal', 'Keep the momentum going', 6),
('general', 'Celebrate your progress', 'You showed up every day', 7);