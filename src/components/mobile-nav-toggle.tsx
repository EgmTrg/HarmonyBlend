"use client";

import { Menu, X } from "lucide-react";
import { useMobileNav } from "./mobile-nav-context";

export function MobileNavToggle() {
  const { open, toggle } = useMobileNav();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
      className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white md:hidden"
    >
      {open ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
    </button>
  );
}
