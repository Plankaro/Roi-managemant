/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { BroadcastDetailResult } from "@/zod/broadcast/broadcast"



const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-black/80 px-3 py-2 rounded-lg border border-white/10">
        <p className="text-white font-medium">{data.name}</p>
        <p className="text-zinc-400 text-sm">
          Count: <span className="text-white">{data.value.toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function MessageStatus({ selectedBroadcast}: {selectedBroadcast:BroadcastDetailResult | undefined}) {

  if(!selectedBroadcast) return null
  //console.log(selectedBroadcast)
const {readCount,failedCount,skippedCount,deliveredCount} = selectedBroadcast

  const chartData = [
    { name: "Delivered", value: deliveredCount, fill: "#A7B8D9" },
    { name: "Read", value: readCount, fill: "#1B2A48" },
    { name: "Failed", value: failedCount, fill: "#E61B23" },
    { name: "Skipped", value: skippedCount, fill: "#2563EB" },
  ]

  const totalMessages = selectedBroadcast.totalMessages


 

  // const chartConfig = {
  //   visitors: {
  //     label: "Visitors",
  //   },
  //   chrome: {
  //     label: "Chrome",
  //     color: "hsl(var(--chart-1))",
  //   },
  //   safari: {
  //     label: "Safari",
  //     color: "hsl(var(--chart-2))",
  //   },
  //   firefox: {
  //     label: "Firefox",
  //     color: "hsl(var(--chart-3))",
  //   },
  //   edge: {
  //     label: "Edge",
  //     color: "hsl(var(--chart-4))",
  //   },
  //   other: {
  //     label: "Other",
  //     color: "hsl(var(--chart-5))",
  //   },
  // } satisfies ChartConfig

  return (

      <Card className="text-white bg-transparent h-full border-primary">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-lg font-normal">Message delivery status</CardTitle>
          <p className="text-2xl font-semibold text-red-500">
            {totalMessages} <span className="text-sm font-normal text-zinc-400">messages sent</span>
          </p>
        </CardHeader>
        <CardContent className="space-y-8 md:p-6 p-1">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 min-h-[200px]">
            <div className="relative w-full h-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="65%"
                    outerRadius="100%"
                    strokeWidth={0}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex md:flex-col gap-4 justify-center">
              {chartData.map((item, index) => (
                <div key={index} className="flex  items-center gap-2 md:ml-0 ml-4">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="text-sm text-zinc-400">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <Tabs defaultValue="failed" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-transparent">
              <TabsTrigger value="failed" className="text-xs sm:text-base">Failed Reasons</TabsTrigger>
              <TabsTrigger value="skipped" className="text-xs sm:text-base">Skipped Reasons</TabsTrigger>
            </TabsList>
            <TabsContent value="failed">
              <ScrollArea className="h-[200px] w-full border-none p-4 no-scrollbar">
                <div className="space-y-3">
                  {selectedBroadcast && selectedBroadcast?.failedReasonGroups.map((item, index) => (
                    <div key={index} className="flex items-start justify-between gap-4">
                      <div className="text-sm">
                        {index + 1}. {item.failedReason}
                      </div>
                      <div className="text-sm text-zinc-400">{item.count}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="skipped">
              <ScrollArea className="h-[200px] w-full border-none p-4 no-scrollbar">
                <div className="space-y-3">
                  {selectedBroadcast && selectedBroadcast?.skippedReasonGroups.map((item, index) => (
                    <div key={index} className="flex items-start justify-between gap-4">
                      <div className="text-sm">
                        {index + 1}. {item.failedReason}
                      </div>
                      <div className="text-sm text-zinc-400">{item.count}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

  )
}