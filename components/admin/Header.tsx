"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

type AdminHeaderProps = {
  onToggleSidebar?: () => void;
};

export function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const [_, setDummy] = useState(false);

  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white/80 px-4 shadow-sm backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 lg:hidden"
          onClick={onToggleSidebar}
          aria-label="Abrir menu"
        >
          <Menu className="h-4 w-4" />
        </button>
        <span className="hidden text-sm font-medium text-slate-700 sm:inline">
          Área Administrativa
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right text-xs leading-tight sm:block">
          <p className="font-medium text-slate-700">Admin Mock</p>
          <p className="text-slate-500">admin@mpx.local</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d4ed8]/10 text-xs font-semibold text-[#1d4ed8]">
          AD
        </div>
      </div>
    </header>
  );
}

