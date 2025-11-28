import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const mockTickets = [
  { id: "T-101", subject: "Login Issue", user: "alice@example.com", status: "Open", priority: "High", date: "2023-10-26" },
  { id: "T-102", subject: "Feature Request", user: "bob@example.com", status: "Closed", priority: "Low", date: "2023-10-25" },
  { id: "T-103", subject: "Billing Question", user: "charlie@example.com", status: "In Progress", priority: "Medium", date: "2023-10-24" },
]

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
        <p className="text-muted-foreground">Manage user support requests.</p>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.id}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>{ticket.user}</TableCell>
                <TableCell>
                  <Badge variant={ticket.status === "Open" ? "destructive" : ticket.status === "In Progress" ? "default" : "secondary"}>
                    {ticket.status}
                  </Badge>
                </TableCell>
                <TableCell>{ticket.priority}</TableCell>
                <TableCell>{ticket.date}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
