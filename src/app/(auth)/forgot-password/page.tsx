import { forgotPassword } from '@/actions/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormMessageToast } from '@/components/form-message-toast'

export default async function ForgotPasswordPage(props: { searchParams: Promise<{ message: string }> }) {
  const searchParams = await props.searchParams

  return (
    <div className="flex min-h-[100dvh] bg-background">
      {/* ── Left branding panel ── */}
      <div className="hidden lg:flex w-[55%] bg-primary dark:bg-primary-dark flex-col justify-between p-12 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary to-primary-dark -z-0" />

        <div className="relative z-10 flex items-center font-bold text-3xl tracking-tighter">
          NovaCV<span className="text-blue-200">.</span>
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <h1 className="text-8xl font-black tracking-tighter leading-tight">
            Reset
          </h1>
          <p className="text-3xl text-primary-foreground/80 font-medium leading-relaxed opacity-90">
            Don&apos;t worry, it happens to the best of us.
          </p>
        </div>

        <div className="relative z-10 text-sm text-blue-200/60 font-medium">
          © {new Date().getFullYear()} NovaCV. Built for developers.
        </div>

        {/* Decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-white/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-400/20 blur-[100px]" />
      </div>

      {/* ── Right form pane ── */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center items-center py-12 px-6 sm:px-8 relative">
        <div className="lg:hidden mb-3 z-20  w-full flex items-center justify-center font-bold text-3xl tracking-widest">
          NovaCV<span className="text-primary">.</span>
        </div>

        <div className="w-full max-w-md space-y-8 bg-card text-card-foreground p-8 sm:p-10 rounded-2xl shadow-xl border border-border/50 backdrop-blur-sm relative z-10">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">Forgot your password?</h2>
            <p className="text-sm text-muted-foreground">Enter your email and we&apos;ll send you a link to reset it</p>
          </div>

          <form action={forgotPassword} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-bold text-foreground">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  autoComplete="email"
                  className="h-12 bg-muted/50 border-border/50 focus:bg-background transition-all"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 transition-all shadow-md shadow-primary/10">
              Send Reset Link
            </Button>

            {searchParams?.message && (
              <FormMessageToast message={searchParams.message} />
            )}
          </form>

          <div className="flex justify-center items-center mt-6">
            <p className="text-sm text-muted-foreground mr-1">Remembered your password?</p>
            <Link href="/login" className="text-sm font-semibold text-primary hover:text-primary-dark">
              Go back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
