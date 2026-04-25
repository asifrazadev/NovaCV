import { createClient } from "@/utils/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, User, Mail, Briefcase, FileText } from "lucide-react"
import { updateEmail, updateProfileMetadata } from "@/actions/auth"
import { FormMessageToast } from "@/components/form-message-toast"

export default async function ProfilePage(props: { searchParams: Promise<{ message: string }> }) {
  const searchParams = await props.searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const fullName = user?.user_metadata?.full_name || ""
  const title = user?.user_metadata?.professional_title || ""
  const bio = user?.user_metadata?.bio || ""
  const email = user?.email || ""
  const isEmailVerified = !!user?.email_confirmed_at
  const username = email.split('@')[0] || ""

  return (
    <div className="flex flex-col gap-6 max-w-2xl pb-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your public and personal profile information.</p>
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardHeader className="bg-muted/30 py-4 border-b">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <CardTitle className="text-xl">Personal Details</CardTitle>
          </div>
          <CardDescription>Update your photo and personal details here.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form action={updateProfileMetadata} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input 
                  id="full_name" 
                  name="full_name" 
                  defaultValue={fullName} 
                  placeholder="Your name" 
                  className="bg-muted/20 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground text-sm font-medium">@</span>
                  <Input id="username" defaultValue={username} className="pl-7 bg-muted/40" disabled />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Professional Title
              </Label>
              <Input 
                id="title" 
                name="title" 
                defaultValue={title}
                placeholder="e.g. Senior Software Engineer" 
                className="bg-muted/20 border-border/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Bio
              </Label>
              <textarea
                id="bio"
                name="bio"
                defaultValue={bio}
                placeholder="Briefly describe your professional background and goals..."
                className="flex min-h-[140px] w-full rounded-md border border-border/50 bg-muted/20 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:border-primary/50"
              />
            </div>

            <div className="flex justify-end pt-2 border-t mt-4">
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Save Profile Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-border/50 shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardHeader className="bg-muted/30 py-4 border-b">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            <CardTitle className="text-xl">Email Address</CardTitle>
          </div>
          <CardDescription>Changing your email will require confirmation on both addresses.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form action={updateEmail} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input 
                  id="email" 
                  name="email" 
                  defaultValue={email} 
                  className="pr-24 bg-muted/20 border-border/50" 
                />
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

            <div className="flex justify-end pt-2 border-t mt-4">
              <Button type="submit" variant="secondary">
                Update Email
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
