"use client"

import { Sidebar } from "@/components/layout/sidebar"
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
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
