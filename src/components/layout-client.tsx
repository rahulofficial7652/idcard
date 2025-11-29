"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // All routes where navbar/footer should disappear
  const hideRoutes = [
    "/login",
    "/register",
    "/super-admin-login",
    "/admin-login",
  ];

  const hide = hideRoutes.includes(pathname);

  return (
    <>
      {!hide && <Navbar />}
      {children}
      {!hide && <Footer />}
    </>
  );
}
