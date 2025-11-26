import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldCheck, LayoutTemplate, Users, FileOutput } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white">
        <Link className="flex items-center justify-center" href="#">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">ID Card Pro</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
        <div className="ml-4 flex gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Professional ID Card Management
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Design, manage, and issue ID cards for your organization with ease. Secure, scalable, and customizable.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" asChild>
                  <Link href="/register">Start Free Trial</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/login">Live Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <LayoutTemplate className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Visual Designer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Create stunning ID card templates with our drag-and-drop editor. Customize colors, fonts, and layouts.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Role-Based Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Manage permissions for admins, data collectors, and users. Secure your data with granular controls.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <FileOutput className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Bulk Export</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Export records to PDF or CSV in bulk. Generate print-ready files in seconds.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 ID Card Pro. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}