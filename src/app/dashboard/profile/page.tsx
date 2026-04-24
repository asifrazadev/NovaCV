import { createClient } from "@/utils/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle } from "lucide-react"

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const fullName = user?.user_metadata?.full_name || ""
  const email = user?.email || ""
  const isEmailVerified = !!user?.email_confirmed_at
  const username = email.split('@')[0] || ""

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your public and personal profile information.</p>
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden bg-card/50 !pt-0 backdrop-blur-sm">
        <CardHeader className="bg-muted/30 py-4">
          <CardTitle className="text-xl">Personal Details</CardTitle>
          <CardDescription>Update your photo and personal details here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={fullName} placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground text-sm font-medium">@</span>
                <Input id="username" defaultValue={username} className="pl-7 bg-muted/20" disabled />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input id="email" defaultValue={email} disabled className="pr-24" />
              <div className="absolute right-2 top-1.5">
                {isEmailVerified ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-none gap-1 py-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-none gap-1 py-0.5">
                    <XCircle className="w-3 h-3" />
                    Unverified
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Professional Title</Label>
            <Input id="title" placeholder="e.g. Senior Software Engineer" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              placeholder="Briefly describe your professional background and goals..."
              className="flex min-h-[140px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:border-primary/50"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Discard</Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 px-8">
          Save Changes
        </Button>
      </div>
    </div>
  )
}
