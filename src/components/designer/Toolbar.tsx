"use client"

import { Button } from "@/components/ui/button"
import { Type, Image as ImageIcon, QrCode, Square } from "lucide-react"

interface ToolbarProps {
  onAddElement: (type: "text" | "image" | "qr" | "shape") => void
}

export function Toolbar({ onAddElement }: ToolbarProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button variant="outline" className="flex flex-col h-20 gap-2" onClick={() => onAddElement("text")}>
        <Type className="h-6 w-6" />
        <span className="text-xs">Text</span>
      </Button>
      <Button variant="outline" className="flex flex-col h-20 gap-2" onClick={() => onAddElement("image")}>
        <ImageIcon className="h-6 w-6" />
        <span className="text-xs">Image</span>
      </Button>
      <Button variant="outline" className="flex flex-col h-20 gap-2" onClick={() => onAddElement("qr")}>
        <QrCode className="h-6 w-6" />
        <span className="text-xs">QR Code</span>
      </Button>
      <Button variant="outline" className="flex flex-col h-20 gap-2" onClick={() => onAddElement("shape")}>
        <Square className="h-6 w-6" />
        <span className="text-xs">Shape</span>
      </Button>
    </div>
  )
}
