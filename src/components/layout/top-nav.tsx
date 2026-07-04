import { Search, Bell, Plus, Settings, User, LogOut, FileText, BrainCircuit, CheckSquare } from "lucide-react"
import { useStudyStore } from "@/store/useStudyStore"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function TopNav() {
  const { user } = useStudyStore()
  const router = useRouter()

  const handleSearchClick = () => {
    toast("Search triggered. (Mock)")
  }

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/60 border-b border-border h-16 flex items-center justify-between px-8">
      <div className="flex-1 max-w-xl">
        {/* Search Bar */}
        <div className="relative group" onClick={handleSearchClick}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search for notes, quizzes, topics..." 
            className="w-full bg-secondary/50 border border-border/50 rounded-full h-10 pl-10 pr-16 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 focus:bg-background transition-all placeholder:text-text-tertiary cursor-pointer"
            readOnly
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-flex items-center gap-1 bg-secondary/80 border border-border px-1.5 py-0.5 rounded text-[10px] font-medium text-text-tertiary">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-4 shrink-0">
        <button 
          onClick={() => toast.info("No new notifications")}
          className="w-9 h-9 rounded-full bg-secondary/50 hover:bg-secondary flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-accent-amber rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => router.push('/notes?upload=true')}>
              <FileText className="w-4 h-4 mr-2 text-primary" /> New Note
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/quiz')}>
              <BrainCircuit className="w-4 h-4 mr-2 text-accent-blue" /> New Quiz
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/planner')}>
              <CheckSquare className="w-4 h-4 mr-2 text-accent-emerald" /> New Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="h-6 w-px bg-border mx-1" />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-secondary overflow-hidden ring-2 ring-transparent group-hover:ring-primary/30 transition-all">
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block text-sm">
                <p className="font-semibold text-text-primary leading-none">Hi, {user.name.split(' ')[0]}</p>
                <p className="text-xs text-text-tertiary mt-0.5">Student</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5 text-sm font-semibold">My Account</div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/profile')}>
              <User className="w-4 h-4 mr-2" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/settings')}>
              <Settings className="w-4 h-4 mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast.success("Logged out successfully.")}>
              <LogOut className="w-4 h-4 mr-2" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
