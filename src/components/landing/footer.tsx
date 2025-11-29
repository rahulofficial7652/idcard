import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-14 px-6">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-4">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold">ID Generator</h2>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            A modern SaaS platform for generating, managing and designing ID cards with advanced controls.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-semibold mb-3 text-foreground">Product</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/templates">Templates</Link></li>
            <li><Link href="/dashboard-preview">Dashboard Preview</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-3 text-foreground">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-3 text-foreground">Connect</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="https://github.com" target="_blank">GitHub</a></li>
            <li><a href="https://twitter.com" target="_blank">Twitter</a></li>
            <li><a href="mailto:contact@example.com">Email Support</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ID Generator — All rights reserved.
      </div>
    </footer>
  );
}
