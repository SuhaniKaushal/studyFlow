"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { weeklyProgress, subjects } from "@/data/mock"
import { Trophy, TrendingUp, Target, Flame, Medal } from "lucide-react"
import { useStudyStore } from "@/store/useStudyStore"

const monthlyData = [
  { week: "W1", hours: 14 },
  { week: "W2", hours: 22 },
  { week: "W3", hours: 18 },
  { week: "W4", hours: 28 },
]

export default function ProgressPage() {
  const { user, achievements, quizHistory } = useStudyStore()

  // Dynamic calculations
  const totalHours = 124.5 + user.todayStudied
  const goalCompletion = Math.min(Math.round((user.todayStudied / user.dailyGoal) * 100), 100)

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Learning Progress</h1>
        <p className="text-text-secondary">Analyze your study habits and track your milestones.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-text-tertiary mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Total Hours</span>
            </div>
            <span className="text-3xl font-bold">{totalHours.toFixed(1)}</span>
            <span className="text-xs text-success font-medium">+12% from last month</span>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-text-tertiary mb-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium uppercase tracking-wider">Current Streak</span>
            </div>
            <span className="text-3xl font-bold">{user.streak} Days</span>
            <span className="text-xs text-text-secondary font-medium">Keep it up!</span>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-text-tertiary mb-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium uppercase tracking-wider">Today's Goal</span>
            </div>
            <span className="text-3xl font-bold">{goalCompletion}%</span>
            <span className="text-xs text-text-secondary font-medium">{user.todayStudied.toFixed(1)} / {user.dailyGoal} hours</span>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-text-tertiary mb-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium uppercase tracking-wider">Achievements</span>
            </div>
            <span className="text-3xl font-bold">{achievements.length}</span>
            <span className="text-xs text-primary font-medium">Earned so far</span>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Charts */}
        <div className="space-y-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Weekly Study Hours</CardTitle>
              <CardDescription>Your focus time over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyProgress} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }} 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="hours" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Monthly Consistency</CardTitle>
              <CardDescription>Study hours trend over the last 4 weeks</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                  />
                  <Area type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Subject Mastery</CardTitle>
              <CardDescription>Completion percentage per subject</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {subjects.map((sub, idx) => (
                <div key={sub.id} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">{sub.name}</span>
                    <span className="text-text-secondary font-medium">{40 + (idx * 8)}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${sub.color.split(' ')[0]}`} 
                      style={{ width: `${40 + (idx * 8)}%` }} 
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow h-full max-h-[400px] flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Badges earned for your hard work</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 overflow-y-auto flex-1 pb-4">
              {achievements.length > 0 ? achievements.map((acc, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background hover:-translate-y-0.5 transition-transform shadow-sm">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-yellow-50 dark:bg-yellow-900/30">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{acc}</h4>
                    <p className="text-xs text-text-secondary mt-0.5">Unlocked successfully!</p>
                  </div>
                </div>
              )) : (
                <div className="text-center text-text-secondary py-8 text-sm">
                  Complete actions like taking a quiz or uploading a note to unlock achievements!
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
