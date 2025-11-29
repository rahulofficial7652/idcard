"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Have questions or want to learn more? Feel free to reach out — we’re here to help!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <div className="space-y-6">
          <Card className="p-4">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <Mail className="h-6 w-6 text-primary" />
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              support@idcardpro.com
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <Phone className="h-6 w-6 text-primary" />
              <CardTitle>Phone</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              +91 98765 43210
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <MapPin className="h-6 w-6 text-primary" />
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Varanasi, Uttar Pradesh, India
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>

          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Your Name</label>
                <Input placeholder="John Doe" required />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="you@example.com" required />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea rows={4} placeholder="Write your message..." required />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
