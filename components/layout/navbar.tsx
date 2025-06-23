// Assuming this file exists from previous steps and is correctly set up.
// No changes needed here for this specific request.
// If it doesn't exist, it would need to be created as per earlier instructions.
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Feather } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/templates", label: "Templates" },
  { href: "/outcomes", label: "Outcomes" },
  { href: "/help", label: "Help" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <Link
          href="/dashboard"
          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
        >
          <Feather className="h-6 w-6" />
          <span className="font-bold text-lg">GrantPilot</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              asChild
              className="text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
          <Button
            variant="outline"
            asChild
            className="rounded-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link href="/new-proposal">New Proposal</Link>
          </Button>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-primary text-primary">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-4 py-6">
                <Link href="/dashboard" className="flex items-center space-x-2 text-primary mb-4">
                  <Feather className="h-6 w-6" />
                  <span className="font-bold text-lg">GrantPilot</span>
                </Link>
                {navItems.map((item) => (
                  <Button key={item.label} variant="ghost" asChild className="justify-start text-base">
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
                <Button
                  variant="outline"
                  asChild
                  className="rounded-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base"
                >
                  <Link href="/new-proposal">New Proposal</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
