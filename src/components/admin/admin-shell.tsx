"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";
import { adminModules } from "@/lib/data";
import { cn } from "@/lib/utils";

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderNavigation = () => (
    <nav className="flex flex-col gap-2 overflow-y-auto px-3 py-3">
      {adminModules.map((item) => {
        const active = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            className={cn(
              "rounded-md px-3 py-3 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white",
              active && "bg-[#d7fff4] text-[#0a4d45] hover:bg-[#d7fff4] hover:text-[#0a4d45]"
            )}
            href={item.href}
            key={item.href}
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#f4f7f3] text-[var(--ink)]">
      <div className="grid min-h-screen lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="hidden border-b border-[var(--line)] bg-[#17231f] text-white lg:sticky lg:top-0 lg:block lg:h-screen lg:border-b-0 lg:border-r">
          <div className="flex h-full flex-col">
            <div className="border-b border-white/10 px-5 py-5">
              <Link className="flex items-center gap-3 font-bold" href="/admin">
                <span className="flex size-9 items-center justify-center rounded-md bg-[#d7fff4] text-[#0a4d45]">CMS</span>
                <span>SEO 後台</span>
              </Link>
              <p className="mt-2 text-xs leading-5 text-white/60">受保護的管理區</p>
            </div>
            <div className="min-h-0 flex-1">{renderNavigation()}</div>
          </div>
        </aside>
        {mobileMenuOpen ? (
          <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
        ) : null}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-[min(86vw,20rem)] border-r border-white/10 bg-[#17231f] text-white transition-transform duration-200 lg:hidden",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
              <Link className="flex min-w-0 items-center gap-3 font-bold" href="/admin" onClick={() => setMobileMenuOpen(false)}>
                <span className="flex size-9 items-center justify-center rounded-md bg-[#d7fff4] text-[#0a4d45]">CMS</span>
                <span className="truncate">SEO 後台</span>
              </Link>
              <button
                className="min-h-10 rounded-md border border-white/15 px-3 text-sm font-bold"
                onClick={() => setMobileMenuOpen(false)}
                type="button"
              >
                關閉
              </button>
            </div>
            <div className="min-h-0 flex-1">{renderNavigation()}</div>
          </div>
        </aside>
        <div className="min-w-0">
          <header className="sticky top-0 z-10 border-b border-[var(--line)] bg-white/92 backdrop-blur">
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
              <button
                className="min-h-10 rounded-md border border-[var(--line)] bg-[var(--surface)] px-3 text-sm font-bold lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
                type="button"
              >
                選單
              </button>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--ink-muted)]">SEO Calculator CMS</p>
                <p className="truncate text-xs text-[var(--ink-muted)]">AI SEO auto mode live / D1-backed overrides</p>
              </div>
              <div className="flex shrink-0 items-center gap-3 text-sm">
                <Link className="rounded-md border border-[var(--line)] px-3 py-2 font-semibold" href="/">
                  前台
                </Link>
                <span className="hidden rounded-md bg-[var(--surface-muted)] px-3 py-2 font-semibold sm:inline-flex">
                  Protected
                </span>
              </div>
            </div>
          </header>
          <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
