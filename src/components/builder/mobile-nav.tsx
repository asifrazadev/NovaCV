"use client"

import * as React from "react"
import { Menu, X, Share2, Download, Import, Layout, Eye, PenLine } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useBuilder } from "@/app/dashboard/resumes/[id]/builder-context"
import { sections, utilities, design } from "./sidebar-rail"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ImportDialog } from "./import-dialog"
import { ShareDialog } from "./share-dialog"

import { exportResumeToPDF } from "@/lib/export-pdf"
import { toast } from "sonner"
import { FileText, FileJson, Cloud } from "lucide-react"

export function MobileBuilderNav() {
  const { 
    activeSection, 
    setActiveSection, 
    mobileView, 
    setMobileView, 
    data,
    title,
    resumeId
  } = useBuilder()
  const [open, setOpen] = React.useState(false)
  const [isExporting, setIsExporting] = React.useState(false)

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    setMobileView("editor") // Switch to editor when a section is picked
    setOpen(false)
  }

  const handleExportPDF = async () => {
    setIsExporting(true)
    const success = await exportResumeToPDF(resumeId, `${title || "resume"}.pdf`)
    if (success) {
      toast.success("Resume exported successfully!")
    } else {
      toast.error("Failed to export resume. Please try again.")
    }
    setIsExporting(false)
    setOpen(false)
  }

  const handleExportBackup = (extension: ".json" | ".novacv") => {
    try {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${title || "resume"}${extension}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success(`Backup exported successfully as ${extension}!`)
      setOpen(false)
    } catch (e) {
      toast.error("Failed to export backup.")
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0 flex flex-col">
        <SheetHeader className="p-4 border-b text-left">
          <SheetTitle className="text-lg font-bold">NovaCV Menu</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* View Switching */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Editor View</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={mobileView === "editor" ? "default" : "outline"} 
                  size="sm" 
                  className="gap-2 h-9"
                  onClick={() => { setMobileView("editor"); setOpen(false); }}
                >
                  <PenLine className="w-4 h-4" />
                  Edit
                </Button>
                <Button 
                  variant={mobileView === "preview" ? "default" : "outline"} 
                  size="sm" 
                  className="gap-2 h-9"
                  onClick={() => { setMobileView("preview"); setOpen(false); }}
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <ImportDialog 
                  trigger={
                    <Button variant="outline" size="sm" className="gap-2 h-9 text-xs">
                      <Import className="w-4 h-4" />
                      Import
                    </Button>
                  } 
                />
                <ShareDialog 
                  trigger={
                    <Button variant="outline" size="sm" className="gap-2 h-9 text-xs">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  }
                />
              </div>
            </div>

            <Separator />

            {/* Exports */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Exports</h4>
              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="justify-start gap-2 h-9 text-xs"
                  onClick={handleExportPDF}
                  disabled={isExporting}
                >
                  <FileText className="w-4 h-4 text-rose-500" />
                  {isExporting ? "Generating PDF..." : "Export as PDF"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="justify-start gap-2 h-9 text-xs"
                  onClick={() => handleExportBackup(".novacv")}
                >
                  <FileJson className="w-4 h-4 text-blue-500" />
                  Export .novacv Backup
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="justify-start gap-2 h-9 text-xs"
                  onClick={() => handleExportBackup(".json")}
                >
                  <FileJson className="w-4 h-4 text-emerald-500" />
                  Export .json Backup
                </Button>
              </div>
            </div>

            <Separator />

            {/* Resume Sections */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Resume Sections</h4>
              <div className="grid grid-cols-2 gap-2">
                {sections.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "justify-start gap-2 h-9 px-2 text-xs",
                      activeSection === item.id ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30" : "text-muted-foreground"
                    )}
                    onClick={() => handleSectionClick(item.id)}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    <span className="truncate">{item.label}</span>
                  </Button>
                ))}
              </div>
            </div>

             <Separator />

            {/* Utilities */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Utilities</h4>
              <div className="grid grid-cols-1 gap-2">
                {utilities.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "justify-start gap-2 h-9 px-2 text-xs",
                      activeSection === item.id ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30" : "text-muted-foreground"
                    )}
                    onClick={() => handleSectionClick(item.id)}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    <span className="truncate">{item.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Design */}
            <div className="space-y-3 pb-8">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Design & Settings</h4>
              <div className="grid grid-cols-2 gap-2">
                {design.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "justify-start gap-2 h-9 px-2 text-xs",
                      activeSection === item.id ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30" : "text-muted-foreground"
                    )}
                    onClick={() => handleSectionClick(item.id)}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    <span className="truncate">{item.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
