"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export interface DesignerElement {
  id: string
  type: "text" | "image" | "qr" | "shape"
  x: number
  y: number
  width: number
  height: number
  content?: string
  fontSize?: number
  backgroundColor?: string
  color?: string
}

interface PropertiesPanelProps {
  selectedElement: DesignerElement | null
  onUpdate: (id: string, updates: Partial<DesignerElement>) => void
  onDelete: (id: string) => void
}

export function PropertiesPanel({ selectedElement, onUpdate, onDelete }: PropertiesPanelProps) {
  if (!selectedElement) {
    return (
      <div className="text-center text-muted-foreground text-sm mt-10">
        Select an element to edit its properties.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Type</Label>
        <div className="text-sm font-medium capitalize">{selectedElement.type}</div>
      </div>

      {selectedElement.type === "text" && (
        <>
          <div className="space-y-2">
            <Label>Content</Label>
            <Input 
              value={selectedElement.content || ""} 
              onChange={(e) => onUpdate(selectedElement.id, { content: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Font Size ({selectedElement.fontSize}px)</Label>
            <Slider
              value={[selectedElement.fontSize || 16]}
              min={8}
              max={72}
              step={1}
              onValueChange={(vals: number[]) => onUpdate(selectedElement.id, { fontSize: vals[0] })}
            />
          </div>
          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2">
              <Input 
                type="color" 
                value={selectedElement.color || "#000000"} 
                className="w-12 h-8 p-1"
                onChange={(e) => onUpdate(selectedElement.id, { color: e.target.value })}
              />
              <Input 
                value={selectedElement.color || "#000000"} 
                onChange={(e) => onUpdate(selectedElement.id, { color: e.target.value })}
              />
            </div>
          </div>
        </>
      )}

      {(selectedElement.type === "shape" || selectedElement.type === "text") && (
        <div className="space-y-2">
          <Label>Background Color</Label>
          <div className="flex gap-2">
            <Input 
              type="color" 
              value={selectedElement.backgroundColor || "transparent"} 
              className="w-12 h-8 p-1"
              onChange={(e) => onUpdate(selectedElement.id, { backgroundColor: e.target.value })}
            />
             <Input 
              value={selectedElement.backgroundColor || "transparent"} 
              onChange={(e) => onUpdate(selectedElement.id, { backgroundColor: e.target.value })}
            />
          </div>
        </div>
      )}

      <div className="pt-4 border-t">
        <Button variant="destructive" className="w-full" onClick={() => onDelete(selectedElement.id)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Element
        </Button>
      </div>
    </div>
  )
}
