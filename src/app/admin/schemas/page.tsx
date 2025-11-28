"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Trash2, Plus, FileJson, Edit, X } from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"
import { v4 as uuidv4 } from "uuid"

interface Schema {
  id: string
  name: string
  jsonSchema: any
  createdAt: string
  creator: {
    name: string | null
  }
}

interface SchemaField {
  id: string
  name: string
  type: string
  required: boolean
}

export default function SchemasPage() {
  const [schemas, setSchemas] = useState<Schema[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null)
  const [schemaName, setSchemaName] = useState("")
  const [fields, setFields] = useState<SchemaField[]>([])

  useEffect(() => {
    fetchSchemas()
  }, [])

  const fetchSchemas = async () => {
    try {
      const res = await fetch("/api/schemas/list")
      const data = await res.json()
      setSchemas(data)
    } catch (error) {
      toast.error("Failed to load schemas")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDialog = (schema?: Schema) => {
    if (schema) {
      setEditingId(schema.id)
      setSchemaName(schema.name)
      // Parse fields from JSON schema
      // Assuming structure: { fields: [{ name, type, required }] }
      const schemaFields = schema.jsonSchema?.fields || []
      setFields(schemaFields.map((f: any) => ({ ...f, id: uuidv4() })))
    } else {
      setEditingId(null)
      setSchemaName("")
      setFields([])
    }
    setIsDialogOpen(true)
  }

  const addField = () => {
    setFields([...fields, { id: uuidv4(), name: "", type: "text", required: false }])
  }

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id))
  }

  const updateField = (id: string, key: keyof SchemaField, value: any) => {
    setFields(fields.map(f => f.id === id ? { ...f, [key]: value } : f))
  }

  const handleSave = async () => {
    if (!schemaName) return toast.error("Schema name is required")
    if (fields.length === 0) return toast.error("At least one field is required")
    if (fields.some(f => !f.name)) return toast.error("All fields must have a name")

    const jsonSchema = {
      fields: fields.map(({ id, ...rest }) => rest)
    }

    try {
      const url = editingId ? `/api/schemas/${editingId}` : "/api/schemas"
      const method = editingId ? "PATCH" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: schemaName,
          jsonSchema: JSON.stringify(jsonSchema)
        })
      })

      if (!res.ok) throw new Error("Failed to save")

      toast.success(editingId ? "Schema updated" : "Schema created")
      setIsDialogOpen(false)
      fetchSchemas()
    } catch (error) {
      toast.error("Failed to save schema")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This cannot be undone.")) return

    try {
      const res = await fetch(`/api/schemas/${id}`, {
        method: "DELETE"
      })

      if (!res.ok) throw new Error("Failed to delete")

      toast.success("Schema deleted")
      fetchSchemas()
    } catch (error) {
      toast.error("Failed to delete schema")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schemas</h1>
          <p className="text-muted-foreground">Define data structures for your ID cards.</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Create Schema
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Schema" : "Create New Schema"}</DialogTitle>
            <DialogDescription>
              Define the fields for your ID card data.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Schema Name</Label>
              <Input
                id="name"
                value={schemaName}
                onChange={(e) => setSchemaName(e.target.value)}
                placeholder="e.g., Employee Standard"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Fields</Label>
                <Button variant="outline" size="sm" onClick={addField}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Field
                </Button>
              </div>

              {fields.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed rounded-lg text-muted-foreground">
                  No fields added. Click "Add Field" to start.
                </div>
              )}

              {fields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-3 p-3 border rounded-md bg-muted/20">
                  <div className="grid gap-2 flex-1">
                    <Label className="text-xs">Field Name</Label>
                    <Input
                      value={field.name}
                      onChange={(e) => updateField(field.id, "name", e.target.value)}
                      placeholder="e.g., Department"
                    />
                  </div>
                  <div className="grid gap-2 w-[140px]">
                    <Label className="text-xs">Type</Label>
                    <Select
                      value={field.type}
                      onValueChange={(val) => updateField(field.id, "type", val)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="select">Select</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2 items-center justify-center pb-3 px-2">
                    <Label className="text-xs mb-1">Req.</Label>
                    <Checkbox
                      checked={field.required}
                      onCheckedChange={(checked) => updateField(field.id, "required", checked)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mb-0.5"
                    onClick={() => removeField(field.id)}
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Schema</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Fields</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : schemas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No schemas found.
                </TableCell>
              </TableRow>
            ) : (
              schemas.map((schema) => (
                <TableRow key={schema.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileJson className="h-4 w-4 text-muted-foreground" />
                    {schema.name}
                  </TableCell>
                  <TableCell>
                    {schema.jsonSchema?.fields?.length || 0} fields
                  </TableCell>
                  <TableCell>{schema.creator.name || "Unknown"}</TableCell>
                  <TableCell>
                    {format(new Date(schema.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(schema)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(schema.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
