import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Cpu } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* Hero Section */}
      <section className="px-6 pt-32 pb-24 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Build Professional  
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            {" "}ID Cards
          </span>
          {" "}Effortlessly
        </h1>

        <p className="mt-6 text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
          A modern SaaS platform to create, design & manage ID Cards with 
          custom fields, admin roles and client-side image processing.
        </p>

        <div className="flex justify-center gap-4 mt-10">
          <Button size="lg" className="px-8 py-6 text-lg">Get Started</Button>
          <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
            Login
          </Button>
        </div>

        {/* Hero Image */}
        <div className="mt-20 max-w-4xl mx-auto">
          <Image
            src="/dashboard.jpg" // apni dashboard image yahan add karo
            alt="Dashboard Preview"
            width={1200}
            height={700}
            className="rounded-2xl border border-border shadow-lg"
          />
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="px-6 py-20 border-t border-border bg-muted/10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
          Everything You Need to Build Efficient Workflows
        </h2>

        <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          
          <div className="p-7 bg-card border border-border rounded-xl shadow-sm">
            <Shield className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Super Admin Control</h3>
            <p className="text-muted-foreground">
              Manage admins, restrict permissions and approve organizations with full security.
            </p>
          </div>

          <div className="p-7 bg-card border border-border rounded-xl shadow-sm">
            <CheckCircle className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Custom ID Templates</h3>
            <p className="text-muted-foreground">
              Create your own form structure with unlimited fields and mandatory options.
            </p>
          </div>

          <div className="p-7 bg-card border border-border rounded-xl shadow-sm">
            <Cpu className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Client-Side Processing</h3>
            <p className="text-muted-foreground">
              Crop, compress & resize photos before uploading. Zero server load & instant response.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center border-t border-border text-muted-foreground">
        © {new Date().getFullYear()} ID Generator — All rights reserved.
      </footer>

    </main>
  );
}
