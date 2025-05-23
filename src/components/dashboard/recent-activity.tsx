import React from "react";
import { BookMarked, BookOpen, Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  {
    id: 1,
    type: "completed",
    book: "Dune",
    time: "2 days ago",
    icon: BookMarked,
  },
  {
    id: 2,
    type: "started",
    book: "The Psychology of Money",
    time: "3 days ago",
    icon: BookOpen,
  },
  {
    id: 3,
    type: "reading",
    book: "Project Hail Mary",
    time: "5 days ago",
    pages: "42 pages",
    icon: Clock,
  },
  {
    id: 4,
    type: "completed",
    book: "Thinking, Fast and Slow",
    time: "1 week ago",
    icon: BookMarked,
  },
  {
    id: 5,
    type: "started",
    book: "The Midnight Library",
    time: "1 week ago",
    icon: BookOpen,
  },
];

export function RecentActivity() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-full">
                <activity.icon className="text-primary h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm leading-none font-medium">
                  {activity.type === "completed" && "Finished reading"}
                  {activity.type === "started" && "Started reading"}
                  {activity.type === "reading" && "Read"}
                </p>
                <p className="text-sm">{activity.book}</p>
                <div className="flex items-center gap-2">
                  <p className="text-muted-foreground text-xs">
                    {activity.time}
                  </p>
                  {activity.pages && (
                    <>
                      <span className="text-muted-foreground text-xs">•</span>
                      <p className="text-muted-foreground text-xs">
                        {activity.pages}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
