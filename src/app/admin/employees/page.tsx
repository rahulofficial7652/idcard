import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Search } from "lucide-react"

export default function EmployeesPage() {
  const employees = [
    {
      id: "EMP-001",
      name: "Amit Sharma",
      role: "Student",
      class: "10-B",
      photo: "/avatars/01.png",
      status: "Photo Uploaded",
    },
    {
      id: "EMP-002",
      name: "Priya Gupta",
      role: "Teacher",
      class: "-",
      photo: "/avatars/02.png",
      status: "Pending",
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">

      {/* HEADER ROW */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Employees</h2>
          <p className="text-muted-foreground text-sm">
            Manage all students & staff added to your organization.
          </p>
        </div>

        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Employee
        </Button>
      </div>

      {/* SEARCH BAR */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search employees..."
          className="pl-9"
        />
      </div>

      {/* EMPLOYEE TABLE */}
      <div className="rounded-xl border bg-card p-4 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70px]">Photo</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={emp.photo} />
                    <AvatarFallback>NA</AvatarFallback>
                  </Avatar>
                </TableCell>

                <TableCell className="font-medium">{emp.id}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.role}</TableCell>
                <TableCell>{emp.class}</TableCell>
                <TableCell>
                  <span
                    className={`text-sm font-medium ${
                      emp.status === "Photo Uploaded"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {emp.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>
    </div>
  )
}
