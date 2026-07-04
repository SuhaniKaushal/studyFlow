"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { TopNav } from "@/components/layout/top-nav"
import { useStudyStore } from "@/store/useStudyStore"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isFocusMode } = useStudyStore()

  return (
    <div className="flex min-h-screen bg-background">
      <div className={cn("transition-all duration-300 ease-in-out shrink-0 overflow-hidden", isFocusMode ? "w-0 opacity-0" : "w-64 opacity-100")}>
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto flex flex-col relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/[0.03] via-background to-background pointer-events-none" />
        <TopNav />
        {children}
      </main>
    </div>
  )
}
