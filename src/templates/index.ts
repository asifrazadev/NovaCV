import { ModernTemplate } from "./modern"
import { JakeTemplate } from "./Jake"

export const templates = [
  {
    id: "modern",
    name: "Modern",
    component: ModernTemplate,
    thumbnail: "/thumbnails/modern.png"
  },
  {
    id: "jake",
    name: "Jake",
    component: JakeTemplate,
    thumbnail: "/thumbnails/modern.png" // Using modern thumbnail temporarily
  }
]

export function getTemplate(id: string) {
  return templates.find(t => t.id === id) || templates[0]
}
