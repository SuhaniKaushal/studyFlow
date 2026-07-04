"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStudyStore } from "@/store/useStudyStore"
import { Camera, Mail, User, Target } from "lucide-react"
import { toast } from "sonner"

export default function ProfilePage() {
  const { user, updateUser, achievements } = useStudyStore()
  
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    university: user.university,
    major: user.major,
    dailyGoal: user.dailyGoal
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      updateUser({
        name: formData.name,
        email: formData.email,
        university: formData.university,
        major: formData.major,
        dailyGoal: Number(formData.dailyGoal)
      })
      setIsSaving(false)
      toast.success("Profile changes saved successfully.")
    }, 800)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Profile</h1>
        <p className="text-text-secondary">Manage your personal information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Quick Info */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="flex flex-col items-center p-6 pt-8">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background shadow-md">
                  <span className="text-5xl font-bold text-primary">{user.name.charAt(0)}</span>
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors shadow-sm active:scale-95">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-center">{user.name}</h2>
              <p className="text-sm text-text-tertiary mb-6 text-center">{user.major} Student</p>
              
              <div className="w-full space-y-4 pt-6 border-t border-border">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary">Member since</span>
                  <span className="font-medium">Today</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary">Current Streak</span>
                  <span className="font-medium text-orange-500 flex items-center gap-1">
                    {user.streak} Days
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {achievements.length > 0 && (
            <Card className="bg-secondary/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Unlocked Achievements</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {achievements.map((acc, i) => (
                  <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                    🏆 {acc}
                  </span>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Edit Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your profile details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <Input 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    className="pl-9" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <Input 
                    type="email" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    className="pl-9" 
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">University / Institution</label>
              <Input 
                value={formData.university} 
                onChange={e => setFormData({...formData, university: e.target.value})} 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Major / Field of Study</label>
                <Input 
                  value={formData.major} 
                  onChange={e => setFormData({...formData, major: e.target.value})} 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Daily Study Goal (Hours)</label>
                <div className="relative">
                  <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <Input 
                    type="number" 
                    min="1" max="24"
                    value={formData.dailyGoal} 
                    onChange={e => setFormData({...formData, dailyGoal: parseInt(e.target.value) || 1})} 
                    className="pl-9" 
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border flex justify-end gap-4">
              <Button 
                variant="outline" 
                onClick={() => setFormData({
                  name: user.name,
                  email: user.email,
                  university: user.university,
                  major: user.major,
                  dailyGoal: user.dailyGoal
                })}
                disabled={isSaving}
              >
                Reset
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
