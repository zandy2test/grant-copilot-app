import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Edit3 } from "lucide-react"

const mockProposals = [
  { id: 1, title: "Community Garden Grant FY2025", status: "Drafting", progress: 40 },
  { id: 2, title: "Youth Literacy Program Initiative", status: "Review Pending", progress: 85 },
  { id: 3, title: "Tech for Seniors Expansion", status: "Submitted", progress: 100 },
]

export function ActiveProposals() {
  return (
    <Card className="shadow-soft border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Active Proposals</CardTitle>
        <CardDescription>Overview of your current grant applications.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 p-4 pt-0 md:p-3 md:pt-0">
        {" "}
        {/* Adjusted padding for cards */}
        {mockProposals.map((proposal) => (
          <div
            key={proposal.id}
            className="flex items-center justify-between p-3 bg-accent/50 rounded-lg hover:bg-accent/80 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">{proposal.title}</p>
                <p className="text-xs text-muted-foreground">
                  {proposal.status} - {proposal.progress}%
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              <Edit3 className="h-4 w-4 mr-1" /> View
            </Button>
          </div>
        ))}
        {mockProposals.length === 0 && <p className="text-sm text-muted-foreground p-3">No active proposals yet.</p>}
      </CardContent>
    </Card>
  )
}
