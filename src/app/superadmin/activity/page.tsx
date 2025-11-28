import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const mockLogs = [
  { id: 1, user: "John Doe", action: "Created Organization", target: "Acme Corp", date: "2023-10-25 10:30 AM" },
  { id: 2, user: "Jane Smith", action: "Deleted User", target: "Bob Wilson", date: "2023-10-25 11:15 AM" },
  { id: 3, user: "System", action: "Backup Completed", target: "Database", date: "2023-10-25 02:00 AM" },
  { id: 4, user: "Admin User", action: "Updated Settings", target: "Global Config", date: "2023-10-24 04:45 PM" },
  { id: 5, user: "Sarah Jones", action: "Login Failed", target: "IP: 192.168.1.1", date: "2023-10-24 09:20 AM" },
]

export default function ActivityLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Activity Logs</h1>
        <p className="text-muted-foreground">Monitor system-wide user activity and events.</p>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.user}</TableCell>
                <TableCell>
                  <Badge variant="outline">{log.action}</Badge>
                </TableCell>
                <TableCell>{log.target}</TableCell>
                <TableCell>{log.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
