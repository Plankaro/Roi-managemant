"use client";
import React, { ReactNode } from 'react'
import { sidebarItems } from './page';
import { LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';



const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex h-screen'>
            {/* Sidebar */}
            <div className="w-64 bg-navy-900 p-4 flex flex-col border-r border-gray-800">
                <div className="flex items-center gap-2 mb-8">
                    <div className="text-red-500 font-bold text-2xl">ROI</div>
                    <div className="text-white font-bold text-2xl">Magnet</div>
                </div>

                <nav className="space-y-2 flex-1">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.label}
                            className={cn(
                                "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                item.active
                                    ? "bg-white/10 text-white"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto space-y-2">
                    <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5">
                        <Settings className="h-5 w-5" />
                        Settings
                    </button>
                    <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5">
                        <LogOut className="h-5 w-5" />
                        Log Out
                    </button>
                </div>
            </div>
            {children}
        </div>
    )
}

export default DashboardLayout
