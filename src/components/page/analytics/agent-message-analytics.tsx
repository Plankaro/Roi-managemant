/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Bar, BarChart, Legend, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useGetChatAnalyticsQuery } from "@/store/features/apislice"

export function AgentMessagesChart() {
  const { analytics } = useSelector((state: RootState) => state);
  const { data: analyticsData } = useGetChatAnalyticsQuery({
    startDate: new Date(analytics.startDate).toISOString(),
    endDate: new Date(analytics.endDate).toISOString(),
  });

  const data = analyticsData?.messagesByAgents?.map((agent: any) => ({
    name: agent.senderName,
    messageCount: agent.messageCount
  }));

  // Calculate the maximum message count and set appropriate Y-axis settings
  const maxMessageCount = Math.max(...(data?.map((item:any) => item.messageCount) || [0]));
  const yAxisMax = Math.ceil(maxMessageCount / 10) * 10 + 20; // Round up to nearest 10 and add 20 for padding
  const tickCount = Math.min(10, Math.ceil(yAxisMax / 10)); // Ensure we don't have too many ticks
  const ticks = Array.from({ length: tickCount }, (_, i) => Math.round((i * yAxisMax) / (tickCount - 1)));

  return (
    <Card className="w-full h-full bg-backgroundColor border-primary border rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 pt-4">
        <CardTitle className="text-xl font-medium text-white">Agent Messages</CardTitle>
        <Button variant="ghost" size="icon" className="text-white hover:bg-gray-400/20">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="w-full ">
          <div className="h-[400px] min-w-full">
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
                  barGap={0}
                  barCategoryGap="10%"
                >
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "white", fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "white", fontSize: 12 }}
                    ticks={ticks}
                    domain={[0, yAxisMax]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "transparent" }}/>
                  <Bar
                    dataKey="messageCount"
                    stackId="a"
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
          <ScrollBar 
            orientation="horizontal" 
            className="bg-white/20 hover:bg-white/25 rounded-full"
          />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default AgentMessagesChart;