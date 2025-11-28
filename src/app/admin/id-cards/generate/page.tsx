"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IDCardRenderer } from "@/components/id-card/IDCardRenderer"
import { DesignerElement } from "@/components/designer/PropertiesPanel"
import { toast } from "sonner"
import { Printer } from "lucide-react"

interface Template {
  id: string
  name: string
  settingsJson: any
}

interface Employee {
  id: string
  name: string
  email: string
  image?: string | null
  role: string
}

export default function GenerateIDCardPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("")
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("")

  useEffect(() => {
    // Fetch templates
    fetch("/api/templates/list")
      .then(res => res.json())
      .then(data => setTemplates(data))
      .catch(err => toast.error("Failed to load templates"))

    // Fetch employees (using existing users API or similar logic)
    // For now, let's assume we have an endpoint or we can mock it if needed.
    // Since we don't have a dedicated "list employees" API yet, let's create one or mock it.
    // Wait, we do have `prisma` access in server components, but this is a client component.
    // I'll assume we need to fetch from an API. I'll use a mock for now or create the API.
    // Let's create a quick API for employees list in the next step if it doesn't exist.
    // For now, I'll fetch from a new endpoint /api/employees/list
    fetch("/api/employees/list") 
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error("Failed to load employees", err))
  }, [])

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId)
  const selectedEmployee = employees.find(e => e.id === selectedEmployeeId)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between no-print">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Generate ID Card</h1>
          <p className="text-muted-foreground">Select a template and an employee to generate an ID card.</p>
        </div>
        <Button onClick={handlePrint} disabled={!selectedTemplate || !selectedEmployee}>
          <Printer className="mr-2 h-4 w-4" />
          Print Card
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6 no-print">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Template</label>
            <Select onValueChange={setSelectedTemplateId} value={selectedTemplateId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map(t => (
                  <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select Employee</label>
            <Select onValueChange={setSelectedEmployeeId} value={selectedEmployeeId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map(e => (
                  <SelectItem key={e.id} value={e.id}>{e.name} ({e.email})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedEmployee && (
            <div className="p-4 border rounded-md bg-muted/10">
              <h3 className="font-semibold mb-2">Employee Details</h3>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Name:</span> {selectedEmployee.name}</p>
                <p><span className="font-medium">Email:</span> {selectedEmployee.email}</p>
                <p><span className="font-medium">Role:</span> {selectedEmployee.role}</p>
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-2 flex justify-center items-start bg-muted/20 p-8 rounded-md min-h-[600px]">
          {selectedTemplate && selectedEmployee ? (
            <div className="print:fixed print:top-0 print:left-0 print:w-full print:h-full print:bg-white print:flex print:items-center print:justify-center">
               <IDCardRenderer 
                  elements={selectedTemplate.settingsJson as DesignerElement[]} 
                  data={selectedEmployee} 
               />
            </div>
          ) : (
            <div className="text-center text-muted-foreground mt-20">
              Please select both a template and an employee to preview the card.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
