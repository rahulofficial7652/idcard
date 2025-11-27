import Link from 'next/link'
import { Navbar } from '@/components/landing/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LayoutTemplate, Users, FileOutput } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center flex-col bg-background">
      <Navbar />
      <main className="flex justify-center flex-col items-center">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container mx-auto px-4 md:px-6">
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-col items-center">
                  <LayoutTemplate className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Visual Designer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Create stunning ID card templates with our drag-and-drop editor. Customize colors, fonts, and layouts.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-col items-center">
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Role-Based Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Manage permissions for admins, data collectors, and users. Secure your data with granular controls.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-col items-center">
                  <FileOutput className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Bulk Export</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Export records to PDF or CSV in bulk. Generate print-ready files in seconds.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-background py-6 w-full shrink-0">
        <div className="container mx-auto flex flex-col gap-2 sm:flex-row items-center px-4 md:px-6">
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
        </div>
      </footer>
    </div>
  )
}