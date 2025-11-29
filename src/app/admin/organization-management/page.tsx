"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Save, ImageIcon } from "lucide-react";

export default function OrganizationManagementPage() {
  const [status, setStatus] = useState("active");

  return (
    <div className="p-4 md:p-6 flex flex-col gap-8">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Organization Management</h2>
        <p className="text-muted-foreground text-sm">
          Manage your organization details, branding, and contact information.
        </p>
      </div>

      {/* ORGANIZATION INFO */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Organization Details</CardTitle>
          <CardDescription>Basic information about your organization</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6 md:grid-cols-2">

          <Input placeholder="Organization Name" />

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Organization Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="school">School</SelectItem>
              <SelectItem value="college">College</SelectItem>
              <SelectItem value="coaching">Coaching Center</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="ngo">NGO</SelectItem>
            </SelectContent>
          </Select>

          <Input placeholder="Tagline (optional)" className="md:col-span-2" />

          <Textarea
            placeholder="Short description / About organization"
            className="md:col-span-2"
          />
        </CardContent>
      </Card>

      {/* BRANDING */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Branding</CardTitle>
          <CardDescription>Customize look & identity</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6 md:grid-cols-3">

          {/* Logo Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Logo</label>
            <div className="border rounded-lg p-4 flex items-center justify-center bg-muted/30 h-[120px]">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <Button variant="outline">Upload Logo</Button>
          </div>

          <div>
            <label className="text-sm font-medium">Primary Color</label>
            <Input type="color" className="mt-2 h-10" />
          </div>

          <div>
            <label className="text-sm font-medium">Accent Color</label>
            <Input type="color" className="mt-2 h-10" />
          </div>

        </CardContent>
      </Card>

      {/* CONTACT INFO */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Contact Information</CardTitle>
          <CardDescription>How users can reach your organization</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6 md:grid-cols-2">

          <Input placeholder="Official Email" />
          <Input placeholder="Phone Number" />
          <Input placeholder="Alternate Contact (optional)" />
          <Input placeholder="Website (optional)" />

          <Textarea placeholder="Full Address" className="md:col-span-2" />

          <Input placeholder="City" />
          <Input placeholder="State" />
          <Input placeholder="ZIP Code" />
        </CardContent>
      </Card>

      {/* PRINCIPAL / OWNER */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Principal / Owner Details</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6 md:grid-cols-3">
          <Input placeholder="Name" />
          <Input placeholder="Email" />
          <Input placeholder="Phone" />
        </CardContent>
      </Card>

      {/* STATUS CONTROL */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Organization Status</CardTitle>
        </CardHeader>

        <CardContent className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-medium">Activate Organization</p>
            <p className="text-muted-foreground text-sm">
              Toggle to enable or disable the organization access
            </p>
          </div>

          <Switch
            checked={status === "active"}
            onCheckedChange={(v) => setStatus(v ? "active" : "inactive")}
          />
        </CardContent>
      </Card>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <Button className="gap-2 px-6">
          <Save className="h-4 w-4" /> Save Changes
        </Button>
      </div>

    </div>
  );
}
