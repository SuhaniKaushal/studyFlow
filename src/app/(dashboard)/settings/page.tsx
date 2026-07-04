"use client"

import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Moon, Sun, Monitor, Globe, Shield } from "lucide-react"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [notifications, setNotifications] = useState({
    reminders: true,
    weekly: true,
    security: false
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-text-secondary">Manage your app preferences and account settings.</p>
      </div>

      <div className="grid gap-6">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel of StudyFlow.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => { setTheme("light"); toast.success("Theme changed to Light.") }}
                className={cn("flex-1 p-4 rounded-xl border-2 text-left relative overflow-hidden transition-all hover:scale-[1.02]", theme === "light" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50")}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Sun className={cn("w-5 h-5", theme === "light" ? "text-primary" : "text-text-secondary")} />
                  <span className="font-semibold text-sm">Light</span>
                </div>
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white rounded-tl-2xl shadow-sm border border-slate-200"></div>
              </button>
              
              <button 
                onClick={() => { setTheme("dark"); toast.success("Theme changed to Dark.") }}
                className={cn("flex-1 p-4 rounded-xl border-2 text-left relative overflow-hidden transition-all hover:scale-[1.02] bg-zinc-950 text-white", theme === "dark" ? "border-primary" : "border-zinc-800 hover:border-primary/50")}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Moon className={cn("w-5 h-5", theme === "dark" ? "text-primary" : "text-zinc-400")} />
                  <span className="font-semibold text-sm">Dark</span>
                </div>
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-zinc-900 rounded-tl-2xl shadow-sm border border-zinc-800"></div>
              </button>
              
              <button 
                onClick={() => { setTheme("system"); toast.success("Theme set to System.") }}
                className={cn("flex-1 p-4 rounded-xl border-2 text-left relative overflow-hidden transition-all hover:scale-[1.02]", theme === "system" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50")}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Monitor className={cn("w-5 h-5", theme === "system" ? "text-primary" : "text-text-secondary")} />
                  <span className="font-semibold text-sm">System</span>
                </div>
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-gradient-to-br from-slate-100 to-zinc-900 rounded-tl-2xl shadow-sm border border-border"></div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choose what updates you want to receive.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-background">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Bell className="w-5 h-5 text-text-secondary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Study Reminders</h4>
                  <p className="text-xs text-text-tertiary">Daily notifications to maintain your streak.</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setNotifications(prev => ({...prev, reminders: !prev.reminders}))
                  toast.success("Notification preferences updated.")
                }}
                className={`w-11 h-6 rounded-full flex items-center p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${notifications.reminders ? "bg-primary" : "bg-secondary border border-border"}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${notifications.reminders ? "translate-x-5" : "translate-x-0"}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-background">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Globe className="w-5 h-5 text-text-secondary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Weekly Report</h4>
                  <p className="text-xs text-text-tertiary">A summary of your study hours and progress.</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setNotifications(prev => ({...prev, weekly: !prev.weekly}))
                  toast.success("Notification preferences updated.")
                }}
                className={`w-11 h-6 rounded-full flex items-center p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${notifications.weekly ? "bg-primary" : "bg-secondary border border-border"}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${notifications.weekly ? "translate-x-5" : "translate-x-0"}`}></div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
