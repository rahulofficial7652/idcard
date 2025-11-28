"use client"

import { DesignerElement } from "@/components/designer/PropertiesPanel"
import { cn } from "@/lib/utils"

interface IDCardRendererProps {
  elements: DesignerElement[]
  data: Record<string, any>
  width?: number
  height?: number
}

export function IDCardRenderer({ elements, data, width = 350, height = 550 }: IDCardRendererProps) {
  
  const replacePlaceholders = (text: string) => {
    return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      return data[key] || `{{${key}}}`
    })
  }

  return (
    <div 
      className="relative bg-white shadow-lg overflow-hidden print:shadow-none print:border"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {elements.map((el) => (
        <div
          key={el.id}
          style={{
            position: "absolute",
            left: `${el.x}px`,
            top: `${el.y}px`,
            width: `${el.width}px`,
            height: `${el.height}px`,
            fontSize: el.fontSize ? `${el.fontSize}px` : undefined,
            backgroundColor: el.backgroundColor,
            color: el.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            whiteSpace: "pre-wrap",
          }}
        >
          {el.type === "text" && el.content && replacePlaceholders(el.content)}
          {el.type === "image" && (
            // In a real app, this would be an actual image URL from 'data' or 'content'
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
              {data.image ? <img src={data.image} alt="User" className="w-full h-full object-cover" /> : "No Image"}
            </div>
          )}
          {el.type === "qr" && (
             // Placeholder for QR code rendering
             <div className="w-full h-full bg-black flex items-center justify-center text-white text-[10px] text-center p-1">
               QR: {data.id || "ID"}
             </div>
          )}
        </div>
      ))}
    </div>
  )
}
