"use client"

import { useBuilder } from "@/app/dashboard/resumes/[id]/builder-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export function BasicsSection() {
  const { data, updateBasics, updatePicture } = useBuilder()

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Contact Information</h3>
        <div className="grid gap-4">
          <div className="space-y-2"><Label>Full Name</Label><Input value={data.basics.name ?? ""} onChange={(e) => updateBasics("name", e.target.value)} /></div>
          <div className="space-y-2"><Label>Headline</Label><Input value={data.basics.headline ?? ""} onChange={(e) => updateBasics("headline", e.target.value)} /></div>
          <div className="space-y-2"><Label>Email</Label><Input value={data.basics.email ?? ""} onChange={(e) => updateBasics("email", e.target.value)} /></div>
          <div className="space-y-2"><Label>Phone</Label><Input value={data.basics.phone ?? ""} onChange={(e) => updateBasics("phone", e.target.value)} /></div>
          <div className="space-y-2"><Label>Location</Label><Input value={data.basics.location ?? ""} onChange={(e) => updateBasics("location", e.target.value)} /></div>
          <div className="space-y-2"><Label>Website</Label><Input value={data.basics.website ?? ""} onChange={(e) => updateBasics("website", e.target.value)} /></div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-sm font-semibold">Profile Picture</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input value={data.basics.picture?.url ?? ""} onChange={(e) => updatePicture("url", e.target.value)} placeholder="https://..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 text-xs"><Label>Size ({data.basics.picture?.size ?? 64}px)</Label><Slider value={[data.basics.picture?.size ?? 64]} onValueChange={([val]) => updatePicture("size", val)} min={32} max={200} /></div>
            <div className="space-y-2 text-xs"><Label>Radius ({data.basics.picture?.borderRadius ?? 0}%)</Label><Slider value={[data.basics.picture?.borderRadius ?? 0]} onValueChange={([val]) => updatePicture("borderRadius", val)} min={0} max={100} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 text-xs"><Label>Rotation ({data.basics.picture?.rotation ?? 0}°)</Label><Slider value={[data.basics.picture?.rotation ?? 0]} onValueChange={([val]) => updatePicture("rotation", val)} min={-180} max={180} /></div>
            <div className="space-y-2 text-xs"><Label>Shadow ({data.basics.picture?.shadow ?? 0}px)</Label><Slider value={[data.basics.picture?.shadow ?? 0]} onValueChange={([val]) => updatePicture("shadow", val)} min={0} max={20} /></div>
          </div>
          <div className="flex items-center justify-between"><Label className="text-xs">Grayscale</Label><Switch checked={data.basics.picture?.grayscale ?? false} onCheckedChange={(val: boolean) => updatePicture("grayscale", val)} /></div>
        </div>
      </div>
    </div>
  )
}
