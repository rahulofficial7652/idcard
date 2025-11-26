"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, Plus, Trash2, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"

type FieldType = "text" | "number" | "date" | "select" | "image" | "boolean"

interface Field {
  id: string
  key: string
  label: string
  type: FieldType
  required: boolean
  placeholder?: string
  options?: string // Comma separated for select
}

interface SchemaBuilderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any
}

export function SchemaBuilder({ schema }: SchemaBuilderProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState(schema.name)
  const [fields, setFields] = useState<Field[]>(schema.jsonSchema?.fields || [])

  const addField = () => {
    const newField: Field = {
      id: crypto.randomUUID(),
      key: `field_${fields.length + 1}`,
      label: "New Field",
      type: "text",
      required: false
    }
    setFields([...fields, newField])
  }

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id))
  }

  const updateField = (id: string, updates: Partial<Field>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f))
  }

  const saveSchema = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/schemas/${schema.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          jsonSchema: { fields }
        }),
      })

      if (!res.ok) throw new Error("Failed to save schema")

      toast.success("Schema saved successfully")
      router.refresh()
    } catch (error) {
      toast.error("Failed to save schema")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/schemas">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Edit Schema</h1>
            <p className="text-muted-foreground">Configure fields for data collection.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={saveSchema} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fields</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {fields.map((field, index) => (
                <Card key={field.id} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 text-destructive hover:text-destructive"
                    onClick={() => removeField(field.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <CardContent className="pt-6 grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Label</Label>
                      <Input
                        value={field.label}
                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Key (Database Name)</Label>
                      <Input
                        value={field.key}
                        onChange={(e) => updateField(field.id, { key: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select
                        value={field.type}
                        onValueChange={(value: FieldType) => updateField(field.id, { type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="select">Select (Dropdown)</SelectItem>
                          <SelectItem value="image">Image / Photo</SelectItem>
                          <SelectItem value="boolean">Yes / No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2 pt-8">
                      <Switch
                        checked={field.required}
                        onCheckedChange={(checked) => updateField(field.id, { required: checked })}
                      />
                      <Label>Required</Label>
                    </div>
                    {field.type === "select" && (
                      <div className="col-span-2 space-y-2">
                        <Label>Options (comma separated)</Label>
                        <Input
                          value={field.options || ""}
                          onChange={(e) => updateField(field.id, { options: e.target.value })}
                          placeholder="Option 1, Option 2, Option 3"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full" onClick={addField}>
                <Plus className="mr-2 h-4 w-4" />
                Add Field
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Schema Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
