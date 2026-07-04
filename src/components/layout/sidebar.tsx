"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  BookOpen, 
  BrainCircuit, 
  Layers, 
  CalendarDays, 
  TrendingUp, 
  Settings,
  LogOut
} from "lucide-react"
import { motion } from "framer-motion"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/notes", label: "Notes", icon: BookOpen },
  { href: "/quiz", label: "Quiz", icon: BrainCircuit },
  { href: "/flashcards", label: "Flashcards", icon: Layers },
  { href: "/planner", label: "Planner", icon: CalendarDays },
  { href: "/progress", label: "Progress", icon: TrendingUp },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-secondary/30 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight">StudyFlow</span>
        </Link>
      </div>

      <div className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-text-tertiary mb-4 px-2 uppercase tracking-wider">
          Menu
        </div>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors group",
                isActive ? "text-primary" : "text-text-secondary hover:text-text-primary"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon className={cn("w-4 h-4 relative z-10", isActive ? "text-primary" : "text-text-tertiary group-hover:text-text-primary transition-colors")} />
              <span className="relative z-10">{item.label}</span>
            </Link>
          )
        })}
      </div>

      <div className="p-4 border-t border-border">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors",
            pathname === "/settings"
              ? "bg-primary/10 text-primary"
              : "text-text-secondary hover:bg-secondary hover:text-text-primary"
          )}
        >
          <Settings className="w-4 h-4 text-text-tertiary" />
          Settings
        </Link>
        <button
          className="w-full mt-1 flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-text-secondary hover:bg-error/10 hover:text-error transition-colors"
        >
          <LogOut className="w-4 h-4 text-text-tertiary group-hover:text-error" />
          Logout
        </button>
      </div>
    </aside>
  )
}
