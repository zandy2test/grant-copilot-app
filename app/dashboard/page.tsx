import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { ActiveProposals } from "@/components/dashboard/active-proposals"
import { NotificationsSection } from "@/components/dashboard/notifications-section"
import { RecentDocuments } from "@/components/dashboard/recent-documents"

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {" "}
        {/* Outer padding */}
        <div className="container max-w-screen-2xl mx-auto">
          <header className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's an overview of your grant writing activities.
              </p>
            </div>
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Start New Proposal
            </Button>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {" "}
              {/* Active Proposals takes more space */}
              <ActiveProposals />
            </div>
            <NotificationsSection />
            <div className="lg:col-span-3">
              {" "}
              {/* Recent Documents spans full width on its own row or as part of 3 cols */}
              <RecentDocuments />
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6 px-4 md:px-6 border-t text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} GrantPilot. All rights reserved.
      </footer>
    </div>
  )
}
