import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function IDCardsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ID Cards</h1>
          <p className="text-muted-foreground">Manage and create ID cards for your organization.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href="/admin/id-cards/generate">
              <Plus className="mr-2 h-4 w-4" />
              Generate Card
            </a>
          </Button>
          <Button asChild>
            <a href="/admin/id-cards/designer">
              <Plus className="mr-2 h-4 w-4" />
              Create New Template
            </a>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center h-[400px] border rounded-md bg-muted/10 border-dashed">
        <div className="text-center">
          <h3 className="mt-2 text-lg font-semibold">No ID Cards Created</h3>
          <p className="text-sm text-muted-foreground">Get started by creating a new ID card.</p>
        </div>
      </div>
    </div>
  )
}
