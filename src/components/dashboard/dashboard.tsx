import React from "react"
import { CurrentlyReading } from "./currently-reading"
import { DashboardLayout } from "./dashboard-layout"
import { ReadingStats } from "./reading-stats"
import { RecentActivity } from "./recent-activity"

export default function Dashboard() {
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <ReadingStats />
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <CurrentlyReading />
                    </div>
                    <div>
                        <RecentActivity />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
