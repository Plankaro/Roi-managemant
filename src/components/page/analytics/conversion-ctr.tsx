/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Generate 30 days of sample data with more wavy transitions
const generateData = () => {
  const data = [];
  let prevConversion = 45;
  let prevCTR = 20;
  
  for (let i = 0; i < 30; i++) {
    // Use sinusoidal variations for wavier patterns
    const conversionDelta = Math.sin(i * 0.5) * 10 + (Math.random() - 0.5) * 8;
    const ctrDelta = Math.cos(i * 0.4) * 8 + (Math.random() - 0.5) * 5;
    
    prevConversion = Math.max(40, Math.min(80, prevConversion + conversionDelta));
    prevCTR = Math.max(15, Math.min(35, prevCTR + ctrDelta));
    
    data.push({
      date: `Day ${i + 1}`,
      conversion: Math.round(prevConversion),
      ctr: Math.round(prevCTR)
    });
  }
  return data;
};

const data = generateData();

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

export default function ConversionsAnalytics() {
  return (
    <Card className="col-span-full bg-backgroundColor border-primary text-white">
      <CardHeader>
        <CardTitle>Conversion vs CTR</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full relative">
          <div className="h-[400px] w-[1200px] min-w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
              >
                <defs>
                  <linearGradient id="colorConversion" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3A5B9D" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3A5B9D" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorCTR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D11920" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#E75050CC" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
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
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="natural"
                  dataKey="conversion"
                  stroke="#818cf8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorConversion)"
                  name="Conversion"
                  dot={false}
                  activeDot={{ r: 4, fill: "#818cf8" }}
                />
                <Area
                  type="natural"
                  dataKey="ctr"
                  stroke="#f87171"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCTR)"
                  name="CTR"
                  dot={false}
                  activeDot={{ r: 4, fill: "#f87171" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <ScrollBar 
            orientation="horizontal" 
            className="bg-blue-500 hover:bg-blue-500 rounded-full"
            // thumbClassName="bg-blue-500 hover:bg-blue-600 rounded-full"
          />
        </ScrollArea>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-indigo-400" />
            <span className="text-sm">Conversion</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <span className="text-sm">CTR</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}