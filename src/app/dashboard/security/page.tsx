import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GitBranch, Mail, ShieldCheck } from "lucide-react"
import { createClient } from "@/utils/supabase/server"
import { resetPassword } from "@/actions/auth"
import { FormMessageToast } from "@/components/form-message-toast"
import { PasswordInput } from "@/components/ui/password-input"

export default async function SecurityPage(props: { searchParams: Promise<{ message: string }> }) {
  const searchParams = await props.searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const providers = user?.identities?.map(id => id.provider) || []
  const isGoogleConnected = providers.includes('google')
  const isGithubConnected = providers.includes('github')

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Authentication</h1>
        <p className="text-muted-foreground mt-2">Manage your connected social accounts and password configuration.</p>
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardHeader className="bg-muted/30 py-4 border-b">
          <CardTitle className="text-xl">Connected Socials</CardTitle>
          <CardDescription>Link social accounts so you can log in with one click.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-col gap-3">
            <Button variant="outline" className={`w-full justify-start h-12 ${isGoogleConnected ? 'bg-green-500/5 border-green-500/20' : ''}`} disabled={isGoogleConnected}>
              <Mail className={`mr-3 h-5 w-5 ${isGoogleConnected ? 'text-green-500' : 'text-blue-500'}`} />
              {isGoogleConnected ? 'Connected with Google' : 'Connect Google Account'}
              {isGoogleConnected && (
                <span className="ml-auto text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Active
                </span>
              )}
            </Button>
            
            <Button variant="outline" className={`w-full justify-start h-12 ${isGithubConnected ? 'bg-green-500/5 border-green-500/20' : ''}`} disabled={isGithubConnected}>
              <GitBranch className={`mr-3 h-5 w-5 ${isGithubConnected ? 'text-green-500' : ''}`} />
              {isGithubConnected ? 'Connected with GitHub' : 'Connect GitHub Account'}
              {isGithubConnected && (
                <span className="ml-auto text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Active
                </span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardHeader className="bg-muted/30 py-4 border-b">
          <CardTitle className="text-xl">Change Password</CardTitle>
          <CardDescription>
            {providers.length > 0 && !user?.email_confirmed_at 
              ? "Set a password to enable email-based login alongside your social account."
              : "Update your password regularly to keep your account secure."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form action={resetPassword} className="space-y-4">
            <input type="hidden" name="redirectTo" value="/dashboard/security" />
            
            <div className="grid gap-4">
              {providers.includes('email') && (
                <div className="space-y-2">
                  <Label htmlFor="old_password">Current Password</Label>
                  <PasswordInput 
                    id="old_password" 
                    name="old_password" 
                    placeholder="••••••••"
                    required
                    className="bg-muted/20 border-border/50"
                  />
                </div>
              )}
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <PasswordInput 
                    id="password" 
                    name="password" 
                    placeholder="••••••••"
                    required
                    className="bg-muted/20 border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Confirm New Password</Label>
                  <PasswordInput 
                    id="confirm_password" 
                    name="confirm_password" 
                    placeholder="••••••••"
                    required
                    className="bg-muted/20 border-border/50"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-2 border-t mt-4">
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Update Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {searchParams?.message && (
        <FormMessageToast message={searchParams.message} />
      )}
    </div>
  )
}
