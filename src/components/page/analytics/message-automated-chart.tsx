/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Bar, BarChart, XAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { useGetChatAnalyticsQuery } from "@/store/features/apislice"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"



export function EngagementComparisonChart() {
  const {analytics}=useSelector((state: RootState) => state);
    const {data:analyticsData} = useGetChatAnalyticsQuery({
      startDate: new Date(analytics.startDate).toISOString(),
    endDate: new Date(analytics.endDate).toISOString(),
    });
    const totalAgentMessage =  analyticsData?.messagesByAgents?.reduce(
      (total: number, agent: any) => total + Number(agent.messageCount),
      0
    ) ?? 0
    const data = [
      {
        name: "Agent Engagement",
        value: totalAgentMessage,
        fill: "#4285F4",
      },
      {
        name: "Automated Engagement",
        value: analyticsData?.automatedMessages ?? 0,
        fill: "#1E3A8A",
      },
    ]
  return (
    <Card className="w-full h-full bg-backgroundColor border-primary border rounded-xl overflow-hidden">
      <CardHeader className="flex items-center justify-between pb-2 px-2 sm:px-4 pt-4">
        <CardTitle className="text-sm sm:text-base md:text-lg font-medium text-white">
          Agent vs Automated Engagement
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
        <div className="w-full h-[180px] sm:h-[200px] md:h-[220px]">
          <ChartContainer
            className="h-full w-full"
            config={{
              value: {
                label: "Value",
                color: "white",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout="vertical"
                margin={{ 
                  top: 20,
                  right: 45,
                  left: 5,
                  bottom: 20 
                }}
                barSize={25}
                barCategoryGap={12}
              >
                <XAxis type="number" hide />
                <Bar
                  dataKey="value"
                  radius={[0, 6, 6, 0]}
                  fill="#ffffff"
                  label={{
                    position: "right",
                    fill: "white",
                    fontSize: 11,
                    formatter: (value: any) => value,
                    dx: 5,
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-3 space-y-2">
          {/* <p className="text-[11px] sm:text-xs md:text-sm text-white/80">
            Average Automated Engagement increased by 18% from past week
          </p>
          <p className="text-[11px] sm:text-xs md:text-sm text-white/80">
            Average Agent Engagement increased by 12% from past week
          </p> */}
        </div>
      </CardContent>
    </Card>
  )
}

export default EngagementComparisonChart