import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const HeroSection = () => {
  const { user, loading, signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up">
          Stop overthinking.{" "}
          <span className="text-gradient-primary">Start finishing.</span>
        </h1>

        {/* Subheadline - concrete explanation */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          DOLT gives you one high-impact task each day so you actually make progress.
        </p>

        {/* Process Steps - the "what actually happens" */}
        <div 
          className="max-w-lg mx-auto mb-12 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="bg-card/50 border border-border rounded-xl p-6 backdrop-blur-sm">
            <div className="flex flex-col gap-4 text-left">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-sm">1</span>
                <p className="text-foreground">You tell us your goal.</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-sm">2</span>
                <p className="text-foreground">We choose the next step.</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-sm">3</span>
                <p className="text-foreground">You do it. Momentum builds.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analogy - mental model */}
        <p className="text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '0.25s' }}>
          Think <span className="text-primary font-medium">Duolingo</span>, but for real-life progress.
        </p>

        {/* CTA Buttons - conditional based on auth state */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          {loading ? (
            <div className="h-12 w-64 bg-muted/50 rounded-lg animate-pulse" />
          ) : user ? (
            <>
              <Button variant="hero" size="lg" className="group">
                Start your first task — $15/month
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-accent text-sm font-medium">
                Only 100 spots available
              </p>
            </>
          ) : (
            <Button 
              variant="hero" 
              size="lg" 
              className="group flex items-center gap-3"
              onClick={handleGoogleSignIn}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;