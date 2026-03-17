"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Store, MonitorPlay, Settings } from "lucide-react";

const navItems = [
  {
    href: "/app/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/app/stores",
    label: "Lojas",
    icon: Store,
  },
  {
    href: "/app/terminals",
    label: "Totens",
    icon: MonitorPlay,
  },
  {
    href: "/app/settings",
    label: "Configurações",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="flex items-center gap-2 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1d4ed8] text-white">
          <span className="text-xs font-semibold">MP</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">MP Express</p>
          <p className="text-xs text-slate-500">Admin Self Checkout</p>
        </div>
      </div>

      <nav className="mt-2 flex-1 space-y-1 px-3 pb-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-[#1d4ed8]/10 text-[#1d4ed8]"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

