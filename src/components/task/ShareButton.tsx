import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ShareButtonProps {
  streak: number;
  tasksCompleted: number;
}

const ShareButton = ({ streak, tasksCompleted }: ShareButtonProps) => {
  const handleShare = async () => {
    const shareText = `I've completed ${tasksCompleted} tasks with a ${streak}-day streak on DOLT! 🔥\n\nOne task at a time. Real progress.\n\n#DOLT #Productivity`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My DOLT Progress',
          text: shareText,
        });
      } catch (err) {
        // User cancelled or error
        if ((err as Error).name !== 'AbortError') {
          await copyToClipboard(shareText);
        }
      }
    } else {
      await copyToClipboard(shareText);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard! Share your progress.');
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className="gap-2"
    >
      <Share2 className="h-4 w-4" />
      Share Progress
    </Button>
  );
};

export default ShareButton;
