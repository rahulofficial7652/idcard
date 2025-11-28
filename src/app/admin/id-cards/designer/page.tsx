"use client"

import { useState } from "react"
import { DesignerLayout } from "@/components/designer/DesignerLayout"
import { Toolbar } from "@/components/designer/Toolbar"
import { PropertiesPanel, DesignerElement } from "@/components/designer/PropertiesPanel"
import { Canvas } from "@/components/designer/Canvas"
import { v4 as uuidv4 } from "uuid"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function DesignerPage() {
  const router = useRouter()
  const [elements, setElements] = useState<DesignerElement[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
  const [templateName, setTemplateName] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleAddElement = (type: "text" | "image" | "qr" | "shape") => {
    const newElement: DesignerElement = {
      id: uuidv4(),
      type,
      x: 20,
      y: 20,
      width: type === "text" ? 120 : 100,
      height: type === "text" ? 40 : 100,
      content: type === "text" ? "New Text" : undefined,
      fontSize: 16,
      color: "#000000",
      backgroundColor: type === "shape" ? "#e2e8f0" : "transparent"
    }
    setElements([...elements, newElement])
    setSelectedId(newElement.id)
  }

  const handleUpdateElement = (id: string, updates: Partial<DesignerElement>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el))
  }

  const handleDeleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id))
    setSelectedId(null)
  }

  const handleSaveClick = () => {
    if (elements.length === 0) {
      toast.error("Add some elements to the design first")
      return
    }
    setIsSaveDialogOpen(true)
  }

  const handleConfirmSave = async () => {
    if (!templateName.trim()) {
      toast.error("Please enter a template name")
      return
    }

    setIsSaving(true)
    try {
      const res = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: templateName,
          elements: elements
        })
      })

      if (!res.ok) throw new Error("Failed to save template")

      toast.success("Template saved successfully!")
      setIsSaveDialogOpen(false)
      router.push("/admin/id-cards")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsSaving(false)
    }
  }

  const selectedElement = elements.find(el => el.id === selectedId) || null

  return (
    <>
      <DesignerLayout
        toolbar={<Toolbar onAddElement={handleAddElement} />}
        propertiesPanel={
          <PropertiesPanel 
            selectedElement={selectedElement} 
            onUpdate={handleUpdateElement}
            onDelete={handleDeleteElement}
          />
        }
        onSave={handleSaveClick}
      >
        <Canvas 
          elements={elements} 
          selectedId={selectedId} 
          onSelect={setSelectedId}
          onUpdate={handleUpdateElement}
        />
      </DesignerLayout>

      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Template</DialogTitle>
            <DialogDescription>
              Give your ID card template a name to save it.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="e.g., Employee ID 2024"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Template"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
