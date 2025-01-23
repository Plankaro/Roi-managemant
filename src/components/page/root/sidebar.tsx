"use client";
import { AIBuilder } from '@/components/icons';
import { cn } from '@/lib/utils';
import { BetweenHorizonalEnd, Database, LineChart, LogOut, MessageSquare, Settings, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import {usePathname } from 'next/navigation'


export const sidebarItems = [
    { icon: AIBuilder, label: "Overview",slug:"/" },
    { icon: MessageSquare, label: "Chats", slug:"/chats" },
    { icon: BetweenHorizonalEnd, label: "Broadcast", slug:"/broadcast" },
    { icon: AIBuilder, label: "AI Builder", slug:"/ai-builder" },
    { icon: LineChart, label: "Analytics", slug:"/analytics" },
    { icon: Database, label: "Data Integration", slug:"/data-integration" },
    { icon: Users, label: "Agents", slug:"/agents" },
];


const Sidebar = () => {
    const pathname = usePathname();
    return (
        <div className="W-[940px] bg-navy-900 p-3 !rounded-[20px] flex flex-col  border border-primary backdrop-blur-3xl ">
            <nav className="space-y-2 flex-1">
                {sidebarItems.map((item) => (
                    <Link
                        href={item.slug}
                        key={item.label}
                        className={cn(
                            "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            pathname === item.slug || pathname.startsWith(`${item.slug}/`)
                                ? "bg-blue-500 text-white"
                                : "text-gray-50 hover:text-white hover:bg-white/10"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="mt-auto space-y-2">
                <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-50 hover:text-white hover:bg-white/5">
                    <Settings className="h-5 w-5" />
                    Settings
                </button>
                <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-50 hover:text-white hover:bg-white/5">
                    <LogOut className="h-5 w-5" />
                    Log Out
                </button>
            </div>
        </div>
    )
}

export default Sidebar
