"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

export default function FieldsPage() {
  const [fields, setFields] = useState([
    { id: 1, name: "Full Name", type: "text", required: true },
    { id: 2, name: "Roll Number", type: "number", required: true },
    { id: 3, name: "Class", type: "text", required: false },
    { id: 4, name: "Father Name", type: "text", required: false },
  ])

  const [newField, setNewField] = useState({
    name: "",
    type: "text",
    required: false,
  })

  const addField = () => {
    if (!newField.name.trim()) return
    setFields([
      ...fields,
      { id: Date.now(), ...newField },
    ])
    setNewField({ name: "", type: "text", required: false })
  }

  const deleteField = (id: number) => {
    setFields(fields.filter((f) => f.id !== id))
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Fields</h2>
          <p className="text-muted-foreground text-sm">
            Define custom fields for ID card generation.
          </p>
        </div>
      </div>

      {/* ADD NEW FIELD */}
      <div className="rounded-xl border bg-card p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">

          {/* Field Name */}
          <Input
            placeholder="Field Name"
            value={newField.name}
            onChange={(e) => setNewField({ ...newField, name: e.target.value })}
          />

          {/* Field Type */}
          <Select
            value={newField.type}
            onValueChange={(v) => setNewField({ ...newField, type: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>

          {/* Required Toggle */}
          <div className="flex items-center gap-3">
            <Switch
              checked={newField.required}
              onCheckedChange={(v) => setNewField({ ...newField, required: v })}
            />
            <span>Required</span>
          </div>
        </div>

        <Button className="mt-4 gap-2" onClick={addField}>
          <Plus className="h-4 w-4" /> Add Field
        </Button>
      </div>

      {/* FIELDS TABLE */}
      <div className="rounded-xl border bg-card p-4 shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Field Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Required</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {fields.map((field) => (
              <TableRow key={field.id}>
                <TableCell className="font-medium">{field.name}</TableCell>
                <TableCell className="capitalize">{field.type}</TableCell>
                <TableCell>
                  {field.required ? (
                    <span className="text-green-600 text-sm font-medium">Yes</span>
                  ) : (
                    <span className="text-muted-foreground text-sm">No</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteField(field.id)}
                  >
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </div>
  )
}
