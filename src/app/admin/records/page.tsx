import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Download, FileText } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export default async function RecordsPage({ searchParams }: { searchParams: Promise<{ schemaId?: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user || !session.user.organizationId) return <div>Unauthorized</div>

  const { schemaId } = await searchParams

  const whereClause: any = {
    organizationId: session.user.organizationId
  }

  if (schemaId) {
    whereClause.schemaId = schemaId
  }

  const records = await prisma.record.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    include: {
      schema: true,
      template: true
    }
  })

  const schemas = await prisma.fieldSchema.findMany({
    where: { organizationId: session.user.organizationId }
  })

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Records</h1>
          <p className="text-muted-foreground">View and manage collected ID card data.</p>
        </div>
        <div className="flex gap-2">
          {schemaId && (
            <Button variant="outline" asChild>
              <a href={`/api/records/export?schemaId=${schemaId}`} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </a>
            </Button>
          )}
          <Button asChild>
            <Link href="/admin/records/new">
              <Plus className="mr-2 h-4 w-4" />
              New Record
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex gap-2 pb-4 overflow-x-auto">
        <Button 
          variant={!schemaId ? "default" : "outline"} 
          asChild
          className="whitespace-nowrap"
        >
          <Link href="/admin/records">All Records</Link>
        </Button>
        {schemas.map(s => (
          <Button 
            key={s.id} 
            variant={schemaId === s.id ? "default" : "outline"}
            asChild
            className="whitespace-nowrap"
          >
            <Link href={`/admin/records?schemaId=${s.id}`}>{s.name}</Link>
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Collected Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Schema</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Data Preview</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No records found.
                  </TableCell>
                </TableRow>
              ) : (
                records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-mono text-xs">{record.id.slice(0, 8)}...</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {record.schema.name}
                      </div>
                    </TableCell>
                    <TableCell>{record.status}</TableCell>
                    <TableCell>{format(record.createdAt, "MMM d, yyyy")}</TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground">
                      {JSON.stringify(record.dataJson)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
