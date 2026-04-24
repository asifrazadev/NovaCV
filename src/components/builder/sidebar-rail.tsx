"use client"

import * as React from "react"
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Code2,
  Languages,
  Award,
  Layout,
  Type,
  Palette,
  Plus,
  Globe,
  FolderKanban,
  Heart,
  BadgeCheck,
  BookOpen,
  HandHeart,
  Quote,
  Settings,
  Search,
  BarChart,
  Target,
  FileCode
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBuilder } from "@/app/dashboard/resumes/[id]/builder-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export const sections = [
  { id: "basics", icon: User, label: "Basics" },
  { id: "summary", icon: FileText, label: "Summary" },
  { id: "profiles", icon: Globe, label: "Profiles" },
  { id: "experience", icon: Briefcase, label: "Experience" },
  { id: "education", icon: GraduationCap, label: "Education" },
  { id: "projects", icon: FolderKanban, label: "Projects" },
  { id: "skills", icon: Code2, label: "Skills" },
  { id: "languages", icon: Languages, label: "Languages" },
  { id: "interests", icon: Heart, label: "Interests" },
  { id: "awards", icon: Award, label: "Awards" },
  { id: "certifications", icon: BadgeCheck, label: "Certifications" },
  { id: "publications", icon: BookOpen, label: "Publications" },
  { id: "volunteer", icon: HandHeart, label: "Volunteer" },
  { id: "references", icon: Quote, label: "References" },
  { id: "layout", icon: Layout, label: "Layout" },
]

export const utilities = [
  { id: "analysis", icon: Target, label: "Resume Analysis" },
  { id: "statistics", icon: BarChart, label: "Statistics" },
]

export const design = [
  { id: "templates", icon: Layout, label: "Templates" },
  { id: "typography", icon: Type, label: "Typography" },
  { id: "theme", icon: Palette, label: "Theme" },
  { id: "page", icon: Settings, label: "Page Settings" },
  { id: "css", icon: FileCode, label: "Custom CSS" },
]

export function SidebarRail() {
  const { activeSection, setActiveSection } = useBuilder()

  return (
    <TooltipProvider delayDuration={0}>
      <div className="w-14 border-r bg-background flex flex-col items-center py-4 gap-4 h-full overflow-y-auto scrollbar-hide shrink-0 z-10">
        <div className="flex flex-col gap-2">
          {sections.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-10 w-10 transition-colors ${activeSection === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                 <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t pt-4">
          {utilities.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-10 w-10 transition-colors ${activeSection === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-2 border-t pt-4">
          {design.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-10 w-10 transition-colors ${activeSection === item.id ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400" : "text-muted-foreground hover:text-foreground"}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}
