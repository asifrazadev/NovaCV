import Link from "next/link";
import { Sparkles, Zap, Layout, Download, CheckCircle, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">NovaCV<span className="text-blue-600">.</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#templates" className="hover:text-foreground transition-colors">Templates</a>
            <Link href="/login" className="hover:text-foreground transition-colors font-semibold text-foreground">Sign In</Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 shadow-lg shadow-blue-600/20">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-500/10 via-transparent to-transparent -z-10" />
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px] -z-10 animate-pulse" />
        <div className="absolute bottom-[20%] left-[-10%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[80px] -z-10" />

        <div className="container mx-auto px-6 flex flex-col items-center text-center">
          <Badge variant="secondary" className="mb-6 py-1 px-4 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 text-sm animate-in fade-in slide-in-from-bottom-2 duration-700">
            AI-Powered Resume Builder
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Standard</span> Resume In Minutes.
          </h1>
          
          <p className="text-lg md:text-xl text-foreground max-w-2xl mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Elevate your career with professionally designed resumes that stand out. AI-driven content generation, real-time preview, and pixel-perfect PDF exports.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Button size="lg" asChild className="h-14 px-10 rounded-full text-lg font-semibold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/30">
              <Link href="/register">Start Building Now <ChevronRight className="ml-2 w-5 h-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-14 px-8 rounded-full text-lg font-medium">
              <a href="https://github.com/asifrazadev/NovaCV" target="_blank" rel="noopener noreferrer">
                <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                Star on GitHub
              </a>
            </Button>
          </div>

          {/* Preview Mockup */}
          <div className="mt-20 relative w-full max-w-5xl group animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 bottom-0 h-40" />
            <div className="relative rounded-2xl border border-border/50 shadow-[0_0_50px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_0_50px_-12px_rgba(255,255,255,0.05)] overflow-hidden bg-muted/30 p-2">
              <div className="rounded-xl overflow-hidden border border-border/20 aspect-[16/9] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent" />
                <img 
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2670&auto=format&fit=crop" 
                  alt="NovaCV Interface" 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-[1.02] transition-transform duration-1000"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30 border-y border-border/10">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to land the job.</h2>
            <p className="text-lg text-foreground font-medium">NovaCV provides a comprehensive suite of tools designed to help you craft the perfect professional story.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center sm:text-left">
            <div className="p-8 rounded-3xl bg-background border border-border/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Fast & Intuitive</h3>
              <p className="text-foreground leading-relaxed">Our reactive builder updates in real-time. No more clicking refresh to see your progress.</p>
            </div>

            <div className="p-8 rounded-3xl bg-background border border-border/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Professional Layouts</h3>
              <p className="text-foreground leading-relaxed">Choose from battle-tested, ATS-friendly templates that recruiters love. Perfect alignment every time.</p>
            </div>

            <div className="p-8 rounded-3xl bg-background border border-border/50 hover:border-sky-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/5 group">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-6 text-sky-600 group-hover:scale-110 transition-transform">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Pixel-Perfect PDF</h3>
              <p className="text-foreground leading-relaxed">Export high-resolution PDFs with multi-page support and custom page formats in seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-blue-600 dark:bg-blue-700">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-white tracking-tight leading-tight">
            Ready to step up your professional game?
          </h2>
          <p className="text-xl text-blue-50 max-w-2xl mx-auto mb-10 leading-relaxed font-semibold">
            Join thousands of developers and professionals who have built their careers with NovaCV.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="h-14 px-10 rounded-full text-lg font-bold bg-white text-blue-600 hover:bg-blue-50 shadow-2xl transition-all hover:scale-105 active:scale-95">
              <Link href="/register">Create Your Resume</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-14 px-10 rounded-full text-lg font-bold border-white/40 text-white bg-transparent hover:bg-white/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95">
              <Link href="/login">View Samples</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-lg">NovaCV</span>
          </div>
          
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} NovaCV. Built for developers by <a href="https://github.com/asifrazadev" className="font-semibold hover:text-blue-600 transition-colors">Asif Raza</a>.
          </p>

          <div className="flex items-center gap-6 text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
