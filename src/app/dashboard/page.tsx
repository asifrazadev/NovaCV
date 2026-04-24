"use client"

import * as React from "react"
import { Plus, FileUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateResumeDialog } from "@/components/dashboard/create-resume-dialog"
import { ImportResumeDialog } from "@/components/dashboard/import-resume-dialog"
import { LinkedInSyncDialog } from "@/components/dashboard/linkedin-sync-dialog"
import { Badge } from "@/components/ui/badge"
import { getResumes } from "@/app/dashboard/resumes/actions"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ResumeCardOptions } from "@/components/dashboard/resume-card-options"

export default function ResumePage() {
  const [createOpen, setCreateOpen] = React.useState(false)
  const [importOpen, setImportOpen] = React.useState(false)
  const [linkedinOpen, setLinkedinOpen] = React.useState(false)
  const [resumes, setResumes] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const loadResumes = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getResumes()
      setResumes(data)
    } catch (error) {
      console.error("Failed to load resumes:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadResumes()
  }, [loadResumes])

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          Your Resumes
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Start building your next career move. Choose a method below to get started with our AI-powered editor.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Option 1: Create from scratch */}
        <Card
          onClick={() => setCreateOpen(true)}
          className="relative group overflow-hidden border-border/50 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Create from scratch</CardTitle>
            <CardDescription className="text-sm">
              Start with a blank slate and build your resume section by section with real-time AI guidance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full justify-between hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              Start fresh
              <Plus className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Option 2: Import Resume */}
        <Card
          onClick={() => setImportOpen(true)}
          className="relative group overflow-hidden border-border/50 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
              <FileUp className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Import your resume</CardTitle>
            <CardDescription className="text-sm">
              Upload an existing PDF or JSON file. Our AI will automatically parse and categorize your experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full justify-between hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              Upload file
              <FileUp className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Option 3: LinkedIn Import */}
        <Card
          onClick={() => setLinkedinOpen(true)}
          className="relative group overflow-hidden border-border/50 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
              <img src="/svg/linkedin.svg" alt="LinkedIn" className="w-6 h-6 object-contain" />
            </div>
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-xl">Import from LinkedIn</CardTitle>
              <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border-none h-5 px-1.5 py-0">
                Coming Soon
              </Badge>
            </div>
            <CardDescription className="text-sm">
              Connect your LinkedIn profile to instantly sync your work history, skills, and endorsements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full justify-between hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              Sync profile
              <img src="/svg/linkedin.svg" alt="" className="w-4 h-4 brightness-0 invert opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <CreateResumeDialog open={createOpen} onOpenChange={setCreateOpen} />
      <ImportResumeDialog open={importOpen} onOpenChange={setImportOpen} />
      <LinkedInSyncDialog open={linkedinOpen} onOpenChange={setLinkedinOpen} />

      {/* Recent Work Section */}
      <div className="mt-8 pt-8 border-t border-border/40">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Recent Work</h2>
          <Button variant="link" className="text-primary">View all</Button>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse bg-muted/20 h-64 border-border/50" />
            ))}
          </div>
        ) : resumes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 rounded-xl border border-dashed border-border group hover:border-primary/20 transition-colors">
            <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4 text-muted-foreground group-hover:text-primary/50 transition-colors">
              <FileUp className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-foreground/80 mb-1">No resumes found</h3>
            <p className="text-sm text-muted-foreground text-center">
              You haven't created any resumes yet. Start fresh or import one to see it here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <Card key={resume.id} className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 bg-card/50 backdrop-blur-sm">
                <CardHeader className="p-0">
                  <div className="h-40 bg-muted/30 relative flex items-center justify-center overflow-hidden border-b">
                    <div className="w-24 h-32 bg-white dark:bg-zinc-800 shadow-lg rounded-sm transform scale-90 group-hover:scale-95 transition-transform duration-300 p-2 flex flex-col gap-1 ring-1 ring-black/5">
                      <div className="w-full h-2 bg-primary/10 rounded" />
                      <div className="w-3/4 h-1 bg-slate-100 dark:bg-zinc-700/50 rounded" />
                      <div className="w-1/2 h-1 bg-slate-100 dark:bg-zinc-700/50 rounded" />
                      <div className="mt-2 w-full h-1 bg-slate-50 dark:bg-zinc-700/20 rounded" />
                      <div className="w-full h-1 bg-slate-50 dark:bg-zinc-700/20 rounded" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex flex-grow flex-col">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-lg line-clamp-1">{resume.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] font-normal uppercase tracking-wider text-muted-foreground">Resume</Badge>
                      <ResumeCardOptions 
                        resumeId={resume.id} 
                        resumeTitle={resume.title} 
                        onDeleteSuccess={loadResumes} 
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">
                    Last edited {formatDistanceToNow(new Date(resume.updated_at))} ago
                  </p>
                  <Button asChild variant="secondary" className="w-full bg-primary/10 hover:bg-primary/20 text-primary border-none transition-colors">
                    <Link href={`/dashboard/resumes/${resume.id}`}>Edit Resume</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

