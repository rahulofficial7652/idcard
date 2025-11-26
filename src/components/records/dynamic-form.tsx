"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface DynamicFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  templates: any[]
}

export function DynamicForm({ schema, templates }: DynamicFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")

  const fields = schema.jsonSchema?.fields || []

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch("/api/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schemaId: schema.id,
          templateId: selectedTemplate || undefined,
          dataJson: formData,
          status: "SUBMITTED"
        }),
      })

      if (!res.ok) throw new Error("Failed to submit record")

      toast.success("Record submitted successfully")
      router.push("/admin/records")
      router.refresh()
    } catch (error) {
      toast.error("Failed to submit record")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        {templates.length > 0 && (
          <div className="space-y-2">
            <Label>Select Template (Optional)</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Default Template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((t) => (
                  <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {fields.map((field: any) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.key}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>

            {field.type === "text" && (
              <Input
                id={field.key}
                required={field.required}
                value={formData[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            )}

            {field.type === "number" && (
              <Input
                id={field.key}
                type="number"
                required={field.required}
                value={formData[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            )}

            {field.type === "date" && (
              <Input
                id={field.key}
                type="date"
                required={field.required}
                value={formData[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            )}

            {field.type === "select" && (
              <Select
                value={formData[field.key] || ""}
                onValueChange={(value) => handleChange(field.key, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.split(",").map((opt: string) => (
                    <SelectItem key={opt.trim()} value={opt.trim()}>
                      {opt.trim()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {field.type === "boolean" && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={field.key}
                  checked={formData[field.key] || false}
                  onCheckedChange={(checked) => handleChange(field.key, checked)}
                />
                <Label htmlFor={field.key} className="font-normal">
                  Yes
                </Label>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Submit Record
      </Button>
    </form>
  )
}
