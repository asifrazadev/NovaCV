"use client"

import * as React from "react"
import { useBuilder } from "@/app/dashboard/resumes/[id]/builder-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function TagSections() {
  const { data, activeSection, updateSectionItem, deleteSectionItem } = useBuilder()

  const items = data.sections[activeSection as keyof typeof data.sections] as any[]
  if (!["skills", "languages", "interests"].includes(activeSection)) return null

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="p-3 border rounded-md bg-card/50 space-y-3">
          <div className="flex gap-2">
            <Input value={item.name ?? ""} onChange={(e) => updateSectionItem(activeSection as any, item.id, "name", e.target.value)} className="h-8 shadow-none" />
            <Button variant="ghost" size="icon" onClick={() => deleteSectionItem(activeSection as any, item.id)} className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
          </div>
          {item.level !== undefined && activeSection === "skills" && (
            <div className="space-y-2">
              <Slider value={[item.level]} onValueChange={([v]) => updateSectionItem(activeSection as any, item.id, "level", v)} max={100} />
              <div className="space-y-1">
                <Input 
                  placeholder="Keywords (comma separated)" 
                  value={Array.isArray(item.keywords) ? item.keywords.join(", ") : (item.keywords || "")} 
                  onChange={(e) => {
                    const val = e.target.value
                    const keywords = val.split(",").map(k => k.trim())
                    updateSectionItem("skills", item.id, "keywords", keywords)
                  }}
                  className="h-7 text-[10px] bg-muted/30 border-none px-2"
                />
              </div>
            </div>
          )}
          {item.level !== undefined && activeSection === "languages" && (() => {
            const steps = [
              { val: 20, label: "Beginner" },
              { val: 40, label: "Elementary" },
              { val: 60, label: "Intermediate" },
              { val: 80, label: "Upper-Intermediate" },
              { val: 100, label: "Advanced / Native" },
            ]
            return (
              <div className="space-y-2">
                <div className="flex gap-1">
                  {steps.map((s) => {
                    const isSelected = item.level >= s.val
                    return (
                      <button
                        key={s.val}
                        onClick={() => updateSectionItem("languages", item.id, "level", s.val)}
                        className={cn(
                          "h-2 flex-1 rounded-full transition-all",
                          isSelected ? "bg-primary" : "bg-muted hover:bg-muted/80"
                        )}
                        title={s.label}
                      />
                    )
                  })}
                </div>
                <div className="flex justify-between items-center text-[10px] font-medium text-muted-foreground">
                  <span>{steps.find(s => s.val === item.level)?.label || "Select Level"}</span>
                </div>
              </div>
            )
          })()}
        </div>
      ))}
    </div>
  )
}
