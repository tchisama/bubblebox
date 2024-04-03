import { Navbar } from "@/components/global/navbar"
import { Header } from "@/components/global/header"
import { DashboardMain } from "@/components/global/dashboardMain"
import { RightSideDashboard } from "@/components/global/rightSideDashboard"

export default function Dashboard() {
  return (
              <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
    <DashboardMain />
    </main>
  )
}
