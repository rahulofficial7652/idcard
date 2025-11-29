"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, CalendarDays } from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const lineData = [
  { day: "Mon", ids: 32 },
  { day: "Tue", ids: 45 },
  { day: "Wed", ids: 20 },
  { day: "Thu", ids: 37 },
  { day: "Fri", ids: 60 },
  { day: "Sat", ids: 28 },
  { day: "Sun", ids: 48 },
];

const pieData = [
  { name: "Students", value: 230 },
  { name: "Staff", value: 70 },
];

const COLORS = ["#6366F1", "#EC4899"];

const recentLogs = [
  { action: "ID Generated", user: "Amit Sharma", time: "2 mins ago" },
  { action: "Photo Uploaded", user: "Anita Singh", time: "10 mins ago" },
  { action: "Field Updated", user: "Admin", time: "1 hour ago" },
  { action: "Template Applied", user: "Manager", time: "3 hours ago" },
];

export default function ReportsPage() {
  return (
    <div className="p-4 md:p-6 space-y-8">

      {/* PAGE HEADER */}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Reports & Analytics</h2>
        <p className="text-muted-foreground text-sm">
          View insights and statistics about generated ID cards.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid gap-6 md:grid-cols-4">
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Total IDs</CardTitle>
            <CardDescription>Total generated so far</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,340</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Today’s IDs</CardTitle>
            <CardDescription>Generated today</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">42</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Active Students</CardTitle>
            <CardDescription>With valid ID</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">980</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Active Staff</CardTitle>
            <CardDescription>With valid ID</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">360</p>
          </CardContent>
        </Card>

      </div>

      {/* CHARTS SECTION */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Line Chart */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>ID Generated Per Day</CardTitle>
            <CardDescription>Last 7 days analytics</CardDescription>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ids" stroke="#6366F1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>ID Distribution</CardTitle>
            <CardDescription>Students vs Staff</CardDescription>
          </CardHeader>
          <CardContent className="h-[260px] flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

      {/* RECENT ACTIVITY */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <CardDescription>Logs of latest operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentLogs.map((log, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-3">
              <div>
                <p className="font-medium">{log.action}</p>
                <p className="text-sm text-muted-foreground">{log.user}</p>
              </div>
              <span className="text-xs text-muted-foreground">{log.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* EXPORT SECTION */}
      <div className="flex gap-3 justify-end">
        <Button variant="outline" className="gap-2">
          <CalendarDays className="h-4 w-4" /> Last 30 Days
        </Button>
        <Button className="gap-2">
          <FileText className="h-4 w-4" /> Export PDF
        </Button>
        <Button className="gap-2" variant="secondary">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

    </div>
  );
}
