"use client"

import { useStudyStore } from "@/store/useStudyStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { User, Mail, School, BookOpen } from "lucide-react"

export default function ProfilePage() {
  const { user, updateUser } = useStudyStore()

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Profile updated successfully.")
  }

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">My Profile</h1>
        <p className="text-text-secondary">Manage your personal information.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-secondary overflow-hidden ring-4 ring-primary/20">
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <Button type="button" variant="outline" onClick={() => toast.info("Avatar customization coming soon.")}>Change Avatar</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><User className="w-4 h-4 text-text-tertiary"/> Full Name</label>
                <Input 
                  value={user.name} 
                  onChange={(e) => updateUser({ name: e.target.value })} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><Mail className="w-4 h-4 text-text-tertiary"/> Email Address</label>
                <Input 
                  value={user.email} 
                  onChange={(e) => updateUser({ email: e.target.value })} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><School className="w-4 h-4 text-text-tertiary"/> University</label>
                <Input 
                  value={user.university} 
                  onChange={(e) => updateUser({ university: e.target.value })} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><BookOpen className="w-4 h-4 text-text-tertiary"/> Major</label>
                <Input 
                  value={user.major} 
                  onChange={(e) => updateUser({ major: e.target.value })} 
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border mt-8">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
