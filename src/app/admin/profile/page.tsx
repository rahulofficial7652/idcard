"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Camera, Save, ShieldCheck, KeyRound, Mail } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-6 space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Profile</h2>
        <p className="text-muted-foreground text-sm">
          Manage your personal information and account settings.
        </p>
      </div>

      {/* PROFILE CARD */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
          <CardDescription>
            This information will be visible within your organization.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">

          {/* Avatar Upload */}
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/avatars/default.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <Button variant="outline" className="gap-2">
              <Camera className="h-4 w-4" /> Change Avatar
            </Button>
          </div>

          {/* Name & Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input placeholder="Enter your full name" className="mt-2" />
            </div>

            <div>
              <label className="text-sm font-medium">Email Address</label>
              <Input type="email" placeholder="Email" className="mt-2" />
            </div>
          </div>

          {/* Phone & Role */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <Input placeholder="Mobile number" className="mt-2" />
            </div>

            <div>
              <label className="text-sm font-medium">Role</label>
              <Input disabled value="Admin" className="mt-2" />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm font-medium">Bio (optional)</label>
            <Textarea
              placeholder="Write something about yourself..."
              className="mt-2"
            />
          </div>

          <Button className="gap-2 mt-4">
            <Save className="h-4 w-4" /> Save Profile
          </Button>
        </CardContent>
      </Card>

      {/* SECURITY SETTINGS */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Security Settings</CardTitle>
          <CardDescription>Manage password and login security</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Change Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <KeyRound className="h-4 w-4" /> Change Password
            </label>
            <Input type="password" placeholder="New password" />
          </div>

          {/* 2FA */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Two-Factor Authentication
            </label>
            <Button variant="outline" className="w-full md:w-auto">Enable 2FA</Button>
          </div>
        </CardContent>
      </Card>

      {/* CONTACT SUPPORT */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Support</CardTitle>
          <CardDescription>Reach us in case of any issues</CardDescription>
        </CardHeader>

        <CardContent className="flex justify-between items-center">
          <span className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4" /> Need help or have an issue?
          </span>

          <Button variant="secondary">Contact Support</Button>
        </CardContent>
      </Card>

    </div>
  );
}
