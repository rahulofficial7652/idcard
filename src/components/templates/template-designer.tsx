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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface TemplateDesignerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  template: any
}

export function TemplateDesigner({ template }: TemplateDesignerProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState(template.name)
  const [settings, setSettings] = useState(template.settingsJson || {
    primaryColor: "#000000",
    font: "Inter",
    layout: "standard"
  })

  const updateSetting = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value })
  }

  const saveTemplate = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/templates/${template.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          settingsJson: settings
        }),
      })

      if (!res.ok) throw new Error("Failed to save template")

      toast.success("Template saved successfully")
      router.refresh()
    } catch (error) {
      toast.error("Failed to save template")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/templates">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Design Template</h1>
            <p className="text-muted-foreground">Customize the look of your ID cards.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={saveTemplate} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Template Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex gap-2">
                  <Input 
                    type="color" 
                    value={settings.primaryColor} 
                    onChange={(e) => updateSetting("primaryColor", e.target.value)}
                    className="w-12 p-1 h-10"
                  />
                  <Input 
                    value={settings.primaryColor} 
                    onChange={(e) => updateSetting("primaryColor", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Font Family</Label>
                <Select
                  value={settings.font}
                  onValueChange={(value) => updateSetting("font", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                    <SelectItem value="Courier New">Courier New</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Layout Style</Label>
                <Select
                  value={settings.layout}
                  onValueChange={(value) => updateSetting("layout", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard (Portrait)</SelectItem>
                    <SelectItem value="landscape">Landscape</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="h-full bg-muted/40 flex items-center justify-center p-8">
            {/* Live Preview */}
            <div 
              className="bg-card shadow-xl rounded-lg overflow-hidden relative transition-all duration-300"
              style={{
                width: settings.layout === "landscape" ? "500px" : "320px",
                height: settings.layout === "landscape" ? "300px" : "480px",
                fontFamily: settings.font,
                borderTop: `8px solid ${settings.primaryColor}`
              }}
            >
              <div className="p-6 space-y-4 text-center">
                <div 
                  className="w-24 h-24 rounded-full mx-auto bg-muted border-4 border-background shadow-sm"
                  style={{ borderColor: settings.primaryColor }}
                />
                <div>
                  <h2 className="text-xl font-bold text-slate-900">John Doe</h2>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Software Engineer</p>
                </div>
                <div className="pt-4 space-y-2 text-left text-sm">
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-slate-500">ID Number</span>
                    <span className="font-medium">EMP-12345</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-slate-500">Department</span>
                    <span className="font-medium">Engineering</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-slate-500">Joined</span>
                    <span className="font-medium">Jan 2023</span>
                  </div>
                </div>
                <div 
                  className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-center text-white text-xs"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  Acme Corp Inc.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
