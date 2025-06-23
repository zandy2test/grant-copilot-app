import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileArchive, Clock } from "lucide-react"

const mockRecentDocs = [
  { id: 1, title: "Budget Spreadsheet Q3", lastOpened: "2 hours ago", type: "spreadsheet" },
  { id: 2, title: "Impact Report 2023 Draft", lastOpened: "Yesterday", type: "report" },
  { id: 3, title: "Funder Research Notes", lastOpened: "3 days ago", type: "notes" },
]

export function RecentDocuments() {
  return (
    <Card className="shadow-soft border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Recent Documents</CardTitle>
        <CardDescription>Quick access to your latest work.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 p-4 pt-0 md:p-3 md:pt-0">
        {mockRecentDocs.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-3 bg-accent/50 rounded-lg hover:bg-accent/80 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <FileArchive className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">{doc.title}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {doc.lastOpened}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              Open
            </Button>
          </div>
        ))}
        {mockRecentDocs.length === 0 && <p className="text-sm text-muted-foreground p-3">No recent documents.</p>}
      </CardContent>
    </Card>
  )
}
