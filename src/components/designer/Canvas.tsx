"use client"

import { Rnd } from "react-rnd"
import { DesignerElement } from "./PropertiesPanel"
import { cn } from "@/lib/utils"

interface CanvasProps {
  elements: DesignerElement[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  onUpdate: (id: string, updates: Partial<DesignerElement>) => void
}

export function Canvas({ elements, selectedId, onSelect, onUpdate }: CanvasProps) {
  return (
    <div 
      className="relative bg-white shadow-lg" 
      style={{ width: "350px", height: "550px" }} // Standard ID card ratio roughly
      onClick={() => onSelect(null)}
    >
      {elements.map((el) => (
        <Rnd
          key={el.id}
          size={{ width: el.width, height: el.height }}
          position={{ x: el.x, y: el.y }}
          onDragStop={(e, d) => {
            onUpdate(el.id, { x: d.x, y: d.y })
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            onUpdate(el.id, {
              width: parseInt(ref.style.width),
              height: parseInt(ref.style.height),
              ...position,
            })
          }}
          bounds="parent"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation()
            onSelect(el.id)
          }}
          className={cn(
            "border-2 border-transparent hover:border-blue-200 transition-colors",
            selectedId === el.id && "border-blue-500"
          )}
        >
          <div 
            className="w-full h-full flex items-center justify-center overflow-hidden"
            style={{
              fontSize: el.fontSize,
              backgroundColor: el.backgroundColor,
              color: el.color,
            }}
          >
            {el.type === "text" && (el.content || "Text")}
            {el.type === "image" && <div className="bg-gray-200 w-full h-full flex items-center justify-center text-xs text-gray-500">Image Placeholder</div>}
            {el.type === "qr" && <div className="bg-black w-full h-full flex items-center justify-center text-white text-xs">QR</div>}
            {el.type === "shape" && <div className="w-full h-full" />}
          </div>
        </Rnd>
      ))}
      
      {elements.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground pointer-events-none">
          <p className="text-sm">Drag tools here to start designing</p>
        </div>
      )}
    </div>
  )
}
