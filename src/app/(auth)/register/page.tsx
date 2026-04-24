import { signup, signInWithProvider } from '@/actions/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Label } from '@/components/ui/label'
import { FormMessageToast } from '@/components/form-message-toast'
import { RegistrationSuccessModal } from '@/components/registration-success-modal'

export default async function RegisterPage(props: { searchParams: Promise<{ message: string, status?: string }> }) {
  const searchParams = await props.searchParams

  return (
    <div className="flex h-dvh bg-background">
      {/* ── Left branding panel ── */}
      <div className="hidden lg:flex w-[55%] bg-blue-600 dark:bg-blue-700 flex-col justify-between p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-blue-600 to-blue-500 -z-0" />
        
        <div className="relative z-10 flex items-center font-bold text-3xl tracking-tighter">
          NovaCV<span className="text-blue-200">.</span>
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <h1 className="text-8xl font-black tracking-tighter leading-tight">
            Join Us
          </h1>
          <p className="text-3xl text-blue-100 font-medium leading-relaxed opacity-90">
            Start your journey towards the perfect career.
          </p>
        </div>

        <div className="relative z-10 text-sm text-blue-200/60 font-medium">
          © {new Date().getFullYear()} NovaCV. Built for developers.
        </div>

        {/* Decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-white/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[100px]" />
      </div>

      {/* ── Right form pane ── */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center items-center py-12 px-6 sm:px-8 relative">
        <div className="lg:hidden absolute top-8 left-0 w-full flex items-center justify-center font-bold text-3xl tracking-widest">
          NovaCV<span className="text-blue-500">.</span>
        </div>
        
        <div className="w-full max-w-md space-y-8 bg-card text-card-foreground p-8 sm:p-10 rounded-2xl shadow-xl border border-border/50 backdrop-blur-sm relative z-10">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">Create an account</h2>
            <p className="text-sm text-muted-foreground">Join NovaCV to start building your professional resume</p>
          </div>

          <form action={signup} className="space-y-6 relative ">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-name" className="text-sm font-bold text-foreground">Full Name</Label>
                <Input
                  id="reg-name"
                  name="full_name"
                  type="text"
                  placeholder="John Doe"
                  required
                  autoComplete="name"
                  className="h-12 bg-muted/50 border-border/50 focus:bg-background transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email" className="text-sm font-bold text-foreground">Email Address</Label>
                <Input
                  id="reg-email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  autoComplete="email"
                  className="h-12 bg-muted/50 border-border/50 focus:bg-background transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-password" className="text-sm font-bold text-foreground">Password</Label>
                <PasswordInput
                  id="reg-password"
                  name="password"
                  placeholder="••••••••"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="h-12 bg-muted/50 border-border/50 focus:bg-background transition-all"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 transition-all shadow-md shadow-primary/10">
              Create account
            </Button>

            {searchParams?.message && (
              <FormMessageToast message={searchParams.message} />
            )}
            
            <RegistrationSuccessModal status={searchParams?.status} />
          </form>

{/*           <form action={signInWithProvider} className="space-y-4 lg:space-y-0 lg:flex text-xs gap-2">
            <Button type="submit" name="provider" value="google" variant="outline" className="w-full lg:w-1/2 bg-blue-50/50 hover:bg-blue-50 text-blue-900 border-blue-100 font-semibold h-10 dark:bg-blue-950/20 dark:text-blue-100 dark:border-blue-900">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </Button>

            <Button type="submit" name="provider" value="github" variant="outline" className="w-full lg:w-1/2 h-10 font-medium">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Continue with GitHub
            </Button>
          </form> */}


          <div className="flex justify-center items-center mt-6">
            <p className="text-sm text-muted-foreground mr-1">Already have an account?</p>
            <Link href="/login" className="text-sm font-semibold text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
