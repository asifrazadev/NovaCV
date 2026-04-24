import { ResumeData, defaultResumeData } from "@/types/resume"
import { v4 as uuidv4 } from "uuid"

export function parseImportedResume(jsonString: string): ResumeData | null {
  try {
    const rawData = JSON.parse(jsonString)

    if (!rawData || typeof rawData !== "object") {
      throw new Error("Invalid resume data structure.")
    }

    // Check if it's already a NovaCV native export (it contains our top-level keys)
    if (rawData.id !== undefined && rawData.basics && rawData.sections && rawData.metadata) {
      // It's a NovaCV Backup, we can safely assume it maps directly
      return parseNovaCV(rawData)
    }

    // Try parsing as JSON Resume standard
    if (rawData.basics) {
      return parseJsonResume(rawData)
    }

    throw new Error("Unrecognized JSON format. Must be a NovaCV export or standard JSON Resume schema.")
  } catch (error) {
    console.error("Failed to parse resume JSON:", error)
    return null
  }
}

function parseNovaCV(rawData: any): ResumeData {
  // If we want to guarantee validity we would use a Zod schema, but for now we deep merge with default
  return deepMerge(defaultResumeData, rawData)
}

function parseJsonResume(rawData: any): ResumeData {
  // We construct a new ResumeData and map the fields
  const data: ResumeData = JSON.parse(JSON.stringify(defaultResumeData)) // Clone defaults

  if (rawData.basics) {
    data.basics.name = rawData.basics.name || ""
    data.basics.headline = rawData.basics.label || ""
    data.basics.email = rawData.basics.email || ""
    data.basics.phone = rawData.basics.phone || ""
    data.basics.website = rawData.basics.url || ""
    
    if (rawData.basics.location) {
      const loc = [rawData.basics.location.city, rawData.basics.location.region, rawData.basics.location.countryCode].filter(Boolean)
      data.basics.location = loc.join(", ")
    }

    if (rawData.basics.image) {
      data.basics.picture.url = rawData.basics.image
    }

    if (rawData.basics.summary) {
      data.sections.summary.content = `<p>${rawData.basics.summary}</p>`
    }

    if (Array.isArray(rawData.basics.profiles)) {
      data.sections.profiles = rawData.basics.profiles.map((p: any) => ({
        id: uuidv4(),
        network: p.network || "",
        username: p.username || "",
        url: p.url || "",
        icon: "" // We will let the renderer figure it out
      }))
    }
  }

  if (Array.isArray(rawData.work)) {
    data.sections.experience = rawData.work.map((w: any) => ({
      id: uuidv4(),
      company: w.name || w.company || "",
      position: w.position || "",
      location: w.location || "",
      startDate: w.startDate || "",
      endDate: w.endDate || "",
      isCurrent: !w.endDate,
      website: w.url || w.website || "",
      websiteLabel: "",
      showLinkInTitle: !!(w.url || w.website),
      roles: [],
      description: [w.summary, ...(w.highlights || []).map((h: string) => `• ${h}`)].filter(Boolean).map(h => `<p>${h}</p>`).join("")
    }))
  }

  if (Array.isArray(rawData.education)) {
    data.sections.education = rawData.education.map((e: any) => ({
      id: uuidv4(),
      school: e.institution || "",
      areaOfStudy: e.area || "",
      degree: e.studyType || "",
      grade: e.score || "",
      location: "",
      startDate: e.startDate || "",
      endDate: e.endDate || "",
      isCurrent: !e.endDate,
      website: e.url || "",
      websiteLabel: "",
      showLinkInTitle: !!e.url,
      description: (e.courses || []).map((c: string) => `<p>• ${c}</p>`).join("")
    }))
  }

  if (Array.isArray(rawData.skills)) {
    data.sections.skills = rawData.skills.map((s: any) => ({
      id: uuidv4(),
      name: s.name || "",
      level: 100, // We default to 100 on import
      keywords: s.keywords?.join(", ") || ""
    }))
  }

  if (Array.isArray(rawData.languages)) {
    data.sections.languages = rawData.languages.map((l: any) => ({
      id: uuidv4(),
      name: l.language || "",
      level: 100, // Default to max
      fluency: l.fluency || ""
    }))
  }

  if (Array.isArray(rawData.projects)) {
    data.sections.projects = rawData.projects.map((p: any) => ({
      id: uuidv4(),
      name: p.name || "",
      description: [p.description, ...(p.highlights || []).map((h: string) => `• ${h}`)].filter(Boolean).map(h => `<p>${h}</p>`).join(""),
      url: p.url || "",
      websiteLabel: "",
      startDate: p.startDate || "",
      endDate: p.endDate || "",
      isCurrent: !p.endDate,
      showLinkInTitle: !!p.url
    }))
  }

  // Set the title
  data.title = `${data.basics.name || "Imported"} Resume`
  
  return data
}

// Deep merge helper used internally to parse NovaCV correctly
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
