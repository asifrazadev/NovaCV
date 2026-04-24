"use client"

import * as React from "react"
import { useBuilder } from "@/app/dashboard/resumes/[id]/builder-context"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

/* ── Default items for each section ── */
export const defaultItems: Record<string, any> = {
  experience: { company: "", position: "", location: "", startDate: "", endDate: "", isCurrent: false, website: "", websiteLabel: "", showLinkInTitle: false, roles: [], description: "" },
  education: { school: "", areaOfStudy: "", degree: "", grade: "", location: "", startDate: "", endDate: "", isCurrent: false, website: "", websiteLabel: "", showLinkInTitle: false, description: "" },
  projects: { name: "", description: "", url: "", websiteLabel: "", startDate: "", endDate: "", isCurrent: false, showLinkInTitle: false },
  profiles: { network: "", username: "", url: "", icon: "" },
  awards: { title: "", awarder: "", date: "", url: "", websiteLabel: "", showLinkInTitle: false, description: "" },
  certifications: { name: "", issuer: "", date: "", url: "", websiteLabel: "", showLinkInTitle: false, description: "" },
  publications: { name: "", publisher: "", date: "", url: "", websiteLabel: "", showLinkInTitle: false, description: "" },
  volunteer: { organization: "", position: "", startDate: "", endDate: "", isCurrent: false, website: "", websiteLabel: "", showLinkInTitle: false, description: "" },
  references: { name: "", position: "", phone: "", email: "", website: "", websiteLabel: "", showLinkInTitle: false, description: "" },
  skills: { name: "", level: 100 },
  languages: { name: "", level: 100 },
  interests: { name: "" },
}

/* ── Date Range ── */
export function DateRange({ section, item }: { section: string; item: any }) {
  const { updateSectionItem } = useBuilder()

  return (
    <div className="space-y-3 pt-2 border-t mt-2">
      <div className="grid grid-cols-2 gap-3 pb-1">
        <div className="space-y-1.5">
          <Label className="text-[10px] uppercase font-bold text-muted-foreground/70">Start Date</Label>
          <Input placeholder="Jan 2024" value={item.startDate ?? ""} onChange={(e) => updateSectionItem(section as any, item.id, "startDate", e.target.value)} className="h-8 text-xs" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[10px] uppercase font-bold text-muted-foreground/70">End Date</Label>
          <Input
            placeholder="Present"
            value={item.isCurrent ? "Present" : (item.endDate ?? "")}
            onChange={(e) => updateSectionItem(section as any, item.id, "endDate", e.target.value)}
            disabled={item.isCurrent}
            className="h-8 text-xs"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id={`present-${item.id}`}
          checked={item.isCurrent ?? false}
          onCheckedChange={(val: boolean) => updateSectionItem(section as any, item.id, "isCurrent", val)}
          className="scale-75 origin-left"
        />
        <Label htmlFor={`present-${item.id}`} className="text-xs cursor-pointer">I currently study/work here</Label>
      </div>
    </div>
  )
}

/* ── ListSection — shared accordion wrapper for all list-type sections ── */
export function ListSection({
  section,
  renderForm,
}: {
  section: string
  renderForm: (item: any) => React.ReactNode
}) {
  const { data, deleteSectionItem } = useBuilder()
  const items = data.sections[section as keyof typeof data.sections] as any[]

  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id} className="border-b-0 mb-2 border rounded-md px-3 bg-card/50 overflow-hidden">
          <AccordionTrigger className="hover:no-underline py-3 overflow-hidden">
            <div className="flex flex-col items-start pr-4 truncate w-full text-left min-w-0">
              <span className="font-medium text-sm truncate w-full block">{item.company || item.school || item.name || item.title || item.organization || "Untitled"}</span>
              <span className="text-[11px] text-muted-foreground truncate w-full block">{item.position || item.degree || item.date || item.issuer || item.publisher || ""}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pb-4">
            {renderForm(item)}
            <Button variant="ghost" size="sm" onClick={() => deleteSectionItem(section as any, item.id)} className="w-full text-destructive hover:bg-destructive/10 h-8 gap-2 mt-4">
              <Trash2 className="w-3.5 h-3.5" /> Delete Entry
            </Button>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
