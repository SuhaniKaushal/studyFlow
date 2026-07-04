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
  Target,
  Sparkles
} from "lucide-react"
import { motion } from "framer-motion"
import { useStudyStore } from "@/store/useStudyStore"
import { toast } from "sonner"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/notes", label: "Notes", icon: BookOpen },
  { href: "/quiz", label: "Quizzes", icon: BrainCircuit },
  { href: "/flashcards", label: "Flashcards", icon: Layers },
  { href: "/planner", label: "Planner", icon: CalendarDays },
  { href: "/progress", label: "Progress", icon: TrendingUp },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useStudyStore()

  return (
    <aside className="w-[260px] border-r border-border bg-background flex flex-col h-screen sticky top-0 shrink-0">
      {/* Logo */}
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-text-primary">StudyFlow</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto mt-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group overflow-hidden",
                isActive ? "text-primary" : "text-text-secondary hover:text-text-primary hover:bg-secondary/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-primary/[0.08] border-l-2 border-primary rounded-lg"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon className={cn("w-4 h-4 relative z-10 transition-colors", isActive ? "text-primary drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]" : "text-text-tertiary group-hover:text-text-primary")} />
              <span className="relative z-10">{item.label}</span>
            </Link>
          )
        })}
        
        <div className="pt-6 pb-2">
          <div className="w-full h-px bg-border/50" />
        </div>

        <Link
          href="/achievements"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-secondary/50 transition-colors"
        >
          <Target className="w-4 h-4 text-text-tertiary" />
          Achievements
        </Link>
        <Link
          href="/profile"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-secondary/50 transition-colors"
        >
          <div className="w-4 h-4 rounded-full bg-secondary overflow-hidden">
            {/* Mock avatar */}
            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`} alt="Avatar" className="w-full h-full object-cover opacity-80" />
          </div>
          Profile
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-secondary/50 transition-colors"
        >
          <Settings className="w-4 h-4 text-text-tertiary" />
          Settings
        </Link>
      </nav>

      {/* Bottom Widgets */}
      <div className="p-4 space-y-4">
        {/* Goal Card */}
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-accent-amber" />
            <h4 className="text-xs font-semibold text-text-primary">Today's Goal</h4>
          </div>
          <div className="relative pt-2">
            {/* Simple SVG semi-circle for Goal */}
            <div className="relative w-full aspect-[2/1] overflow-hidden flex items-end justify-center pb-2">
              <svg viewBox="0 0 100 50" className="absolute top-0 left-0 w-full h-full overflow-visible">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="currentColor" strokeWidth="8" className="text-secondary" strokeLinecap="round" />
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="currentColor" strokeWidth="8" className="text-primary drop-shadow-[0_0_4px_rgba(124,58,237,0.5)] transition-all duration-1000 ease-out" strokeDasharray="125.6" strokeDashoffset={125.6 - (125.6 * Math.min(user.todayStudied / user.dailyGoal, 1))} strokeLinecap="round" />
              </svg>
              <div className="text-center z-10">
                <span className="block text-xl font-bold text-text-primary leading-none">{Math.round((user.todayStudied / user.dailyGoal) * 100)}%</span>
                <span className="block text-[10px] text-text-tertiary mt-1">Study {user.todayStudied}/{user.dailyGoal} hrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-secondary/80 to-background border border-border group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
            <Sparkles className="w-12 h-12 text-primary" />
          </div>
          <h4 className="text-sm font-semibold text-text-primary flex items-center gap-1.5 mb-1">
            <span className="text-accent-amber">👑</span> Upgrade to Pro
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed mb-3">
            Unlock unlimited AI, advanced insights and more.
          </p>
          <button 
            onClick={() => toast.loading("Redirecting to secure checkout...", { duration: 2000 })}
            className="w-full py-2 px-3 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold rounded-lg shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3 h-3" /> Upgrade Now &rarr;
          </button>
        </div>
      </div>
    </aside>
  )
}
