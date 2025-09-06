"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Triangle, Sun, Moon, HomeIcon, BarChart3, Target, UserIcon } from "lucide-react"

const SAMPLE_DATA: Record<
  string,
  {
    title: string
    description: string
    items: Array<{ name: string; category: string; threeYr?: string; fiveYr?: string; expense?: string }>
  }
> = {
  "small-cap": {
    title: "Small cap funds",
    description: "Higher growth potential with higher volatility. Suited for long-term investors.",
    items: [
      {
        name: "Alpha Growth Small Cap Fund",
        category: "Small Cap",
        threeYr: "22.4%",
        fiveYr: "18.2%",
        expense: "0.85%",
      },
      {
        name: "Pioneer Emerging Small Companies",
        category: "Small Cap",
        threeYr: "19.1%",
        fiveYr: "16.5%",
        expense: "0.78%",
      },
      {
        name: "Horizon Small Cap Opportunities",
        category: "Small Cap",
        threeYr: "20.2%",
        fiveYr: "17.3%",
        expense: "0.82%",
      },
    ],
  },
  "mid-cap": {
    title: "Mid cap funds",
    description: "Balanced growth and volatility across mid-sized companies.",
    items: [
      {
        name: "Stellar Mid Cap Opportunities",
        category: "Mid Cap",
        threeYr: "17.3%",
        fiveYr: "14.7%",
        expense: "0.72%",
      },
      { name: "Axis Momentum Mid Cap", category: "Mid Cap", threeYr: "16.1%", fiveYr: "13.9%", expense: "0.69%" },
      { name: "Crescent Mid Cap Focused", category: "Mid Cap", threeYr: "15.4%", fiveYr: "13.2%", expense: "0.66%" },
    ],
  },
  "large-cap": {
    title: "Large cap funds",
    description: "Blue-chip exposure with relatively lower volatility.",
    items: [
      {
        name: "BlueChip Large Cap Leaders",
        category: "Large Cap",
        threeYr: "12.9%",
        fiveYr: "11.4%",
        expense: "0.55%",
      },
      {
        name: "Prime Large Cap Index Plus",
        category: "Large Cap",
        threeYr: "12.2%",
        fiveYr: "10.9%",
        expense: "0.50%",
      },
      {
        name: "Anchor Large Cap Advantage",
        category: "Large Cap",
        threeYr: "11.7%",
        fiveYr: "10.4%",
        expense: "0.52%",
      },
    ],
  },
  "elss-tax-saver": {
    title: "ELSS Tax Saver funds",
    description: "Equity Linked Savings Schemes with Section 80C tax benefits.",
    items: [
      { name: "TaxShield ELSS Advantage", category: "ELSS", threeYr: "14.6%", fiveYr: "12.7%", expense: "0.62%" },
      { name: "SaveMore ELSS Growth", category: "ELSS", threeYr: "13.9%", fiveYr: "12.1%", expense: "0.60%" },
      { name: "LockIn ELSS Core", category: "ELSS", threeYr: "13.1%", fiveYr: "11.6%", expense: "0.58%" },
    ],
  },
  "high-return": {
    title: "High return funds",
    description: "Aggressive strategies targeting higher returns; risk is elevated.",
    items: [
      {
        name: "Velocity High Return Fund",
        category: "Aggressive Growth",
        threeYr: "24.1%",
        fiveYr: "19.3%",
        expense: "0.95%",
      },
      {
        name: "Momentum Flexi Cap Select",
        category: "Flexi/Aggressive",
        threeYr: "21.8%",
        fiveYr: "17.6%",
        expense: "0.88%",
      },
      {
        name: "AlphaMax Opportunities",
        category: "Aggressive Growth",
        threeYr: "23.0%",
        fiveYr: "18.5%",
        expense: "0.92%",
      },
    ],
  },
  "gold-funds": {
    title: "Gold funds",
    description: "Funds that invest in gold ETFs or bullion-linked instruments.",
    items: [
      { name: "Aurum Gold Allocation", category: "Gold", threeYr: "10.3%", fiveYr: "9.7%", expense: "0.45%" },
      { name: "Bullion Tracker Gold Fund", category: "Gold", threeYr: "9.8%", fiveYr: "9.1%", expense: "0.40%" },
      { name: "MetalCore Gold Strategy", category: "Gold", threeYr: "10.9%", fiveYr: "10.1%", expense: "0.48%" },
    ],
  },
}

export default function FundsCategoryPage({ params }: { params: { slug: string } }) {
  const data = SAMPLE_DATA[params.slug]
  const { theme, setTheme } = useTheme()

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                <Triangle className="h-3 w-3 text-primary-foreground fill-current" />
              </div>
              <h1 className="text-lg font-bold text-foreground">VPW</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-4 ml-auto">
              {["Home", "Portfolio", "Goals", "Profile"].map((label) => (
                <Link key={label} href="/" className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground">
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 max-w-3xl pt-16 pb-20">
          <h1 className="text-xl font-semibold">Funds</h1>
          <p className="text-sm text-muted-foreground mt-1">Unknown category.</p>
          <div className="mt-4">
            <Link href="/" className="text-sm text-primary hover:underline">
              Back to dashboard
            </Link>
          </div>
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
          <div className="grid grid-cols-4 h-14">
            {[
              { href: "/", label: "Home", icon: HomeIcon },
              { href: "/", label: "Portfolio", icon: BarChart3 },
              { href: "/", label: "Goals", icon: Target },
              { href: "/", label: "Profile", icon: UserIcon },
            ].map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex flex-col items-center justify-center gap-1 text-muted-foreground"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
              <Triangle className="h-3 w-3 text-primary-foreground fill-current" />
            </div>
            <h1 className="text-lg font-bold text-foreground">VPW</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-4 ml-auto">
            {["Home", "Portfolio", "Goals", "Profile"].map((label) => (
              <Link key={label} href="/" className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground">
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-5xl pt-16 pb-20">
        <header className="mb-4">
          <h1 className="text-xl font-semibold">{data.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{data.description}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.items.map((item) => (
            <div key={item.name} className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{item.name}</h4>
                <Badge variant="secondary">{item.category}</Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                3Y: {item.threeYr ?? "-"} • 5Y: {item.fiveYr ?? "-"} • Expense: {item.expense ?? "-"}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Fund details</span>
                <Button size="sm" variant="outline">
                  Invest Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link href="/" className="text-sm text-primary hover:underline">
            Back to dashboard
          </Link>
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="grid grid-cols-4 h-14">
          {[
            { href: "/", label: "Home", icon: HomeIcon },
            { href: "/", label: "Portfolio", icon: BarChart3 },
            { href: "/", label: "Goals", icon: Target },
            { href: "/", label: "Profile", icon: UserIcon },
          ].map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center gap-1 text-muted-foreground"
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
