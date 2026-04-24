"use client"

import * as React from "react"
import { useBuilder } from "@/app/dashboard/resumes/[id]/builder-context"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { defaultItems } from "./sections/shared"

/* Section Components */
import { BasicsSection } from "./sections/basics-section"
import { SummarySection } from "./sections/summary-section"
import { ProfilesSection } from "./sections/profiles-section"
import { ExperienceSection } from "./sections/experience-section"
import { EducationSection } from "./sections/education-section"
import { ProjectsSection } from "./sections/projects-section"
import { AwardsSection, CertificationsSection, VolunteerSection, PublicationsSection, ReferencesSection } from "./sections/common-sections"
import { TagSections } from "./sections/tag-sections"
import { TypographySection, ThemeSection, TemplatesSection, CssSection, PageSection } from "./sections/design-sections"
import { LayoutSection } from "./sections/layout-section"
import { AnalysisSection, StatisticsSection } from "./sections/analysis-sections"

/* Map of section ids → components */
const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  basics: BasicsSection,
  summary: SummarySection,
  profiles: ProfilesSection,
  experience: ExperienceSection,
  education: EducationSection,
  projects: ProjectsSection,
  awards: AwardsSection,
  certifications: CertificationsSection,
  volunteer: VolunteerSection,
  publications: PublicationsSection,
  references: ReferencesSection,
  skills: TagSections,
  languages: TagSections,
  interests: TagSections,
  typography: TypographySection,
  theme: ThemeSection,
  templates: TemplatesSection,
  layout: LayoutSection,
  css: CssSection,
  page: PageSection,
  analysis: AnalysisSection,
  statistics: StatisticsSection,
}

/* Sections that support the "Add" button */
const ADDABLE_SECTIONS = ["experience", "education", "projects", "profiles", "awards", "certifications", "publications", "volunteer", "references", "skills", "languages", "interests"]

export function SidebarPanel() {
  const { data, activeSection, addSectionItem } = useBuilder()

  const [sidebarWidth, setSidebarWidth] = React.useState(320)
  const [isResizing, setIsResizing] = React.useState(false)

  const startResizing = React.useCallback(() => setIsResizing(true), [])
  const stopResizing = React.useCallback(() => setIsResizing(false), [])

  const resize = React.useCallback((e: MouseEvent) => {
    if (isResizing) {
      const newWidth = e.clientX - 48
      if (newWidth >= 250 && newWidth <= 600) setSidebarWidth(newWidth)
    }
  }, [isResizing])

  React.useEffect(() => {
    window.addEventListener("mousemove", resize)
    window.addEventListener("mouseup", stopResizing)
    return () => {
      window.removeEventListener("mousemove", resize)
      window.removeEventListener("mouseup", stopResizing)
    }
  }, [resize, stopResizing])

  const [isMounted, setIsMounted] = React.useState(false)
  React.useEffect(() => { setIsMounted(true) }, [])

  const SectionComponent = SECTION_COMPONENTS[activeSection]

  return (
    <div
      className="border-r bg-background flex flex-col h-full shrink-0 relative group/sidebar overflow-hidden w-full lg:w-auto"
      style={{ width: isMounted && window.innerWidth >= 1024 ? `${sidebarWidth}px` : undefined }}
    >
      <div
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/30 transition-colors z-50 hidden lg:block"
        onMouseDown={startResizing}
      />

      <div className="p-4 border-b flex items-center justify-between min-h-[57px]">
        <h2 className="text-lg font-semibold capitalize truncate pr-2">{activeSection.replace(/([A-Z])/g, ' $1')}</h2>
        {ADDABLE_SECTIONS.includes(activeSection) && (
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5"
            onClick={() => addSectionItem(activeSection as any, defaultItems[activeSection])}
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1 w-full overflow-x-hidden">
        <div className="p-4 space-y-6 pb-20 w-full min-w-0">
          {SectionComponent ? <SectionComponent /> : null}
        </div>
      </ScrollArea>
    </div>
  )
}
