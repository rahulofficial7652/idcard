"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Trash2, ShieldCheck, Search } from "lucide-react";

export default function UserManagementPage() {
  const [users] = useState([
    {
      id: 1,
      name: "Amit Verma",
      email: "amit@example.com",
      phone: "9876543210",
      role: "Admin",
      status: "Active",
      joined: "2024-11-12",
      avatar: "/avatars/01.png",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "9123456780",
      role: "Employee",
      status: "Inactive",
      joined: "2024-12-05",
      avatar: "/avatars/02.png",
    },
    {
      id: 3,
      name: "Rohan Singh",
      email: "rohan@example.com",
      phone: "9988776655",
      role: "Manager",
      status: "Active",
      joined: "2024-09-10",
      avatar: "/avatars/03.png",
    },
  ]);

  return (
    <div className="p-4 md:p-6 flex flex-col gap-8">

      {/* PAGE HEADER */}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">User Management</h2>
        <p className="text-muted-foreground text-sm">
          Manage user roles, status, and account permissions.
        </p>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center">

        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or email..." className="pl-10" />
        </div>

        {/* Role Filter */}
        <Select>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Filter Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="employee">Employee</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

      </div>

      {/* USERS TABLE */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">All Users</CardTitle>
          <CardDescription>Complete list of organization users.</CardDescription>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <Table>

            <TableHeader>
              <TableRow>
                <TableHead>Profile</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>

                  {/* Avatar */}
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                  </TableCell>

                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>

                  <TableCell>
                    <Badge variant="default" className="capitalize">
                      {user.role}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={user.status === "Active" ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {user.status}
                    </Badge>
                  </TableCell>

                  <TableCell>{user.joined}</TableCell>

                  {/* ACTION BUTTONS */}
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button variant="outline" size="icon">
                      <ShieldCheck className="h-4 w-4" />
                    </Button>

                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>

          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
