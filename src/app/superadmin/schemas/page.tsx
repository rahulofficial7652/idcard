"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileJson } from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"

interface Schema {
  id: string
  name: string
  createdAt: string
  organization: {
    name: string
  }
  creator: {
    name: string | null
  }
}

export default function SuperAdminSchemasPage() {
  const [schemas, setSchemas] = useState<Schema[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">All Schemas</h1>
        <p className="text-muted-foreground">View schemas across all organizations.</p>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : schemas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
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
                  <TableCell>{schema.organization.name}</TableCell>
                  <TableCell>{schema.creator.name || "Unknown"}</TableCell>
                  <TableCell>
                    {format(new Date(schema.createdAt), "MMM d, yyyy")}
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
