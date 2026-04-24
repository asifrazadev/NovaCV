"use client"

import { useBuilder } from "@/app/dashboard/resumes/[id]/builder-context"
import { Label } from "@/components/ui/label"
import { RichTextarea } from "@/components/ui/rich-textarea"

export function SummarySection() {
  const { data, updateSectionItem } = useBuilder()

  return (
    <div className="space-y-4">
      <Label>Professional Summary</Label>
      <RichTextarea
        value={data.sections.summary?.content ?? ""}
        onChange={(val) => updateSectionItem("summary", "", "content", val)}
        minHeight="300px"
      />
    </div>
  )
}
