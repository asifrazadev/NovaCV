"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronRight, Home, Layout, Share2, Download, History, Monitor, Smartphone, Cloud, Check, FileJson, FileText, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useBuilder } from "@/app/dashboard/resumes/[id]/builder-context"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { exportResumeToPDF } from "@/lib/export-pdf"
import { toast } from "sonner"
import { ShareDialog } from "./share-dialog"
import { ImportDialog } from "./import-dialog"
import { MobileBuilderNav } from "./mobile-nav"

export function BuilderHeader() {
  const { data, setData, title, setTitle, isSaving, resumeId, mobileView, setMobileView } = useBuilder()
  const [isExporting, setIsExporting] = React.useState(false)

  const handleExportPDF = async () => {
    setIsExporting(true)
    const success = await exportResumeToPDF(resumeId, `${title || "resume"}.pdf`)
    if (success) {
      toast.success("Resume exported successfully!")
    } else {
      toast.error("Failed to export resume. Please try again.")
    }
    setIsExporting(false)
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
    } catch (e) {
      toast.error("Failed to export backup.")
    }
  }

  return (
    <header className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <MobileBuilderNav />
        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
          <Home className="w-4 h-4" />
        </Link>
        <Separator orientation="vertical" className="h-4 hidden sm:block" />
        <div className="flex items-center gap-2 text-sm max-w-[200px] sm:max-w-none">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground hidden sm:block">Resumes</Link>
          <ChevronRight className="w-3 h-3 text-muted-foreground hidden sm:block" />
          <input
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            className="font-semibold bg-transparent border-none focus:ring-0 focus:outline-none focus:bg-muted/30 rounded px-1 -ml-1 hover:bg-muted/20 transition-colors w-full"
            placeholder="No Title"
          />

          <div className="hidden sm:flex items-center gap-1.5 ml-4 px-2 py-0.5 rounded-full bg-muted/50 text-[11px] font-medium text-muted-foreground shrink-0">
            {isSaving ? (
              <>
                <Cloud className="w-3 h-3 animate-pulse text-blue-500" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Check className="w-3 h-3 text-green-500" />
                <span>Saved</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden lg:flex items-center gap-2">
          <ImportDialog />
          <ShareDialog />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="gap-2 bg-blue-600 hover:bg-blue-700 min-w-[100px] hidden lg:flex"
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <Cloud className="h-4 w-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={handleExportPDF} className="gap-2 cursor-pointer font-medium">
              <FileText className="h-4 w-4 text-rose-500" />
              <span>Export as PDF</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExportBackup(".novacv")} className="gap-2 cursor-pointer">
              <FileJson className="h-4 w-4 text-blue-500" />
              <div className="flex flex-col">
                <span>Export Backup (.novacv)</span>
                <span className="text-[10px] text-muted-foreground">NovaCV Proprietary Format</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExportBackup(".json")} className="gap-2 cursor-pointer">
              <FileJson className="h-4 w-4 text-emerald-500" />
              <div className="flex flex-col">
                <span>Export Backup (.json)</span>
                <span className="text-[10px] text-muted-foreground">Standard JSON Format</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
