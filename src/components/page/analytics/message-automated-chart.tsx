/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Bar, BarChart, XAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"


const data = [
  {
    name: "Agent Engagement",
    value: 180,
    fill: "#4285F4",// White fill
  },
  {
    name: "Automated Engagement",
    value: 290,
    fill: "#1E3A8A",// White fill
  },
]

export function EngagementComparisonChart() {
  return (
    <Card className="w-full h-full bg-backgroundColor border-primary border rounded-xl overflow-hidden ">
      <CardHeader className="flex  items-center justify-between pb-2 px-4 pt-4">
        <CardTitle className="text-lg sm:text-xl font-medium text-white">
          Agent Engagement vs Automated Engagement
        </CardTitle>
        
      </CardHeader>
      <CardContent className="p-4 ">
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
                margin={{ top: 50, right: 40, left: 20, bottom: 40 }}
                barSize={50}
                barCategoryGap={20}
              
              >
                <XAxis type="number" hide />
                <Bar
                
                  dataKey="value"
                  radius={[0, 6, 6, 0]}
                  fill="#ffffff"
                  label={{
                    position: "right",
                    fill: "white",
                    fontSize: 14,
                    formatter: (value:any) => value,
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-3 space-y-1">
          <p className="text-xs text-white">
            Average Automated Engagement increased by 18% from past week
          </p>
          <p className="text-xs text-white">
            Average Agent Engagement increased by 12% from past week
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default EngagementComparisonChart