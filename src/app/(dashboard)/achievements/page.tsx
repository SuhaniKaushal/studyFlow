"use client"

import { useStudyStore } from "@/store/useStudyStore"
import { Trophy, Star, Medal, Target, Flame, Zap } from "lucide-react"

export default function AchievementsPage() {
  const { achievements } = useStudyStore()

  const allBadges = [
    { id: "First Upload", icon: <Star className="w-8 h-8 text-yellow-500" />, title: "First Upload", desc: "Uploaded your first note." },
    { id: "Fast Learner", icon: <Zap className="w-8 h-8 text-blue-500" />, title: "Fast Learner", desc: "Generated an AI summary." },
    { id: "Quiz Master", icon: <Trophy className="w-8 h-8 text-emerald-500" />, title: "Quiz Master", desc: "Scored 80%+ on a practice quiz." },
    { id: "Streak Builder", icon: <Flame className="w-8 h-8 text-orange-500" />, title: "Streak Builder", desc: "Studied 3 days in a row." },
    { id: "Goal Crusher", icon: <Target className="w-8 h-8 text-purple-500" />, title: "Goal Crusher", desc: "Completed all daily tasks." },
    { id: "Top Scholar", icon: <Medal className="w-8 h-8 text-indigo-500" />, title: "Top Scholar", desc: "Reached level 10." },
  ]

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Achievements</h1>
        <p className="text-text-secondary">Track your milestones and study badges.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allBadges.map((badge) => {
          const unlocked = achievements.includes(badge.id)
          return (
            <div 
              key={badge.id} 
              className={`p-6 rounded-2xl border transition-all duration-300 ${unlocked ? "bg-background border-primary/30 shadow-[0_4px_20px_rgba(124,58,237,0.1)]" : "bg-secondary/20 border-border opacity-60 grayscale"}`}
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                {badge.icon}
              </div>
              <h3 className="text-lg font-semibold mb-1">{badge.title}</h3>
              <p className="text-sm text-text-secondary">{badge.desc}</p>
              
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-text-tertiary">Status</span>
                <span className={`text-xs font-bold ${unlocked ? "text-primary" : "text-text-secondary"}`}>
                  {unlocked ? "UNLOCKED" : "LOCKED"}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
