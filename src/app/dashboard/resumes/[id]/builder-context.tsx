"use client"

import * as React from "react"
import { ResumeData, defaultResumeData } from "@/types/resume"
import { updateResume } from "@/app/dashboard/resumes/actions"
import { v4 as uuidv4 } from "uuid"

interface BuilderContextType {
  data: ResumeData
  setData: React.Dispatch<React.SetStateAction<ResumeData>>
  zoom: number
  setZoom: React.Dispatch<React.SetStateAction<number>>
  activeSection: string
  setActiveSection: (section: string) => void
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  isSaving: boolean
  
  // Generic Handlers
  updateBasics: (field: string, value: any) => void
  updatePicture: (field: string, value: any) => void
  addSectionItem: (sectionKey: keyof ResumeData["sections"], defaultItem: any) => void
  updateSectionItem: (sectionKey: keyof ResumeData["sections"], id: string, field: string, value: any) => void
  deleteSectionItem: (sectionKey: keyof ResumeData["sections"], id: string) => void
  updateMetadata: (field: keyof ResumeData["metadata"], value: any) => void
  resumeId: string
  mobileView: "editor" | "preview"
  setMobileView: (view: "editor" | "preview") => void
}

const BuilderContext = React.createContext<BuilderContextType | undefined>(undefined)

// Helper to deep merge objects
function deepMerge(target: any, source: any) {
  const result = { ...target }
  if (!source) return result

  Object.keys(source).forEach(key => {
    const targetVal = target[key]
    const sourceVal = source[key]

    if (sourceVal && typeof sourceVal === 'object' && !Array.isArray(sourceVal)) {
      result[key] = deepMerge(targetVal || {}, sourceVal)
    } else if (Array.isArray(sourceVal)) {
      // If the target is an object but the source is an EMPTY array, 
      // we maintain the target structure if the target expects an object.
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

export function BuilderProvider({ 
  children, 
  initialData,
  initialTitle,
  resumeId 
}: { 
  children: React.ReactNode,
  initialData: ResumeData,
  initialTitle: string,
  resumeId: string
}) {
  const [data, setData] = React.useState<ResumeData>(() => {
    // Merge initial data (database) with default structure (code)
    return deepMerge(defaultResumeData, initialData)
  })
  const [zoom, setZoom] = React.useState(100)
  const [activeSection, setActiveSection] = React.useState("basics")
  const [title, setTitle] = React.useState(initialTitle || "Untitled Resume")
  const [isSaving, setIsSaving] = React.useState(false)

  // Handle initial mobile zoom
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setZoom(45) // Default to 45% on mobile/tablet
    }
  }, [])

  // Auto-save logic
  React.useEffect(() => {
    const timer = setTimeout(async () => {
      setIsSaving(true)
      try {
        await updateResume(resumeId, data, title)
      } catch (error) {
        console.error("Auto-save failed:", error)
      } finally {
        setIsSaving(false)
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [data, title, resumeId])

  // Handlers
  const updateBasics = (field: string, value: any) => {
    setData(prev => ({
      ...prev,
      basics: { ...prev.basics, [field]: value }
    }))
  }

  const updatePicture = (field: string, value: any) => {
    setData(prev => ({
      ...prev,
      basics: {
        ...prev.basics,
        picture: { ...prev.basics.picture, [field]: value }
      }
    }))
  }

  const addSectionItem = (sectionKey: keyof ResumeData["sections"], defaultItem: any) => {
    setData(prev => {
      const section = prev.sections[sectionKey]
      if (Array.isArray(section)) {
        return {
          ...prev,
          sections: {
            ...prev.sections,
            [sectionKey]: [...section, { ...defaultItem, id: uuidv4() }]
          }
        }
      }
      return prev
    })
  }

  const updateSectionItem = (sectionKey: keyof ResumeData["sections"], id: string, field: string, value: any) => {
    setData(prev => {
      const section = prev.sections[sectionKey]
      if (Array.isArray(section)) {
        return {
          ...prev,
          sections: {
            ...prev.sections,
            [sectionKey]: section.map((item: any) => 
              item.id === id ? { ...item, [field]: value } : item
            )
          }
        }
      } else if (sectionKey === "summary") {
         return {
          ...prev,
          sections: {
            ...prev.sections,
            summary: { ...prev.sections.summary, [field]: value }
          }
        }
      }
      return prev
    })
  }

  const deleteSectionItem = (sectionKey: keyof ResumeData["sections"], id: string) => {
    setData(prev => {
      const section = prev.sections[sectionKey]
      if (Array.isArray(section)) {
        return {
          ...prev,
          sections: {
            ...prev.sections,
            [sectionKey]: section.filter((item: any) => item.id !== id)
          }
        }
      }
      return prev
    })
  }

  const updateMetadata = (field: keyof ResumeData["metadata"], value: any) => {
    setData(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [field]: value
      }
    }))
  }

  const [mobileView, setMobileView] = React.useState<"editor" | "preview">("editor")
 
  return (
    <BuilderContext.Provider value={{ 
      data, setData, zoom, setZoom, activeSection, setActiveSection, title, setTitle, isSaving,
      updateBasics, updatePicture, addSectionItem, updateSectionItem, deleteSectionItem, updateMetadata,
      resumeId, mobileView, setMobileView
    }}>
      {children}
    </BuilderContext.Provider>
  )
}

export function useBuilder() {
  const context = React.useContext(BuilderContext)
  if (context === undefined) {
    throw new Error("useBuilder must be used within a BuilderProvider")
  }
  return context
}
