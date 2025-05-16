import { BookOpen, Clock, Target, TrendingUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
    {
        title: "Books Read",
        value: "12",
        icon: BookOpen,
        description: "This year",
        change: "+2 from last month",
        changeType: "increase",
    },
    {
        title: "Reading Streak",
        value: "28",
        icon: TrendingUp,
        description: "Days",
        change: "+5 from last week",
        changeType: "increase",
    },
    {
        title: "Reading Time",
        value: "42",
        icon: Clock,
        description: "Hours this month",
        change: "+3 from last month",
        changeType: "increase",
    },
    {
        title: "Completion Rate",
        value: "87%",
        icon: Target,
        description: "Of started books",
        change: "+2% from last month",
        changeType: "increase",
    },
]

export function ReadingStats() {
    return (
        <>
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">{stat.description}</p>
                        <div className="mt-2 text-xs font-medium text-green-600">{stat.change}</div>
                    </CardContent>
                </Card>
            ))}
        </>
    )
}
