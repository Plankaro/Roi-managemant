"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, Label } from "recharts"
import { BentoGrid } from "@/components/ui/bentogrid"
import MessageStatus from "@/components/page/broadcast/messagestatus"

const metrics = [
  { label: "Orders", value: "641" },
  { label: "ROI", value: "₹641.00" },
  { label: "Link Clicks", value: "12" },
  { label: "Button Clicks", value: "12" },
  { label: "Conversions", value: "12" },
  { label: "Replies", value: "12" },
]

const deliveryData = [
  { name: "Received", value: 1500, color: "#8884d8" },
  { name: "Retry", value: 200, color: "#4B5563" },
  { name: "Failed", value: 121, color: "#EF4444" },
  { name: "Skipped", value: 100, color: "#2563EB" },
]

export default function BroadcastDetails() {
  const [expandedCell, setExpandedCell] = useState<string | null>(null)

  const handleCellClick = (cellId: string) => {
    setExpandedCell(expandedCell === cellId ? null : cellId)
  }

  return (
    <div className="min-h-screen bg-transparent p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-white">Broadcast- All Product of the month</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="border-blue-500 border-2 bg-transparent text-white hover:bg-blue-500/10">
            Exit
          </Button>
          <Button className="bg-blue-500 text-white hover:bg-blue-600">Download Report</Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-160px)] bg-transparent">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="border-primary bg-transparent">
              <CardContent className="p-4">
                <p className="text-sm text-gray-400">{metric.label}</p>
                <p className="text-lg font-semibold mt-1 text-white">{metric.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <MessageStatus/>
      </ScrollArea>
    </div>
  )
}



