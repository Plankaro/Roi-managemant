/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Bar, BarChart, Legend, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { useGetChatAnalyticsQuery } from "@/store/features/apislice"

export function AgentMessagesChart() {
  const { analytics } = useSelector((state: RootState) => state)
  const { data: analyticsData } = useGetChatAnalyticsQuery({
    startDate: new Date(analytics.startDate).toISOString(),
    endDate: new Date(analytics.endDate).toISOString(),
  })

  const data = analyticsData?.messagesByAgents?.map((agent: any) => ({
    name: agent.senderName,
    messageCount: agent.messageCount,
  }))

  // Calculate the maximum message count for Y-axis scaling
  const maxMessageCount = Math.max(...(data?.map((item: any) => item.messageCount) || [0]))

  // Determine the appropriate scale for the Y-axis with a minimum of 50
  const getYAxisScale = (maxValue: number) => {
    // Set minimum scale to 50
    if (maxValue <= 50) {
      return { max: 50, step: 10 }
    }

    // For values larger than 50, find appropriate scale
    // Find the appropriate magnitude (10, 100, 1000, etc.)
    const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)))

    // Calculate a nice rounded maximum that's slightly higher than the actual maximum
    const roundedMax = Math.ceil(maxValue / magnitude) * magnitude

    // Determine the step size (divide into 5 steps)
    const step = roundedMax / 5

    return { max: roundedMax, step }
  }

  const { max: yAxisMax, step: yAxisStep } = getYAxisScale(maxMessageCount)

  // Generate sequential ticks based on the calculated step
  const ticks = Array.from({ length: 6 }, (_, i) => i * yAxisStep)

  return (
    <Card className="w-full h-full bg-backgroundColor border-primary border rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 pt-4">
        <CardTitle className="text-xl font-medium text-white">Agent Messages</CardTitle>
        <Button variant="ghost" size="icon" className="text-white hover:bg-gray-400/20">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="w-full">
          <div className="h-[400px] max-w-[30vw]">
            <ChartContainer
              className="h-full w-full"
              config={{
                agentMessages: {
                  label: "Agent Messages",
                  color: "hsl(221, 70%, 55%)",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                  barGap={2} // Reduced gap between bars in the same category
                  barCategoryGap={5} // Reduced gap between different categories
                >
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "white", fontSize: 12 }} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "white", fontSize: 12 }}
                    ticks={ticks}
                    domain={[0, yAxisMax]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "transparent" }} />
                  <Bar
                    dataKey="messageCount"
                    stackId="a"
                    barSize={40} // Increased bar width
                    radius={[4, 4, 0, 0]}
                    fill="var(--color-agentMessages)"
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 12, color: "white" }}
                    align="center"
                    verticalAlign="bottom"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <ScrollBar orientation="horizontal" className="bg-white/20 hover:bg-white/25 rounded-full" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default AgentMessagesChart
