/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useSelector } from 'react-redux';
import { useGetEcommerceAnalyticsQuery } from '@/store/features/apislice';
import { RootState } from '@/store/store';
// date-fns utilities
import { differenceInDays, differenceInMonths, format, addDays, addMonths, addYears } from 'date-fns';

// Generic aggregator: buckets any metric by date intervals
function aggregateByInterval(
  raw: { date: string; value: number }[],
  start: Date,
  end: Date
): Record<string, number> {
  const daysSpan = differenceInDays(end, start);
  let step: (d: Date, n: number) => Date;
  let fmt: string;
  if (daysSpan <= 60) {
    step = addDays; fmt = 'dd/MM/yyyy';
  } else if (differenceInMonths(end, start) <= 24) {
    step = addMonths; fmt = 'MMM';
  } else {
    step = addYears; fmt = 'yyyy';
  }
  const buckets: Record<string, number> = {};
  for (let cursor = new Date(start); cursor <= end; cursor = step(cursor, 1)) {
    buckets[format(cursor, fmt)] = 0;
  }
  raw.forEach(({ date, value }) => {
    const key = format(new Date(date), fmt);
    if (key in buckets) buckets[key] += value;
  });
  return buckets;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20">
        <p className="text-white font-medium">{label}</p>
        {payload.map((entry: any, idx: number) => (
          <p key={idx} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ConversionsAnalytics() {
  const { analytics } = useSelector((state: RootState) => state);
  const { data } = useGetEcommerceAnalyticsQuery({
    startDate: new Date(analytics.startDate).toISOString(),
    endDate: new Date(analytics.endDate).toISOString(),
  });

  const start = new Date(analytics.startDate);
  const end = new Date(analytics.endDate);

  // Prepare raw arrays
  const clicks = useMemo(() =>
    data?.linksClicked?.map((c: any) => ({ date: c.first_click, value: c.no_of_click })) || [],
    [data]
  );
  const conversions = useMemo(() =>
    data?.getOrder?.map((o: any) => ({ date: o.Order.created_at, value: 1 })) || [],
    [data]
  );

  // Bucket both metrics
  const bucketedClicks = useMemo(() => aggregateByInterval(clicks, start, end), [clicks, start, end]);
  const bucketedConversions = useMemo(() => aggregateByInterval(conversions, start, end), [conversions, start, end]);

  // Merge into chart data: use raw counts
  const chartData = useMemo(
    () => Object.keys(bucketedClicks).map(date => ({
      date,
      conversions: bucketedConversions[date] || 0,
      clicks: bucketedClicks[date] || 0,
    })),
    [bucketedClicks, bucketedConversions]
  );

  return (
    <Card className="col-span-full bg-backgroundColor border-primary text-white">
      <CardHeader>
        <CardTitle>Conversions vs Clicks</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full relative">
          <div className="h-[400px] w-[60vw] min-w-[1070px] ">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
                <defs>
                  <linearGradient id="colorConversion" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3A5B9D" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3A5B9D" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D11920" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#E75050" stopOpacity={0.1}/>
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
                  tickFormatter={(v) => v}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="natural"
                  dataKey="conversions"
                  stroke="#818cf8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorConversion)"
                  name="Conversions"
                  dot={false}
                  activeDot={{ r: 4, fill: "#818cf8" }}
                />
                <Area
                  type="natural"
                  dataKey="clicks"
                  stroke="#f87171"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorClicks)"
                  name="Clicks"
                  dot={false}
                  activeDot={{ r: 4, fill: "#f87171" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <ScrollBar orientation="horizontal" className="bg-white/20 hover:bg-white/25 rounded-full" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
