"use client"

import * as React from "react"
import { useBuilder } from "@/app/dashboard/resumes/[id]/builder-context"
import { ZoomIn, ZoomOut, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PaginatedPreview } from "./paginated-preview"

export function PreviewCanvas() {
  const { data, zoom, setZoom } = useBuilder()
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <div className="flex-1 bg-muted/30" />

  return (
    <div className="flex-1 bg-muted/30 relative overflow-hidden flex flex-col h-full text-black">
      <div className="flex-1 overflow-auto scrollbar-hide">
        <PaginatedPreview data={data} zoom={zoom} />
      </div>

      {/* Zoom Toolbar */}
      <div className="absolute lg:bottom-6 bottom-20 left-1/2 lg:-translate-x-1/2 -translate-x-1/2 bg-background/80 text-foreground backdrop-blur-md border rounded-full px-4 h-10 flex items-center gap-4 shadow-xl z-20">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => setZoom(Math.max(25, zoom - 10))}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-xs font-medium min-w-[3ch]">{zoom}%</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => setZoom(Math.min(200, zoom + 10))}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-4" />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => setZoom(100)}
        >
          <Maximize className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
