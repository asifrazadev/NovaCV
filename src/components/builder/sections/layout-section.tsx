"use client"

import { useBuilder } from "@/app/dashboard/resumes/[id]/builder-context"
import { cn } from "@/lib/utils"
import { GripVertical, FileText, Layout } from "lucide-react"
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  useDroppable
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

function SortableSectionItem({ id }: { id: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-1 p-1 rounded-md border bg-card/50 mb-2 hover:border-primary/50 transition-colors group relative",
        isDragging && "opacity-50 ring-2 ring-primary border-primary bg-primary/5 shadow-lg"
      )}
    >
      <div 
        {...attributes} 
        {...listeners} 
        className="cursor-grab active:cursor-grabbing p-3 -ml-1 hover:bg-muted rounded transition-colors touch-none"
      >
        <GripVertical className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <span className="text-sm font-medium capitalize select-none py-2 pr-4 flex-1">{id.replace(/([A-Z])/g, ' $1')}</span>
    </div>
  )
}

function DroppableColumn({ id, items, title, icon: Icon }: { id: string, items: string[], title: string, icon: any }) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div className={cn("space-y-3", id !== "main" && "pt-6 border-t")}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-bold">{title}</h3>
      </div>
      <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={cn(
            "min-h-[100px] p-2 rounded-lg border-2 border-dashed transition-all duration-200",
            isOver ? "border-primary bg-primary/10 ring-4 ring-primary/5" : "border-muted bg-muted/10 font-medium"
          )}
        >
          {items.map((sectionId: string) => (
            <SortableSectionItem key={sectionId} id={sectionId} />
          ))}
          {items.length === 0 && (
            <div className="h-full flex items-center justify-center py-8 text-muted-foreground/30 italic text-[10px] pointer-events-none">
              Drop sections here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}

export function LayoutSection() {
  const { data, updateMetadata } = useBuilder()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const rawLayout = (data.metadata as any).layout
  const layout = (rawLayout && typeof rawLayout === 'object' && !Array.isArray(rawLayout))
    ? rawLayout
    : { main: ["summary", "experience", "education", "projects", "volunteer"], sidebar: ["skills", "languages", "interests", "awards", "certifications", "publications", "references"] }

  const mainItems = layout.main || []
  const sidebarItems = layout.sidebar || []

  function findContainer(id: string) {
    if (mainItems.includes(id) || id === "main") return "main"
    if (sidebarItems.includes(id) || id === "sidebar") return "sidebar"
    return null
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeContainer = findContainer(activeId)
    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer) return

    if (activeContainer === overContainer) {
      if (activeId !== overId) {
        const items = layout[activeContainer as "main" | "sidebar"]
        const oldIndex = items.indexOf(activeId)
        const newIndex = items.indexOf(overId)
        updateMetadata("layout", {
          ...layout,
          [activeContainer]: arrayMove(items, oldIndex, newIndex)
        })
      }
    } else {
      const activeItems = [...(layout[activeContainer as "main" | "sidebar"] || [])]
      const overItems = [...(layout[overContainer as "main" | "sidebar"] || [])]

      const activeIndex = activeItems.indexOf(activeId)
      const overIndex = overItems.indexOf(overId)

      activeItems.splice(activeIndex, 1)

      const insertIndex = (overId === "main" || overId === "sidebar")
        ? overItems.length
        : (overIndex >= 0 ? overIndex : overItems.length)

      overItems.splice(insertIndex, 0, activeId)

      updateMetadata("layout", {
        ...layout,
        [activeContainer]: activeItems,
        [overContainer]: overItems
      })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-6">
        <DroppableColumn id="main" items={mainItems} title="Main Column" icon={FileText} />
        <DroppableColumn id="sidebar" items={sidebarItems} title="Sidebar Column" icon={Layout} />

        <div className="p-4 rounded-lg bg-muted/40 border border-muted text-[10px] text-muted-foreground leading-relaxed">
          <p>Drag sections between columns. Columns will highlight in the primary color when you can drop items into them.</p>
        </div>
      </div>
    </DndContext>
  )
}
