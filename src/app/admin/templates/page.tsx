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
import { Edit, Trash2, Plus } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { format } from "date-fns"

interface Template {
  id: string
  name: string
  createdAt: string
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const res = await fetch("/api/templates/list")
      const data = await res.json()
      setTemplates(data)
    } catch (error) {
      toast.error("Failed to load templates")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return

    try {
      const res = await fetch(`/api/templates/${id}`, {
        method: "DELETE"
      })

      if (!res.ok) throw new Error("Failed to delete")

      toast.success("Template deleted")
      fetchTemplates()
    } catch (error) {
      toast.error("Failed to delete template")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">Manage your ID card templates.</p>
        </div>
        <Button asChild>
          <Link href="/admin/id-cards/designer">
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Link>
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : templates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                  No templates found. Create one to get started.
                </TableCell>
              </TableRow>
            ) : (
              templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>
                    {format(new Date(template.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {/* Edit functionality would require loading the template into designer. 
                        For now, we just link to designer, but ideally we'd pass the ID. 
                        Let's just keep Delete for MVP or link to designer as 'New' */}
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(template.id)}>
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
