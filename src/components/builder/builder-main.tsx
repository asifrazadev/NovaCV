"use client"

import * as React from "react"
import { useBuilder } from "@/app/dashboard/resumes/[id]/builder-context"
import { SidebarRail } from "./sidebar-rail"
import { SidebarPanel } from "./sidebar-panel"
import { PreviewCanvas } from "./preview-canvas"
import { cn } from "@/lib/utils"
import { PaginatedPreview } from "./paginated-preview"

export function BuilderMain() {
  const { mobileView } = useBuilder()

  return (
    <main className="flex-1 flex overflow-hidden relative">
      {/* Sidebar Rail (Always hidden or shown based on your preference, usually sidebar-rail is for desktop nav) */}
      <div className={cn(
        "flex shrink-0",
        "hidden lg:flex" // Hide rail on mobile for more space
      )}>
        <SidebarRail />
      </div>

      {/* Editor Panel */}
      <div className={cn(
        "flex-1 lg:flex-none",
        mobileView === "editor" ? "flex" : "hidden lg:flex"
      )}>
        <SidebarPanel />
      </div>

      {/* Preview Canvas */}
      <div className={cn(
        "flex-1 bg-muted/30 overflow-hidden",
        mobileView === "preview" ? "flex " : "hidden lg:flex"
      )}>
        <PreviewCanvas />
      </div>
    </main>
  )
}
