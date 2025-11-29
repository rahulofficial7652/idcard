import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* Hero Section */}
      <section className="px-6 pt-24 pb-16 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          We’re Building the Future of  
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            {" "}ID Management
          </span>
        </h1>

        <p className="text-muted-foreground mt-6 text-lg md:text-xl">
          Our mission is to simplify how institutions generate, design, and manage ID cards.
          We focus on accuracy, performance, and a clean user experience.
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Our Mission</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          ID Generator is built with the vision to automate and modernize the traditional ID creation process.
          We eliminate manual errors, reduce workload, and provide a fast, professional, and customizable
          solution for schools, colleges, companies, and organizations of all sizes.
        </p>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
        <div className="p-6 bg-card border border-border rounded-xl">
          <h3 className="text-3xl font-bold">98%</h3>
          <p className="text-muted-foreground mt-2 text-sm">User Satisfaction</p>
        </div>
        <div className="p-6 bg-card border border-border rounded-xl">
          <h3 className="text-3xl font-bold">50K+</h3>
          <p className="text-muted-foreground mt-2 text-sm">IDs Generated</p>
        </div>
        <div className="p-6 bg-card border border-border rounded-xl">
          <h3 className="text-3xl font-bold">500+</h3>
          <p className="text-muted-foreground mt-2 text-sm">Institutions Served</p>
        </div>
        <div className="p-6 bg-card border border-border rounded-xl">
          <h3 className="text-3xl font-bold">24/7</h3>
          <p className="text-muted-foreground mt-2 text-sm">Support Available</p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center">
          Why Choose ID Generator?
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          <div className="p-6 bg-card border border-border rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Accurate & Fast</h3>
            <p className="text-muted-foreground text-sm">
              Create IDs in seconds with zero manual errors. Designed for reliability.
            </p>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Customizable</h3>
            <p className="text-muted-foreground text-sm">
              Custom fields, templates, and permissions tailored to your workflow.
            </p>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Secure & Scalable</h3>
            <p className="text-muted-foreground text-sm">
              OTP login, role-based access, and enterprise ready multi-tenant architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
          The Team
        </h2>

        <div className="grid gap-10 md:grid-cols-3">

          <div className="text-center">
            <Image
              src="/team1.jpg" // replace with actual image
              alt="Team Member"
              width={200}
              height={200}
              className="rounded-full mx-auto border border-border"
            />
            <h3 className="text-lg font-semibold mt-4">Rahul Singh</h3>
            <p className="text-muted-foreground text-sm">Founder & Developer</p>
          </div>

          <div className="text-center">
            <Image
              src="/team2.jpg"
              alt="Team Member"
              width={200}
              height={200}
              className="rounded-full mx-auto border border-border"
            />
            <h3 className="text-lg font-semibold mt-4">Aman Verma</h3>
            <p className="text-muted-foreground text-sm">Product Designer</p>
          </div>

          <div className="text-center">
            <Image
              src="/team3.jpg"
              alt="Team Member"
              width={200}
              height={200}
              className="rounded-full mx-auto border border-border"
            />
            <h3 className="text-lg font-semibold mt-4">Priya Sharma</h3>
            <p className="text-muted-foreground text-sm">Frontend Engineer</p>
          </div>

        </div>
      </section>

      {/* Footer placeholder */}
      <div className="mt-10">
        {/* Add <Footer /> here if you’re using the footer component */}
      </div>
    </main>
  );
}
