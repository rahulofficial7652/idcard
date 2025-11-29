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
import { CalendarDays, Download, Search } from "lucide-react";

export default function AuditLogsPage() {
  const logs = [
    {
      action: "User Created",
      description: "Admin created new employee: Rohan Singh",
      user: "Admin",
      role: "Super Admin",
      ip: "192.168.1.32",
      device: "Chrome - Windows",
      resource: "User",
      status: "Success",
      time: "2 mins ago",
    },
    {
      action: "Field Updated",
      description: "Updated field: Student Roll Number",
      user: "Manager",
      role: "Manager",
      ip: "192.168.1.15",
      device: "Chrome - Android",
      resource: "Field",
      status: "Success",
      time: "20 mins ago",
    },
    {
      action: "Login Failed",
      description: "Incorrect password attempt",
      user: "Employee",
      role: "Staff",
      ip: "10.43.1.60",
      device: "Firefox - Windows",
      resource: "Auth",
      status: "Failed",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-8">

      {/* PAGE HEADER */}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Audit Logs</h2>
        <p className="text-muted-foreground text-sm">
          Track all actions performed across the system.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="grid gap-4 md:grid-cols-4">

        {/* Search */}
        <div className="relative col-span-2 md:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search logs..." className="pl-10" />
        </div>

        {/* Action Filter */}
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Action Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="create">Create</SelectItem>
            <SelectItem value="update">Update</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
            <SelectItem value="login">Login</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Range */}
        <Button variant="outline" className="gap-2">
          <CalendarDays className="h-4 w-4" /> Date Range
        </Button>
      </div>

      {/* AUDIT LOGS TABLE */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">System Activity Log</CardTitle>
          <CardDescription>All recorded system actions</CardDescription>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <Table>

            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {logs.map((log, index) => (
                <TableRow key={index}>
                  
                  <TableCell className="font-medium">{log.action}</TableCell>

                  <TableCell>{log.description}</TableCell>

                  <TableCell>{log.user}</TableCell>

                  <TableCell>
                    <Badge>{log.role}</Badge>
                  </TableCell>

                  <TableCell>{log.ip}</TableCell>

                  <TableCell className="whitespace-nowrap">{log.device}</TableCell>

                  <TableCell>
                    <Badge variant="secondary">{log.resource}</Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        log.status === "Success" ? "default" :
                        log.status === "Failed" ? "destructive" : "secondary"
                      }
                      className="capitalize"
                    >
                      {log.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {log.time}
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>

          </Table>
        </CardContent>
      </Card>

      {/* EXPORT BUTTONS */}
      <div className="flex gap-3 justify-end">
        <Button variant="secondary" className="gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </Button>

        <Button className="gap-2">
          <Download className="h-4 w-4" /> Export PDF
        </Button>
      </div>

    </div>
  );
}
