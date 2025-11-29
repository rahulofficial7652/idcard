"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Save, ShieldCheck, Trash2, User } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-6 flex flex-col gap-8">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Settings</h2>
        <p className="text-muted-foreground text-sm">
          Manage your account, application preferences and security.
        </p>
      </div>

      {/* ACCOUNT SETTINGS */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Account Settings</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-6">

          <Input placeholder="Full Name" />

          <Input placeholder="Email Address" type="email" />

          <Input placeholder="Phone Number" />

          <div className="flex flex-col">
            <label className="text-sm mb-2 font-medium">Profile Picture</label>
            <Button variant="outline" className="gap-2">
              <User className="h-4 w-4" /> Upload Avatar
            </Button>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium">Change Password</label>
            <Input type="password" placeholder="New Password" />
          </div>

        </CardContent>
      </Card>

      {/* SYSTEM SETTINGS */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">System Settings</CardTitle>
          <CardDescription>Customize your app preferences</CardDescription>
        </CardHeader>

        <CardContent className="grid md:grid-cols-3 gap-6">

          <div>
            <label className="text-sm font-medium">Timezone</label>
            <Select>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ist">Asia/Kolkata (IST)</SelectItem>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="pst">PST</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Date Format</label>
            <Select>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Language</label>
            <Select>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="English" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between md:col-span-3 border p-4 rounded-lg">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-muted-foreground text-sm">Enable dark theme</p>
            </div>
            <Switch />
          </div>

        </CardContent>
      </Card>

      {/* NOTIFICATIONS */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Notifications</CardTitle>
          <CardDescription>Control email alerts and system notifications</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">

          <div className="flex items-center justify-between border p-4 rounded-lg">
            <span>Email Notifications</span>
            <Switch />
          </div>

          <div className="flex items-center justify-between border p-4 rounded-lg">
            <span>Login Alerts</span>
            <Switch />
          </div>

          <div className="flex items-center justify-between border p-4 rounded-lg">
            <span>ID Generation Alerts</span>
            <Switch />
          </div>

          <div className="flex items-center justify-between border p-4 rounded-lg">
            <span>Weekly Reports</span>
            <Switch />
          </div>

        </CardContent>
      </Card>

      {/* SECURITY SETTINGS */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Security</CardTitle>
          <CardDescription>Manage login security and authentication</CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">

          <div className="flex items-center justify-between border p-4 rounded-lg">
            <span>Two-Factor Authentication (2FA)</span>
            <Switch />
          </div>

          <div className="flex items-center justify-between border p-4 rounded-lg">
            <span>Logout All Sessions</span>
            <Button variant="outline" className="gap-2">
              <ShieldCheck className="h-4 w-4" /> Logout
            </Button>
          </div>

        </CardContent>
      </Card>

      {/* DANGER ZONE */}
      <Card className="shadow-sm border-red-300">
        <CardHeader>
          <CardTitle className="text-lg text-red-600">Danger Zone</CardTitle>
          <CardDescription>These actions are irreversible</CardDescription>
        </CardHeader>

        <CardContent className="flex justify-between items-center">
          <span className="text-red-600 font-medium">Delete Organization</span>
          <Button variant="destructive" className="gap-2">
            <Trash2 className="h-4 w-4" /> Delete
          </Button>
        </CardContent>
      </Card>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <Button className="gap-2 px-6">
          <Save className="h-4 w-4" /> Save All Settings
        </Button>
      </div>

    </div>
  );
}
