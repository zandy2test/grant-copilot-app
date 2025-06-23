import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Bell, CalendarDays, Sparkles, AlertCircle } from "lucide-react"

const mockNotifications = [
  {
    id: 1,
    type: "deadline",
    message: "Arts Council Grant deadline: July 15th",
    icon: <CalendarDays className="h-5 w-5 text-red-500" />,
  },
  {
    id: 2,
    type: "ai_suggestion",
    message: "AI Suggestion: Rephrase needs statement for Funder Y",
    icon: <Sparkles className="h-5 w-5 text-secondary" />,
  },
  {
    id: 3,
    type: "general",
    message: "Welcome to GrantPilot! Complete your org profile.",
    icon: <Bell className="h-5 w-5 text-primary" />,
  },
  {
    id: 4,
    type: "alert",
    message: "Action required: Update payment method.",
    icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
  },
]

export function NotificationsSection() {
  return (
    <Card className="shadow-soft border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Notifications</CardTitle>
        <CardDescription>Updates, deadlines, and AI suggestions.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 p-4 pt-0 md:p-3 md:pt-0">
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start space-x-3 p-3 bg-accent/50 rounded-lg hover:bg-accent/80 transition-colors"
          >
            {notification.icon}
            <p className="text-sm flex-1">{notification.message}</p>
          </div>
        ))}
        {mockNotifications.length === 0 && <p className="text-sm text-muted-foreground p-3">No new notifications.</p>}
      </CardContent>
    </Card>
  )
}
