export const user = {
  name: "Alex",
  streak: 12,
  dailyGoal: 4, // hours
  todayStudied: 2.5,
}

export const subjects = [
  { id: "1", name: "Operating Systems", color: "bg-blue-100 text-blue-700" },
  { id: "2", name: "DBMS", color: "bg-purple-100 text-purple-700" },
  { id: "3", name: "Computer Networks", color: "bg-green-100 text-green-700" },
  { id: "4", name: "DSA", color: "bg-orange-100 text-orange-700" },
  { id: "5", name: "Machine Learning", color: "bg-pink-100 text-pink-700" },
  { id: "6", name: "React", color: "bg-sky-100 text-sky-700" },
]

export const recentNotes = [
  {
    id: "n1",
    title: "Process Scheduling Algorithms",
    subject: "Operating Systems",
    date: "2 days ago",
    summary: "Detailed overview of FCFS, SJF, Priority, and Round Robin scheduling.",
    bookmarked: true,
  },
  {
    id: "n2",
    title: "Normal Forms (1NF to BCNF)",
    subject: "DBMS",
    date: "3 days ago",
    summary: "Examples of anomalies and how normalization solves them.",
    bookmarked: false,
  },
  {
    id: "n3",
    title: "TCP vs UDP",
    subject: "Computer Networks",
    date: "1 week ago",
    summary: "Comparison of connection-oriented vs connectionless protocols.",
    bookmarked: true,
  }
]

export const upcomingExams = [
  { id: "e1", title: "DSA Midterm", date: "Oct 15", daysLeft: 4 },
  { id: "e2", title: "ML Project Review", date: "Oct 20", daysLeft: 9 },
]

export const weeklyProgress = [
  { name: "Mon", hours: 3 },
  { name: "Tue", hours: 4.5 },
  { name: "Wed", hours: 2 },
  { name: "Thu", hours: 5 },
  { name: "Fri", hours: 3.5 },
  { name: "Sat", hours: 6 },
  { name: "Sun", hours: 4 },
]
