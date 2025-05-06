/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Bar, BarChart, XAxis ,  Tooltip,} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer} from "@/components/ui/chart"
import { useGetChatAnalyticsQuery } from "@/store/features/apislice"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-lg rounded-lg border border-gray-200">
        <p className="font-medium">{`${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }

  return null;
};

export function EngagementComparisonChart() {
  const { analytics } = useSelector((state: RootState) => state)
  const { data: analyticsData } = useGetChatAnalyticsQuery({
    startDate: new Date(analytics.startDate).toISOString(),
    endDate: new Date(analytics.endDate).toISOString(),
  })

  const totalAgentMessage =
    analyticsData?.messagesByAgents?.reduce((total: number, agent: any) => total + Number(agent.messageCount), 0) ?? 0

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
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                top: 20,
                right: 45,
                left: 5,
                bottom: 20,
              }}
              barSize={25}
              barCategoryGap={12}
            >
              <XAxis type="number" hide />
              <Bar
                dataKey="value"
                barSize={30}
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
               <Tooltip
                                content={CustomTooltip}
                                cursor={{ fill: "transparent" }}
                              />
            </BarChart>
          </ChartContainer>
        </div>
        <div className=" space-y-2 mt-20">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
              <p className="text-[11px] sm:text-xs md:text-sm text-white/80">
                {item.name}: <span className="font-medium">{item.value}</span>
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default EngagementComparisonChart
