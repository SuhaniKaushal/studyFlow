"use client"

import Link from "next/link"
import { Flame, Clock, CheckCircle2, Trophy, ArrowRight, FileUp, BrainCircuit, Presentation, FileText, ChevronDown, Sparkles } from "lucide-react"
import { useStudyStore } from "@/store/useStudyStore"
import { cn } from "@/lib/utils"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import { weeklyProgress } from "@/data/mock"
import { useEffect, useState } from "react"

// Generate mock heatmap data
const heatmapData = Array.from({ length: 28 * 4 }).map(() => Math.floor(Math.random() * 5))

export default function DashboardPage() {
  const { user, notes, tasks } = useStudyStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const pendingTasks = tasks.filter(t => !t.completed).slice(0, 3)
  const completedTasksCount = tasks.filter(t => t.completed).length

  return (
    <div className="p-8 w-full max-w-screen-2xl mx-auto flex flex-col xl:flex-row gap-8 animate-in fade-in duration-500 pb-24">
      {/* Main Dashboard Column */}
      <div className="flex-1 space-y-8 min-w-0">
        
        {/* Dynamic Greeting */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-2 flex items-center gap-2">
            Good morning, {user.name.split(' ')[0]} <span className="animate-wave origin-bottom-right inline-block">👋</span>
          </h1>
          <p className="text-text-secondary">Let's continue where you left off.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Study Streak */}
          <div className="group p-5 rounded-2xl bg-gradient-to-br from-[#1e1b4b] to-[#2e1065] border border-primary/20 relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(124,58,237,0.15)]">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Flame className="w-16 h-16 text-primary" />
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Flame className="w-5 h-5 text-accent-purple" />
            </div>
            <p className="text-sm font-medium text-primary-foreground/70 mb-1">Study Streak</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white"><AnimatedCounter value={user.streak} /></span>
              <span className="text-sm text-primary-foreground/50">Days</span>
            </div>
          </div>

          {/* Study Time */}
          <div className="group p-5 rounded-2xl bg-[#0f172a] border border-accent-blue/20 relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]">
            <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-accent-blue" />
            </div>
            <p className="text-sm font-medium text-text-secondary mb-1">Study Time</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white"><AnimatedCounter value={user.todayStudied} decimals={1} /></span>
              <span className="text-sm text-text-tertiary">Hours Today</span>
            </div>
          </div>

          {/* Tasks Completed */}
          <div className="group p-5 rounded-2xl bg-[#064e3b]/30 border border-accent-emerald/20 relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)]">
            <div className="w-10 h-10 rounded-full bg-accent-emerald/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5 text-accent-emerald" />
            </div>
            <p className="text-sm font-medium text-text-secondary mb-1">Tasks Completed</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white"><AnimatedCounter value={completedTasksCount} /></span>
              <span className="text-sm text-text-tertiary">Done</span>
            </div>
          </div>

          {/* XP Earned */}
          <div className="group p-5 rounded-2xl bg-[#451a03]/30 border border-accent-amber/20 relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(245,158,11,0.1)]">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-accent-amber/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-accent-amber" />
              </div>
              <span className="text-xs font-semibold text-accent-amber bg-accent-amber/10 px-2 py-1 rounded-full">Level 5</span>
            </div>
            <p className="text-sm font-medium text-text-secondary mb-1">XP Earned</p>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl font-bold text-white">320</span>
              <span className="text-sm text-text-tertiary">XP</span>
            </div>
            <div className="w-full bg-background/50 h-1.5 rounded-full overflow-hidden">
              <div className="bg-accent-amber h-full rounded-full w-[65%]" />
            </div>
          </div>
        </div>

        {/* Analytics Chart */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-accent-amber" />
              <h3 className="font-semibold text-text-primary">Study Progress</h3>
            </div>
            <button className="text-xs font-medium text-text-secondary bg-secondary/50 hover:bg-secondary px-3 py-1.5 rounded-lg border border-border flex items-center gap-2 transition-colors">
              This Week <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          
          <div className="h-[240px] w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyProgress} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#52525b', fontSize: 12 }} 
                    dy={10}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }}
                    itemStyle={{ color: '#FAFAFA' }}
                    cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#7c3aed" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorHours)" 
                    activeDot={{ r: 6, fill: '#7c3aed', stroke: '#09090B', strokeWidth: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Recent Notes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">Recent Notes</h3>
            <Link href="/notes" className="text-xs font-medium text-text-secondary hover:text-primary transition-colors flex items-center gap-1 group">
              View All <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.slice(0, 3).map(note => (
              <Link href="/notes" key={note.id} className="group p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all hover:shadow-md flex items-center gap-4 relative overflow-hidden">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-text-tertiary group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-text-primary truncate">{note.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium text-text-tertiary">{note.subject}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-xs text-text-tertiary truncate">{note.date}</span>
                  </div>
                </div>
                {/* Hover Reveal */}
                <div className="absolute right-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Right Panel */}
      <div className="w-full xl:w-[320px] shrink-0 space-y-6">
        
        {/* Upcoming Tasks Timeline */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-text-primary">Upcoming Tasks</h3>
            <Link href="/planner" className="text-xs font-medium text-text-secondary hover:text-primary transition-colors flex items-center gap-1 group">
              View <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {pendingTasks.map((task, i) => (
              <div key={task.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-card bg-secondary text-text-tertiary group-hover:text-primary group-hover:bg-primary/10 transition-colors shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl border border-border bg-background shadow-sm transition-all group-hover:border-primary/30 group-hover:shadow-md">
                  <h4 className="text-xs font-semibold text-text-primary truncate">{task.title}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-text-tertiary">{task.time}</span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondary text-text-secondary">{task.subject}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div>
          <h3 className="font-semibold text-text-primary mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/notes?upload=true" className="group p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 hover:border-primary/40 hover:-translate-y-1 transition-all">
              <FileUp className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-text-primary">Upload Note</span>
            </Link>
            <Link href="/quiz" className="group p-4 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 border border-accent-blue/20 hover:border-accent-blue/40 hover:-translate-y-1 transition-all">
              <BrainCircuit className="w-5 h-5 text-accent-blue mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-text-primary">Generate Quiz</span>
            </Link>
            <Link href="/flashcards" className="group p-4 rounded-xl bg-gradient-to-br from-accent-emerald/20 to-accent-emerald/5 border border-accent-emerald/20 hover:border-accent-emerald/40 hover:-translate-y-1 transition-all">
              <Presentation className="w-5 h-5 text-accent-emerald mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-text-primary">Flashcards</span>
            </Link>
            <Link href="/notes" className="group p-4 rounded-xl bg-gradient-to-br from-accent-amber/20 to-accent-amber/5 border border-accent-amber/20 hover:border-accent-amber/40 hover:-translate-y-1 transition-all">
              <Sparkles className="w-5 h-5 text-accent-amber mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-text-primary">AI Summary</span>
            </Link>
          </div>
        </div>

        {/* Study Heatmap */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">Study Heatmap</h3>
            <button className="text-xs font-medium text-text-secondary bg-secondary/50 hover:bg-secondary px-2 py-1 rounded-lg border border-border flex items-center gap-1 transition-colors">
              This Month <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex gap-2">
            <div className="flex flex-col gap-1.5 text-[9px] text-text-tertiary mt-6 pr-2">
              <span>Mon</span>
              <span className="invisible">Tue</span>
              <span>Wed</span>
              <span className="invisible">Thu</span>
              <span>Fri</span>
              <span className="invisible">Sat</span>
              <span>Sun</span>
            </div>
            <div className="flex-1 overflow-x-auto">
              <div className="grid grid-rows-7 grid-flow-col gap-1.5 w-max pb-2">
                {heatmapData.map((val, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "w-3 h-3 rounded-[3px] transition-colors cursor-pointer hover:ring-2 hover:ring-border hover:ring-offset-1 hover:ring-offset-card",
                      val === 0 ? "bg-secondary" :
                      val === 1 ? "bg-primary/30" :
                      val === 2 ? "bg-primary/50" :
                      val === 3 ? "bg-primary/80" : "bg-primary"
                    )}
                    title={`${val} hours studied`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-1.5 mt-2 text-[10px] text-text-tertiary">
            <span>Less</span>
            <div className="w-3 h-3 rounded-[3px] bg-secondary" />
            <div className="w-3 h-3 rounded-[3px] bg-primary/30" />
            <div className="w-3 h-3 rounded-[3px] bg-primary/50" />
            <div className="w-3 h-3 rounded-[3px] bg-primary/80" />
            <div className="w-3 h-3 rounded-[3px] bg-primary" />
            <span>More</span>
          </div>
        </div>

      </div>
    </div>
  )
}
