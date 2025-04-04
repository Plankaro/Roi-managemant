"use client"

import { Bar, BarChart, Legend, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const data = [
  {
    name: "Naman",
    agentMessages: 520,
    engagementResponses: 200,
  },
  {
    name: "Ram",
    agentMessages: 200,
    engagementResponses: 180,
  },
  {
    name: "Ankit",
    agentMessages: 320,
    engagementResponses: 200,
  },
  {
    name: "Anil",
    agentMessages: 420,
    engagementResponses: 200,
  },
  {
    name: "Aman",
    agentMessages: 120,
    engagementResponses: 200,
  },
  {
    name: "Sam",
    agentMessages: 320,
    engagementResponses: 200,
  },
  {
    name: "Suraj",
    agentMessages: 520,
    engagementResponses: 200,
  },
]

export function AgentMessagesChart() {
  return (
    <Card className="w-full h-full bg-backgroundColor border-primary border rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 pt-4">
        <CardTitle className="text-xl font-medium text-white">Agent Messages</CardTitle>
        <Button variant="ghost" size="icon" className="text-white hover:bg-gray-400/20">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="w-full  relative ">
          <div className="h-[250px] sm:h-[280px] w-[600px] md:h-[300px]">
            <ChartContainer
              className="h-full w-full"
              config={{
                agentMessages: {
                  label: "Agent Messages",
                  color: "hsl(221, 70%, 55%)",
                },
                engagementResponses: {
                  label: "Engagement responses",
                  color: "hsl(221, 70%, 30%)",
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
                    ticks={[0, 100, 200, 300, 400, 500, 600, 700, 800]}
                    domain={[0, 800]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "transparent" }}/>
                  <Bar
                    dataKey="agentMessages"
                    stackId="a"
                    radius={[0, 0, 0, 0]}
                    fill="var(--color-agentMessages)"
                  />
                  <Bar
                    dataKey="engagementResponses"
                    stackId="a"
                    radius={[4, 4, 0, 0]}
                    fill="var(--color-engagementResponses)"
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
