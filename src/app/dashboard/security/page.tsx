import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GitBranch, Mail } from "lucide-react"

export default function SecurityPage() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Authentication</h1>
        <p className="text-muted-foreground mt-2">Manage your connected social accounts and password configuration.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connected Socials</CardTitle>
          <CardDescription>Link social accounts so you can log in with one click.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3">
            <Button variant="outline" className="w-full justify-start h-12 bg-card">
              <Mail className="mr-3 h-5 w-5 text-blue-500" />
              Continue with Google
              <span className="ml-auto text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">Connected</span>
            </Button>
            <Button variant="outline" className="w-full justify-start h-12">
              <GitBranch className="mr-3 h-5 w-5" />
              Continue with GitHub
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 bg-card">
              <img src="/svg/linkedin.svg" alt="LinkedIn" className="mr-3 h-5 w-5 object-contain" />
              Continue with LinkedIn
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Setup Local Password</CardTitle>
          <CardDescription>If you signed up with a social account, you can establish a password here to login with email.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="flex justify-end pt-2">
            <Button>Save Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
