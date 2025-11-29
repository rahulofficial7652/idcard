import {
  Shield,
  UserCog,
  Crop,
  Cpu,
  Database,
  CheckCircle,
} from "lucide-react";

export default function Feature() {
  const features = [
    {
      title: "Custom Fields Engine",
      description:
        "Create unlimited fields, set mandatory fields, and build flexible ID card templates for any institution.",
      icon: Database,
    },
    {
      title: "Image Crop & Compression",
      description:
        "Upload, crop, resize and compress photos directly in the browser for smooth, fast performance.",
      icon: Crop,
    },
    {
      title: "Super Admin Control",
      description:
        "Approve admins, restrict access, manage permissions and maintain full control across all tenants.",
      icon: Shield,
    },
    {
      title: "Admin & Employee Roles",
      description:
        "Admins define the structure, employees enter data — optimized workflow for large organizations.",
      icon: UserCog,
    },
    {
      title: "Fast Processing Engine",
      description:
        "Optimized queries, client-side processing and smart caching gives a silky smooth experience.",
      icon: Cpu,
    },
    {
      title: "Security-First Architecture",
      description:
        "OTP login for Super Admin and permission-based routing keeps your entire system protected.",
      icon: CheckCircle,
    },
  ];

  return (
    <main className="min-h-screen w-full bg-background text-foreground py-20 px-6">
      
      {/* Header */}
      <section className="max-w-3xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Powerful Features  
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
            {" "}For Institutions
          </span>
        </h1>

        <p className="text-muted-foreground mt-6 text-lg md:text-xl">
          From ID card design to multi-role management, everything your platform needs to run smoothly.
        </p>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="bg-card border border-border p-7 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <f.icon className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="text-center mt-24">
        <a
          href="/"
          className="px-10 py-4 text-lg font-medium rounded-full bg-primary text-primary-foreground hover:opacity-90 transition"
        >
          Start Using the Platform →
        </a>
      </section>
    </main>
  );
}
