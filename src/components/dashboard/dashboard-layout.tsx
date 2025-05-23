"use client"

import React, { useState } from "react"
import {
    BookOpen,
    BookText,
    Home,
    Library,
    Search,
    Settings,
    User,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Link, useRouterState } from "@tanstack/react-router"
import DragWindowRegion from "../DragWindowRegion"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const { location } = useRouterState()
    const pathname = location.pathname

    const [search, setSearch] = useState("")

    const navigation = [
        { name: "Dashboard", href: "/", icon: Home },
        { name: "Library", href: "/library", icon: Library },
        { name: "Reading Now", href: "/reading", icon: BookOpen },
        { name: "Collections", href: "/collections", icon: BookText },
        { name: "Profile", href: "/profile", icon: User },
        { name: "Settings", href: "/settings", icon: Settings },
    ]

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <Sidebar>
                    <SidebarHeader className="flex items-center justify-between p-4">
                        <Link
                            to="/"
                            className="flex items-center gap-2 font-semibold"
                        >
                            <BookOpen className="h-6 w-6" />
                            <span>BookVerse</span>
                        </Link>
                    </SidebarHeader>
                    <div className="px-4 py-2">
                        <div className="relative">
                            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                            <Input
                                type="search"
                                placeholder="Search books..."
                                className="bg-background w-full pl-8"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <SidebarContent>
                        <SidebarMenu>
                            {navigation.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.href}
                                        tooltip={item.name}
                                    >
                                        <Link to={item.href}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter className="p-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary/10 h-8 w-8 rounded-full">
                                <img
                                    src="/placeholder.svg?height=32&width=32"
                                    alt="User avatar"
                                    className="h-full w-full rounded-full"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                    Alex Johnson
                                </span>
                                <span className="text-muted-foreground text-xs">
                                    Premium Member
                                </span>
                            </div>
                        </div>
                    </SidebarFooter>
                </Sidebar>
                <main className="flex-1 overflow-auto">
                    <DragWindowRegion />
                    <div className="container py-6">{children}</div>
                </main>
            </div>
        </SidebarProvider>
    )
}
