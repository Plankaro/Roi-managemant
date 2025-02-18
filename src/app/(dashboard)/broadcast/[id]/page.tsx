"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, Label } from "recharts"
import { BentoGrid, BentoGridItem } from "@/components/ui/bentogrid"
import MessageStatus from "@/components/page/broadcast/messagestatus"
import ProfitChart from "@/components/page/broadcast/profit"
import Funnel from "@/components/page/broadcast/funnel"
import PreviewComponent from "@/components/page/broadcast/previewComponent"
import BroadcastAndRetries from "@/components/page/broadcast/Broadcastretries"

const metrics = [
  { label: "Orders", value: "641" },
  { label: "ROI", value: "₹641.00" },
  { label: "Link Clicks", value: "12" },
  { label: "Button Clicks", value: "12" },
  { label: "Conversions", value: "12" },
  { label: "Replies", value: "12" },
]



export default function BroadcastDetails() {




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
        <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="border-primary border bg-transparent">
              <div className="p-4">
                <p className="text-sm text-gray-400">{metric.label}</p>
                <p className="text-lg font-semibold mt-1 text-white">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>
        <BentoGrid className="gap-3 px-3">
  {gridComponents.map((gridComponent, i) => (
    <BentoGridItem
      key={i}
      className={`
        /* Base / Medium screens */
      


        ${i === 0 ? "" : ""} 
        ${i === 1 ? "" : ""} 
        ${i === 2 ? "" : ""} 
        ${i === 3 ? "" : ""} 
        ${i === 4 ? "" : ""}

       
        ${i === 0 ? "xl:col-span-3 xl:row-span-2 xl:order-1 lg:col-span-3 lg:row-span-2" : ""}
        ${i === 1 ? "xl:col-span-2 xl:row-span-1 xl:order-2 lg:col-span-5 lg:row-span-1" : ""}
        ${i === 2 ? "xl:col-span-3 xl:row-span-1 xl:order-3 lg:col-span-5 lg:row-span-1" : ""}
        ${i === 3 ? "xl:col-span-5 xl:row-span-4 xl:order-4 lg:order-5 lg:col-span-5 lg:row-span-4 " : ""}
        ${i === 4 ? "xl:col-span-3 xl:row-span-3 xl:order-5 lg:col-span-3 lg:row-span-3 " : ""}
      `}
    >
      {gridComponent}
    </BentoGridItem>
  ))}
</BentoGrid>
      </ScrollArea>
    </div>
  )
}
const gridComponents = [
  <MessageStatus key="message-status" />,
  <ProfitChart key="profit-chart" />,
  <Funnel key="funnel" />,
  <PreviewComponent key="preview-component" />,
  <BroadcastAndRetries key="broadcast-retries" />
];


