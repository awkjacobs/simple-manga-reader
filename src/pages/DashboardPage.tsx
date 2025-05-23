import { CurrentlyReading } from "@/components/dashboard/currently-reading"
import { ReadingStats } from "@/components/dashboard/reading-stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import React from "react"

export default function DashboardPage() {
    return (
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
    )
}
