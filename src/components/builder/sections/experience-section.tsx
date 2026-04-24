"use client"

import { useBuilder } from "@/app/dashboard/resumes/[id]/builder-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { RichTextarea } from "@/components/ui/rich-textarea"
import { Plus, Trash2, GripVertical, Link } from "lucide-react"
import { DateRange, ListSection } from "./shared"
import { v4 as uuidv4 } from "uuid"

export function ExperienceSection() {
  const { updateSectionItem } = useBuilder()

  return (
    <ListSection
      section="experience"
      renderForm={(item) => (
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Company</Label>
              <Input placeholder="Google, Meta..." value={item.company ?? ""} onChange={(e) => updateSectionItem("experience", item.id, "company", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Location</Label>
              <Input placeholder="New York, Remote..." value={item.location ?? ""} onChange={(e) => updateSectionItem("experience", item.id, "location", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Position</Label>
              <Input placeholder="Software Engineer" value={item.position ?? ""} onChange={(e) => updateSectionItem("experience", item.id, "position", e.target.value)} />
            </div>
          </div>
          <DateRange section="experience" item={item} />
          <div className="space-y-1.5">
            <Label className="text-xs">Website</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Link className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input className="pl-8 h-8 text-xs" placeholder="https://" value={item.website ?? ""} onChange={(e) => updateSectionItem("experience", item.id, "website", e.target.value)} />
              </div>
              <Input className="h-8 text-xs" placeholder="Label (e.g. Website)" value={item.websiteLabel ?? ""} onChange={(e) => updateSectionItem("experience", item.id, "websiteLabel", e.target.value)} />
            </div>
          </div>
          <div className="flex items-center justify-between py-1">
            <Label className="text-xs cursor-pointer" htmlFor={`show-link-${item.id}`}>Show link in title</Label>
            <Switch
              id={`show-link-${item.id}`}
              checked={item.showLinkInTitle ?? false}
              onCheckedChange={(val: boolean) => updateSectionItem("experience", item.id, "showLinkInTitle", val)}
            />
          </div>

          {/* Role Progression */}
          <div className="space-y-2 pt-1 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold">Role Progression</p>
                <p className="text-[10px] text-muted-foreground">Add multiple roles to show career progression at the same company.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-1 text-xs shrink-0"
                onClick={() => {
                  const newRole = { id: uuidv4(), title: "", startDate: "", endDate: "", isCurrent: false }
                  updateSectionItem("experience", item.id, "roles", [...(item.roles ?? []), newRole])
                }}
              >
                <Plus className="w-3 h-3" /> Add Role
              </Button>
            </div>
            {(item.roles ?? []).length > 0 && (
              <div className="space-y-2">
                {(item.roles ?? []).map((role: any) => (
                  <div key={role.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                    <GripVertical className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <Input
                        className="h-7 text-xs"
                        placeholder="Role title"
                        value={role.title ?? ""}
                        onChange={(e) => {
                          const updated = (item.roles ?? []).map((r: any) => r.id === role.id ? { ...r, title: e.target.value } : r)
                          updateSectionItem("experience", item.id, "roles", updated)
                        }}
                      />
                      <div className="grid gap-1.5">
                        <div className="flex gap-1.5">
                          <Input
                            className="h-7 text-[10px]"
                            placeholder="Start"
                            value={role.startDate ?? ""}
                            onChange={(e) => {
                              const updated = (item.roles ?? []).map((r: any) => r.id === role.id ? { ...r, startDate: e.target.value } : r)
                              updateSectionItem("experience", item.id, "roles", updated)
                            }}
                          />
                          <Input
                            className="h-7 text-[10px]"
                            placeholder="End"
                            value={role.isCurrent ? "Present" : (role.endDate ?? "")}
                            disabled={role.isCurrent}
                            onChange={(e) => {
                              const updated = (item.roles ?? []).map((r: any) => r.id === role.id ? { ...r, endDate: e.target.value } : r)
                              updateSectionItem("experience", item.id, "roles", updated)
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Switch
                            checked={role.isCurrent ?? false}
                            onCheckedChange={(val: boolean) => {
                              const updated = (item.roles ?? []).map((r: any) => r.id === role.id ? { ...r, isCurrent: val } : r)
                              updateSectionItem("experience", item.id, "roles", updated)
                            }}
                            className="scale-[0.6] origin-left"
                          />
                          <span className="text-[9px] font-medium opacity-70">Present</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive shrink-0"
                      onClick={() => {
                        const updated = (item.roles ?? []).filter((r: any) => r.id !== role.id)
                        updateSectionItem("experience", item.id, "roles", updated)
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-xs">Description</Label>
            <RichTextarea
              placeholder="Describe your responsibilities and achievements..."
              value={item.description ?? ""}
              onChange={(val) => updateSectionItem("experience", item.id, "description", val)}
              minHeight="120px"
            />
          </div>
        </div>
      )}
    />
  )
}
