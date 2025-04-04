"use client"

import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string

}

interface AnalyticsTabsProps {
  tabs: Tab[]
  activeTab: string
  setActiveTab(tabId: string): void
}

export function AnalyticsTabs({ tabs, activeTab,setActiveTab }: AnalyticsTabsProps) {
    console.log(setActiveTab)
  return (
    <div className="flex space-x-4 border-b border-gray-700 mb-6">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "px-4 py-2 sm:text-sm text-xs font-medium transition-colors relative",
            tab.id === activeTab ? "text-white" : "text-gray-400 hover:text-white cursor-pointer",
          )}
        >
          {tab.label}
          {tab.id === activeTab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
        </div>
      ))}
    </div>
  )
}

