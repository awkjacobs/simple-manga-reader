import { BookOpen, MoreHorizontal } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

const books = [
    {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        cover: "/placeholder.svg?height=120&width=80",
        progress: 65,
        lastRead: "Today",
        timeLeft: "3 hours left",
    },
    {
        id: 2,
        title: "Project Hail Mary",
        author: "Andy Weir",
        cover: "/placeholder.svg?height=120&width=80",
        progress: 32,
        lastRead: "Yesterday",
        timeLeft: "5 hours left",
    },
    {
        id: 3,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        cover: "/placeholder.svg?height=120&width=80",
        progress: 78,
        lastRead: "2 days ago",
        timeLeft: "1 hour left",
    },
]

export function CurrentlyReading() {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center">
                <div>
                    <CardTitle>Currently Reading</CardTitle>
                    <CardDescription>Continue where you left off</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="ml-auto gap-1">
                    <BookOpen className="h-4 w-4" />
                    View All
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {books.map((book) => (
                        <div key={book.id} className="flex items-start gap-4">
                            <div className="h-[120px] w-[80px] overflow-hidden rounded-md border">
                                <img
                                    src={book.cover || "/placeholder.svg"}
                                    alt={`Cover of ${book.title}`}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <Link href={`/book/${book.id}`} className="font-semibold hover:underline">
                                        {book.title}
                                    </Link>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">More options</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Mark as read</DropdownMenuItem>
                                            <DropdownMenuItem>Add to collection</DropdownMenuItem>
                                            <DropdownMenuItem>Share</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="text-sm text-muted-foreground">{book.author}</div>
                                <div className="flex items-center gap-2 pt-2">
                                    <Progress value={book.progress} className="h-2" />
                                    <span className="text-xs font-medium">{book.progress}%</span>
                                </div>
                                <div className="flex items-center justify-between pt-1">
                                    <span className="text-xs text-muted-foreground">Last read: {book.lastRead}</span>
                                    <span className="text-xs font-medium">{book.timeLeft}</span>
                                </div>
                                <Button variant="outline" size="sm" className="mt-2 w-full">
                                    Continue Reading
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button variant="outline" className="w-full">
                    Browse Library
                </Button>
            </CardFooter>
        </Card>
    )
}
