"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Search, Mail, MessageSquare, PlayCircle, BookOpen, CheckCircle } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="p-4 md:p-6 space-y-10">

      {/* PAGE HEADER */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">How can we help you?</h1>
        <p className="text-muted-foreground text-sm">
          Find answers, explore tutorials, or contact support.
        </p>

        {/* SEARCH BAR */}
        <div className="relative max-w-xl mx-auto mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            className="pl-11 py-6 text-lg"
            placeholder="Search for help articles..."
          />
        </div>
      </div>

      {/* HELP CATEGORIES */}
      <div className="grid gap-6 md:grid-cols-3">

        <Card className="shadow-sm">
          <CardHeader>
            <BookOpen className="h-6 w-6 text-primary mb-2" />
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Learn the basics of using the system</CardDescription>
          </CardHeader>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <PlayCircle className="h-6 w-6 text-primary mb-2" />
            <CardTitle>Tutorials</CardTitle>
            <CardDescription>Video guides and walkthroughs</CardDescription>
          </CardHeader>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <MessageSquare className="h-6 w-6 text-primary mb-2" />
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Reach us for technical issues</CardDescription>
          </CardHeader>
        </Card>

      </div>

      {/* FAQ SECTION */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
          <CardDescription>Find quick answers to common questions</CardDescription>
        </CardHeader>

        <CardContent>
          <Accordion type="single" collapsible className="w-full space-y-3">

            <AccordionItem value="faq-1">
              <AccordionTrigger>How to create a new ID card template?</AccordionTrigger>
              <AccordionContent>
                Go to <b>Fields</b> → Add new field → Save template.  
                You can preview it under the ID card preview section.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-2">
              <AccordionTrigger>How to add a new employee?</AccordionTrigger>
              <AccordionContent>
                Navigate to <b>Employees</b> → Add employee.  
                Fill required details and save.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-3">
              <AccordionTrigger>Why can’t photos upload?</AccordionTrigger>
              <AccordionContent>
                Ensure the file is under 5MB and in JPG/PNG format.  
                Also check your internet connectivity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-4">
              <AccordionTrigger>How to change organization branding?</AccordionTrigger>
              <AccordionContent>
                Go to <b>Organization Management</b> → Branding.  
                Update logo and color scheme.
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </CardContent>
      </Card>

      {/* SYSTEM STATUS + SUPPORT */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* System Status */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
            <CardDescription>Real-time system availability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <p>All systems are operational</p>
            </div>
            <p className="text-muted-foreground text-sm">
              API, database, and services running normally.
            </p>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Need help?</CardTitle>
            <CardDescription>Contact our support team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">

            <Button className="w-full gap-2">
              <Mail className="h-4 w-4" /> Email Support
            </Button>

            <Button variant="secondary" className="w-full gap-2">
              <MessageSquare className="h-4 w-4" /> Chat Support
            </Button>

          </CardContent>
        </Card>

      </div>

    </div>
  );
}
