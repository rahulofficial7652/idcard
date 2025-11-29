"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";

export default function IDCardFieldsPage() {
  const [fields, setFields] = useState([
    { name: "Full Name", type: "text", required: true },
    { name: "Roll Number", type: "number", required: true },
    { name: "Class", type: "text", required: false },
  ]);

  const [savedFields, setSavedFields] = useState<typeof fields>([]);
  const [showPreview, setShowPreview] = useState(false);

  const addRow = () => {
    setFields([...fields, { name: "", type: "text", required: false }]);
  };

  const updateField = (index: number, key: string, value: any) => {
    const updated = [...fields];
    // @ts-ignore
    updated[index][key] = value;
    setFields(updated);
  };

  const deleteRow = (index: number) => {
    const updated = fields.filter((_, i) => i !== index);
    setFields(updated);
    // Also update saved fields if we want immediate feedback, or let user save again.
    // User asked to edit/delete "saved" fields.
    // If we delete here, we should probably sync it or require save.
    // Let's sync it for better UX if it's already saved.
    if (showPreview) {
       setSavedFields(updated);
    }
  };

  const handleSave = () => {
    setSavedFields([...fields]);
    setShowPreview(true);
  };

  const handleEdit = (index: number) => {
    // Scroll to top or highlight
    const element = document.getElementById(`field-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.focus();
    }
  };

  return (
    <div className="p-4 md:p-6 flex flex-col gap-6">

      {/* PAGE HEADER */}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">ID Card Fields</h2>
        <p className="text-muted-foreground text-sm">
          Build your ID card layout by selecting all fields in one place.
        </p>
      </div>

      {/* ONE-SCREEN FIELD BUILDER */}
      <div className="rounded-xl border bg-card p-4 shadow-sm space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 font-medium text-sm text-muted-foreground">
          <span className="md:col-span-4">Field Name</span>
          <span className="md:col-span-3">Field Type</span>
          <span className="md:col-span-3">Required</span>
          <span className="md:col-span-2 text-right">Action</span>
        </div>

        {fields.map((field, index) => (
          <div
            key={index}
            id={`field-${index}`}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center border rounded-lg p-3 bg-background"
          >
            {/* Field Name */}
            <Input
              className="md:col-span-4"
              placeholder="Enter field name"
              value={field.name}
              onChange={(e) => updateField(index, "name", e.target.value)}
            />

            {/* Field Type */}
            <Select
              value={field.type}
              onValueChange={(v) => updateField(index, "type", v)}
            >
              <SelectTrigger className="md:col-span-3">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="image">Image</SelectItem>
              </SelectContent>
            </Select>

            {/* Required Toggle */}
            <div className="flex items-center gap-3 md:col-span-3">
              <Switch
                checked={field.required}
                onCheckedChange={(v) => updateField(index, "required", v)}
              />
              <span className="text-sm">Required</span>
            </div>

            {/* Delete */}
            <div className="md:col-span-2 flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteRow(index)}
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          </div>
        ))}

        {/* ADD NEW FIELD ROW */}
        <div className="flex flex-col md:flex-row gap-4 pt-2">
            <Button className="gap-2 w-full md:w-auto" variant="outline" onClick={addRow}>
            <Plus className="h-4 w-4" /> Add New Field
            </Button>
            
            <Button className="gap-2 w-full md:w-auto" onClick={handleSave}>
            Save Configuration
            </Button>
        </div>
      </div>

      {/* PREVIEW SECTION */}
      {showPreview && (
        <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-semibold">Form Preview</h3>
            <p className="text-muted-foreground text-sm">
              This is how the form will appear to the users.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {savedFields.map((field, index) => (
              <div key={index} className="space-y-2 p-4 border rounded-lg relative group">
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleEdit(index)}>
                        <span className="sr-only">Edit</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          <path d="m15 5 4 4" />
                        </svg>
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500" onClick={() => deleteRow(index)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>

                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {field.name} {field.required && <span className="text-red-500">*</span>}
                </label>
                
                {field.type === "text" && <Input placeholder={`Enter ${field.name}`} />}
                {field.type === "number" && <Input type="number" placeholder={`Enter ${field.name}`} />}
                {field.type === "email" && <Input type="email" placeholder={`Enter ${field.name}`} />}
                {field.type === "date" && <Input type="date" />}
                {field.type === "image" && <Input type="file" accept="image/*" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
