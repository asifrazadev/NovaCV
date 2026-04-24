"use client"

import * as React from "react"
import { ResumeData, defaultResumeData } from "@/types/resume"
import { ZoomIn, ZoomOut, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PaginatedPreview } from "@/components/builder/paginated-preview"
import { Sparkles } from "lucide-react"

// Ensure we have deepMerge to hydrate any missing DB fields
function deepMerge(target: any, source: any) {
  const result = { ...target }
  if (!source) return result

  Object.keys(source).forEach(key => {
    const targetVal = target[key]
    const sourceVal = source[key]

    if (sourceVal && typeof sourceVal === 'object' && !Array.isArray(sourceVal)) {
      result[key] = deepMerge(targetVal || {}, sourceVal)
    } else if (Array.isArray(sourceVal)) {
      if (sourceVal.length === 0 && targetVal && typeof targetVal === 'object' && !Array.isArray(targetVal)) {
        result[key] = targetVal
      } else {
        result[key] = sourceVal
      }
    } else {
      result[key] = sourceVal
    }
  })
  return result
}

export function PublicViewer({ initialData }: { initialData: any }) {
  const [zoom, setZoom] = React.useState(100)
  const [isClient, setIsClient] = React.useState(false)

  const data = React.useMemo<ResumeData>(() => {
    return deepMerge(defaultResumeData, initialData)
  }, [initialData])

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <div className="flex-1 bg-muted/30 h-screen" />

  return (
    <div className="flex-1 bg-muted/30 relative overflow-hidden flex flex-col h-screen text-black">
      {/* Top Banner */}
      <div className="w-full bg-background border-b h-14 flex items-center justify-between px-6 z-10 shrink-0">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Sparkles className="h-4 w-4" />
          <span>NovaCV</span>
        </div>
        <a 
          href="/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-1.5 rounded-full transition-colors"
        >
          Build your own resume
        </a>
      </div>

      <div className="flex-1 overflow-auto scrollbar-hide py-8">
        <PaginatedPreview data={data} zoom={zoom} />
      </div>

      {/* Zoom Toolbar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-md border rounded-full px-4 h-10 flex items-center gap-4 shadow-xl z-20">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full dark:text-white"
          onClick={() => setZoom(Math.max(25, zoom - 10))}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-xs font-medium min-w-[3ch] dark:text-white">{zoom}%</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full dark:text-white"
          onClick={() => setZoom(Math.min(200, zoom + 10))}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-4 dark:bg-white/20" />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full dark:text-white"
          onClick={() => setZoom(100)}
        >
          <Maximize className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
