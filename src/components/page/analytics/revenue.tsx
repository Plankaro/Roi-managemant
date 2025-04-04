/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {  Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


const data = [
    { date: "Day 1", conversion: 50, ctr: 22, revenue: 35 },
    { date: "Day 2", conversion: 55, ctr: 24, revenue: 40 },
    { date: "Day 3", conversion: 53, ctr: 23, revenue: 38 },
    { date: "Day 4", conversion: 60, ctr: 27, revenue: 45 },
    { date: "Day 5", conversion: 65, ctr: 30, revenue: 50 },
    { date: "Day 6", conversion: 70, ctr: 32, revenue: 55 },
    { date: "Day 7", conversion: 75, ctr: 33, revenue: 60 },
    { date: "Day 8", conversion: 73, ctr: 31, revenue: 58 },
    { date: "Day 9", conversion: 72, ctr: 30, revenue: 57 },
    { date: "Day 10", conversion: 68, ctr: 28, revenue: 52 },
    { date: "Day 11", conversion: 66, ctr: 26, revenue: 48 },
    { date: "Day 12", conversion: 63, ctr: 25, revenue: 44 },
    { date: "Day 13", conversion: 60, ctr: 24, revenue: 42 },
    { date: "Day 14", conversion: 58, ctr: 23, revenue: 40 },
    { date: "Day 15", conversion: 55, ctr: 22, revenue: 38 },
    { date: "Day 16", conversion: 53, ctr: 21, revenue: 35 },
    { date: "Day 17", conversion: 52, ctr: 20, revenue: 34 },
    { date: "Day 18", conversion: 51, ctr: 19, revenue: 32 },
    { date: "Day 19", conversion: 50, ctr: 18, revenue: 30 },
    { date: "Day 20", conversion: 49, ctr: 18, revenue: 28 },
    { date: "Day 21", conversion: 48, ctr: 17, revenue: 27 },
    { date: "Day 22", conversion: 47, ctr: 17, revenue: 26 },
    { date: "Day 23", conversion: 46, ctr: 16, revenue: 25 },
    { date: "Day 24", conversion: 45, ctr: 16, revenue: 24 },
    { date: "Day 25", conversion: 44, ctr: 15, revenue: 23 },
    { date: "Day 26", conversion: 43, ctr: 15, revenue: 22 },
    { date: "Day 27", conversion: 42, ctr: 14, revenue: 21 },
    { date: "Day 28", conversion: 41, ctr: 14, revenue: 20 },
    { date: "Day 29", conversion: 40, ctr: 13, revenue: 19 },
    { date: "Day 30", conversion: 39, ctr: 13, revenue: 18 },
  ];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20">
          <p className="text-white font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
function RevenueAnalytics() {
  return (
    <Card className="col-span-full bg-backgroundColor border-primary text-white">
    <CardHeader>
      <CardTitle>Revenue</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="w-full relative">
        <div className="h-[400px] w-[1200px] min-w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
            >
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={70}
                dy={25}
              />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />}    cursor={{ fill: "transparent" }}/>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
              <Bar
                dataKey="revenue"
                fill="url(#colorRevenue)"
                radius={[4, 4, 0, 0]}
                name="Revenue"
              />
            </BarChart>
          </ResponsiveContainer>
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

export default RevenueAnalytics