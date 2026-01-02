import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { signInWithMagicLink } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate('/goal');
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email');
      return;
    }

    setIsLoading(true);

    const { error } = await signInWithMagicLink(email);

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    setEmailSent(true);
    setIsLoading(false);
    toast.success('Check your email for the magic link!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary tracking-tight">DOLT</h1>
          <p className="text-muted-foreground mt-2">One task. One day. Real progress.</p>
        </div>

        {!emailSent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-card border-border"
                  autoFocus
                />
              </div>
            </div>

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
                  Get Magic Link
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              No password needed. We'll send you a link to sign in instantly.
            </p>
          </form>
        ) : (
          <div className="text-center space-y-6 p-8 bg-card rounded-xl border border-border">
            <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Check your inbox</h2>
              <p className="text-muted-foreground">
                We sent a magic link to <span className="text-foreground font-medium">{email}</span>
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setEmailSent(false)}
              className="mt-4"
            >
              Use a different email
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
