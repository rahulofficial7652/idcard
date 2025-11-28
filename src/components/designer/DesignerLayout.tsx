"use client"

import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

interface DesignerLayoutProps {
  children: ReactNode
  toolbar: ReactNode
  propertiesPanel: ReactNode
  onSave: () => void
}

export function DesignerLayout({ children, toolbar, propertiesPanel, onSave }: DesignerLayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-muted/20">
      {/* Header */}
      <header className="h-14 border-b bg-background flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/id-cards">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-semibold">ID Card Designer</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={onSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Template
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Toolbar (Left) */}
        <aside className="w-64 border-r bg-background flex flex-col">
          <div className="p-4 font-medium border-b">Tools</div>
          <div className="flex-1 overflow-y-auto p-4">
            {toolbar}
          </div>
        </aside>

        {/* Canvas Area (Center) */}
        <main className="flex-1 overflow-auto bg-muted/20 p-8 flex items-center justify-center">
          {children}
        </main>

        {/* Properties Panel (Right) */}
        <aside className="w-72 border-l bg-background flex flex-col">
          <div className="p-4 font-medium border-b">Properties</div>
          <div className="flex-1 overflow-y-auto p-4">
            {propertiesPanel}
          </div>
        </aside>
      </div>
    </div>
  )
}
