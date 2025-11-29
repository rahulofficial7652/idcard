"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function PermissionsPage() {
  const defaultRoles = [
    {
      role: "Admin",
      permissions: {
        create: true,
        edit: true,
        delete: true,
        view: true,
        download: true,
      },
    },
    {
      role: "Employee",
      permissions: {
        create: false,
        edit: false,
        delete: false,
        view: true,
        download: true,
      },
    },
    {
      role: "Manager",
      permissions: {
        create: true,
        edit: true,
        delete: false,
        view: true,
        download: true,
      },
    },
    
  ];

  const [roles, setRoles] = useState(defaultRoles);

  const updatePermission = (roleIndex, permissionKey, value) => {
    const updated = [...roles];
    updated[roleIndex].permissions[permissionKey] = value;
    setRoles(updated);
  };

  return (
    <div className="p-4 md:p-6 flex flex-col gap-8">

      {/* PAGE HEADER */}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Permissions</h2>
        <p className="text-muted-foreground text-sm">
          Control access levels and role-based permissions for all users.
        </p>
      </div>

      {/* PERMISSION CARDS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {roles.map((role, roleIndex) => (
          <Card key={role.role} className="border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{role.role}</CardTitle>
              <CardDescription>Manage {role.role.toLowerCase()} permissions</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">

              {Object.keys(role.permissions).map((perm) => (
                <div key={perm} className="flex items-center justify-between">
                  <span className="capitalize text-sm font-medium">{perm}</span>
                  <Switch
                    checked={role.permissions[perm]}
                    onCheckedChange={(v) => updatePermission(roleIndex, perm, v)}
                  />
                </div>
              ))}

            </CardContent>
          </Card>
        ))}

      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <Button className="gap-2 px-6">
          <Save className="h-4 w-4" /> Save Changes
        </Button>
      </div>

    </div>
  );
}
