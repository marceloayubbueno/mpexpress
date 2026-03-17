"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAdminUserFromStorage } from "@/lib/auth/admin-session";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { AdminHeader } from "@/components/admin/Header";

export default function AppAuthedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const user = getAdminUserFromStorage();
    if (!user) {
      router.replace("/login");
      return;
    }
    setChecked(true);
  }, [router, pathname]);

  if (!checked) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-white">
        <p className="text-sm text-gray-600">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "fixed inset-0 z-40 lg:relative lg:z-auto" : "hidden lg:block"
        }`}
      >
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div className="relative z-40 lg:z-auto h-full">
          <AdminSidebar />
        </div>
      </div>

      {/* Main content */}
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <AdminHeader onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <main className="h-full flex-1 overflow-y-auto bg-slate-50">
          <div className="h-full w-full px-4 lg:px-8 py-4">{children}</div>
        </main>
      </div>
    </div>
  );
}

