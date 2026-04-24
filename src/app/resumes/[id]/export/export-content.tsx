"use client"

import React, { useState, useLayoutEffect, useRef } from "react"
import { ResumeData } from "@/types/resume"
import { getTemplate } from "@/templates"
import { PageContent } from "@/templates/modern"

interface ExportContentProps {
  data: ResumeData
}

const PAGE_SIZES: Record<string, { width: number; height: number }> = {
  a4: { width: 210, height: 297 },
  letter: { width: 215.9, height: 279.4 },
  legal: { width: 215.9, height: 355.6 },
  executive: { width: 184.15, height: 266.7 },
}

export function ExportContent({ data }: ExportContentProps) {
  const SelectedTemplate = getTemplate(data.metadata?.template || "modern").component
  const measureRef = useRef<HTMLDivElement>(null)
  const [pages, setPages] = useState<PageContent[]>([])

  useLayoutEffect(() => {
    if (!measureRef.current) return

    const container = measureRef.current
    const { format, width: customWidth, height: customHeight, padding: paddingMm } = data.metadata.page || {}
    
    // Get dimensions in mm
    const standardSize = PAGE_SIZES[format.toLowerCase()]
    const widthMm = format === "custom" ? (customWidth || 210) : (standardSize?.width || 210)
    const heightMm = format === "custom" ? (customHeight || 297) : (standardSize?.height || 297)
    
    // Convert to pixels (96dpi)
    const pageHeightPx = heightMm * 3.78
    const paddingPx = (paddingMm ?? 20) * 3.78
    const availableHeight = pageHeightPx - (paddingPx * 2)

    // 1. Get layout information
    const defaultLayout = { 
      main: ["summary", "experience", "education", "projects", "volunteer", "publications", "references"], 
      sidebar: ["skills", "languages", "interests", "awards", "certifications", "profiles"] 
    }
    const rawLayout = (data.metadata as any).layout
    const layout = {
      main: (rawLayout?.main && Array.isArray(rawLayout.main)) ? rawLayout.main : defaultLayout.main,
      sidebar: (rawLayout?.sidebar && Array.isArray(rawLayout.sidebar)) ? rawLayout.sidebar : defaultLayout.sidebar
    }

    const pagesList: PageContent[] = [{
      main: [],
      sidebar: [],
      showHeader: true,
      showFooter: true
    }]
    
    // Helper to get element by section ID from measurement container
    const getSectionEl = (id: string) => container.querySelector(`[data-section-id="${id}"]`) as HTMLElement

    // Calculate Header Height
    const header = container.querySelector("header")
    const headerHeight = header ? header.getBoundingClientRect().height + 32 : 0

    // 2. Process Columns
    const isSingleColumn = data.metadata.template === "jake"
    const mainHeights = [headerHeight]
    const sidebarHeights = [headerHeight]

    if (isSingleColumn) {
      const allSections = [...layout.main, ...layout.sidebar]
      allSections.forEach((sectionId: string) => {
        const el = getSectionEl(sectionId)
        if (!el) return
        const h = el.getBoundingClientRect().height
        
        let placed = false
        for (let i = 0; i < mainHeights.length; i++) {
          if (mainHeights[i] + h <= availableHeight) {
            if (!pagesList[i]) pagesList[i] = { main: [], sidebar: [], showHeader: i === 0, showFooter: true }
            pagesList[i].main.push({ id: sectionId })
            mainHeights[i] += h + 32
            placed = true
            break
          }
        }

        if (!placed) {
          const nextIdx = mainHeights.length
          pagesList[nextIdx] = { main: [{ id: sectionId }], sidebar: [], showHeader: false, showFooter: true }
          mainHeights[nextIdx] = h + 32
          sidebarHeights[nextIdx] = 0
        }
      })
    } else {
      // 2-Column Logic
      // Fill Main
      layout.main.forEach((sectionId: string) => {
        const el = getSectionEl(sectionId)
        if (!el) return
        const h = el.getBoundingClientRect().height
        
        let placed = false
        for (let i = 0; i < mainHeights.length; i++) {
          if (mainHeights[i] + h <= availableHeight) {
            if (!pagesList[i]) pagesList[i] = { main: [], sidebar: [], showHeader: i === 0, showFooter: true }
            pagesList[i].main.push({ id: sectionId })
            mainHeights[i] += h + 32
            placed = true
            break
          }
        }

        if (!placed) {
          const nextIdx = mainHeights.length
          pagesList[nextIdx] = { main: [{ id: sectionId }], sidebar: [], showHeader: false, showFooter: true }
          mainHeights[nextIdx] = h + 32
          sidebarHeights[nextIdx] = 0
        }
      })

      // Fill Sidebar Greedily
      layout.sidebar.forEach((sectionId: string) => {
        const el = getSectionEl(sectionId)
        if (!el) return
        const h = el.getBoundingClientRect().height

        let placed = false
        for (let i = 0; i < pagesList.length || i < 1; i++) {
          const currentH = sidebarHeights[i] ?? 0
          if (currentH + h <= availableHeight) {
            if (!pagesList[i]) pagesList[i] = { main: [], sidebar: [], showHeader: i === 0, showFooter: true }
            pagesList[i].sidebar.push({ id: sectionId })
            sidebarHeights[i] = (sidebarHeights[i] ?? 0) + h + 32
            placed = true
            break
          }
        }

        if (!placed) {
          const nextIdx = pagesList.length
          pagesList[nextIdx] = { main: [], sidebar: [{ id: sectionId }], showHeader: false, showFooter: true }
          sidebarHeights[nextIdx] = h + 32
          mainHeights[nextIdx] = 0
        }
      })
    }

    const finalPages = pagesList.filter(p => p.main.length > 0 || p.sidebar.length > 0)
    setPages(finalPages)
  }, [data])

  const { format, width: customWidth, height: customHeight } = data.metadata.page || {}
  const standardSize = PAGE_SIZES[format?.toLowerCase()]
  const widthMm = format === "custom" ? (customWidth || 210) : (standardSize?.width || 210)
  const heightMm = format === "custom" ? (customHeight || 297) : (standardSize?.height || 297)

  return (
    <div id="resume-export-container">
      {/* Hidden measurement container */}
      <div 
        ref={measureRef}
        className="absolute -left-[10000px] top-0 pointer-events-none bg-white overflow-hidden"
        style={{ width: `${widthMm}mm`, padding: `${data.metadata.page?.padding ?? 20}mm` }}
      >
        {SelectedTemplate && <SelectedTemplate data={data} />}
      </div>

      {/* Pages rendered sequentially for PDF capture */}
      {pages.map((content, index) => (
        <div
          key={index}
          className="resume-page bg-white relative overflow-hidden"
          style={{
            width: `${widthMm}mm`,
            height: `${heightMm}mm`,
            padding: `${data.metadata.page?.padding ?? 20}mm`,
          }}
        >
          {SelectedTemplate && <SelectedTemplate data={data} content={content} />}
        </div>
      ))}
    </div>
  )
}
