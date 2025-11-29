"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide navbar/footer on admin & other specific routes
  const hide =
    pathname.startsWith("/admin") ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/super-admin-login" ||
    pathname === "/dashboard";

  return (
    <>
      {!hide && <Navbar />}
      {children}
      {!hide && <Footer />}
    </>
  );
}
