"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { EgeSidebar } from "@/components/ege-sidebar";
import { ProgressProvider } from "@/components/progress-provider";
import { LanguageProvider } from "@/components/language-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const showPythonSidebar = pathname.startsWith("/courses") || pathname.startsWith("/lesson/") || pathname === "/profile" || pathname === "/teacher";
  const showEgeSidebar = pathname.startsWith("/course/ege-math");

  return (
    <LanguageProvider>
      <ProgressProvider>
        <div className="min-h-screen bg-gray-950">
          <Navbar />
          <div className="flex">
            {showPythonSidebar && <Sidebar />}
            {showEgeSidebar && <EgeSidebar />}
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </ProgressProvider>
    </LanguageProvider>
  );
}
