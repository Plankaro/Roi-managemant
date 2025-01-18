"use client";
import { AIBuilder } from '@/components/icons';
import { cn } from '@/lib/utils';
import { BetweenHorizonalEnd, Database, LineChart, LogOut, MessageSquare, Settings, Users } from 'lucide-react';
import React from 'react'

export const sidebarItems = [
    { icon: AIBuilder, label: "Overview" },
    { icon: MessageSquare, label: "Chats", active: true },
    { icon: BetweenHorizonalEnd, label: "Broadcast" },
    { icon: AIBuilder, label: "AI Builder" },
    { icon: LineChart, label: "Analytics" },
    { icon: Database, label: "Data Integration" },
    { icon: Users, label: "Agents" },
];


const Sidebar = () => {
    return (
        <div className="w-64 bg-navy-900 p-3 !rounded-[20px] flex flex-col  border border-primary backdrop-blur-3xl ">
            <nav className="space-y-2 flex-1">
                {sidebarItems.map((item) => (
                    <button
                        key={item.label}
                        className={cn(
                            "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            item.active
                                ? "bg-blue-500 text-white"
                                : "text-gray-50 hover:text-white hover:bg-white/10"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </button>
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
