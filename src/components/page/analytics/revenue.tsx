/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {  useMemo, } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetEcommerceAnalyticsQuery } from '@/store/features/apislice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

// --- paste or import this from your utils folder ---
import {
  differenceInDays,
  differenceInMonths,
  format,
  addDays,
  addMonths,
  addYears,
} from 'date-fns';

type RawPoint = { date: string; revenue: number | string };
export function aggregateOrdersByInterval(
  raw: RawPoint[],
  start: Date,
  end: Date
): { date: string; revenue: number }[] {
  // 1. decide bucket size & label format
  const daysSpan = differenceInDays(end, start);
  let step: (d: Date, n: number) => Date, fmt: string;

  if (daysSpan <= 60) {
    step = addDays;    fmt = 'dd/MM/yyyy';
  } else if (differenceInMonths(end, start) <= 24) {
    step = addMonths;  fmt = 'MMM';
  } else {
    step = addYears;   fmt = 'yyyy';
  }

  // 2. zero-fill all buckets
  const buckets: Record<string, number> = {};
  for (
    let cursor = new Date(start);
    cursor <= end;
    cursor = step(cursor, 1)
  ) {
    buckets[ format(cursor, fmt) ] = 0;
  }

  // 3. accumulate real orders
  raw.forEach(({ date, revenue }) => {
    const key = format(new Date(date), fmt);
    if (key in buckets) {
      buckets[key] += typeof revenue === 'string'
        ? parseFloat(revenue)
        : revenue;
    }
  });

  // 4. return sorted array of every interval
  return Object.entries(buckets).map(([date, revenue]) => ({ date, revenue }));
}
// --- end utility ---

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

function RevenueAnalytics() {
  const { analytics } = useSelector((state: RootState) => state);
  const { data } = useGetEcommerceAnalyticsQuery({
    startDate: new Date(analytics.startDate).toISOString(),
    endDate: new Date(analytics.endDate).toISOString(),
  });

  // 1. map raw order points
  const rawPoints = useMemo(() => 
    data?.getOrder?.map((o: any) => ({
      date: o.Order.created_at,
      revenue: o.Order.amount,
    })) || [],
  [data, analytics.startDate, analytics.endDate]);

  // 2. aggregate into buckets
  const points = useMemo(() => {
    return aggregateOrdersByInterval(
      rawPoints as RawPoint[],
      new Date(analytics.startDate),
      new Date(analytics.endDate)
    );
  }, [rawPoints, analytics.startDate, analytics.endDate]);

  return (
    <Card className="col-span-full bg-backgroundColor border-primary text-white">
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full relative">
          <div className="h-[400px] w-[60vw] min-w-[1070px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={points}
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
                domain={[0, (dataMax: number) => Math.ceil(dataMax / 100) * 100]}
                tickFormatter={v => `₹${v}`}
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "transparent" }}
                />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <Bar
                  dataKey="revenue"
                  barSize={30}
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
  );
}

export default RevenueAnalytics;
