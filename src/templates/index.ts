import { ModernTemplate } from "./modern"
import { JakeTemplate } from "./Jake"
import { ExecutiveTemplate } from "./executive"

export const templates = [
  {
    id: "modern",
    name: "Modern",
    component: ModernTemplate,
    thumbnail: "/thumbnails/modern.png",
    defaultLayout: {
      main: ["summary", "experience", "education", "projects", "volunteer", "publications", "references"],
      sidebar: ["skills", "languages", "interests", "awards", "certifications", "profiles"]
    }
  },
  {
    id: "jake",
    name: "Professional",
    component: JakeTemplate,
    thumbnail: "/thumbnails/jake.png",
    defaultLayout: {
      main: ["summary", "experience", "education", "projects", "volunteer", "publications", "references", "skills", "languages", "interests", "awards", "certifications", "profiles"],
      sidebar: []
    }
  },
  {
    id: "executive",
    name: "Executive",
    component: ExecutiveTemplate,
    thumbnail: "/thumbnails/executive.png",
    defaultLayout: {
      main: ["summary", "skills", "experience", "education", "projects", "volunteer", "publications", "references", "languages", "interests", "awards", "certifications", "profiles"],
      sidebar: []
    }
  }
]

export function getTemplate(id: string) {
  return templates.find(t => t.id === id) || templates[0]
}
