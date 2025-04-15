/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetEngagementAnalyticsQuery } from "@/store/features/apislice";
import { RootState } from "@/store/store";

import { useSelector } from "react-redux";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts"


const COLORS = ['#4ade80', '#fb923c', '#fbbf24', '#1e293b', '#ef4444'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20">
        <p className="text-white font-medium">{data.name}</p>
        <p className="text-zinc-200 text-sm">
          Count: <span className="text-white font-medium">{data.value.toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function MessageStats() {
    const {analytics}=useSelector((state: RootState) => state);
      const {data} = useGetEngagementAnalyticsQuery({
        startDate: new Date(analytics.startDate).toISOString(),
      endDate: new Date(analytics.endDate).toISOString(),
      })
  const chartData = [
    { name: 'Messages Sent', value: (data?.sentMessage??0 + data?.deliveredMessage??0 + data?.readMessage??0) },
    { name: 'Messages Delivered', value: (data?.deliveredMessage??0 + data?.readMessage??0) },
    { name: 'Messages Read', value:  data?.readMessage??0 },
    { name: 'Messages Skipped',value:data?.skippedMessage??0 },
    { name: 'Messages Failed', value: data?.failedMessage??0 },
  ];

  const totalMessages = data?.totalMessages??0;

  return (
    <Card className="bg-backgroundColor border border-primary  text-white ">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Messages Sent to Messages Read</span>
          <div className="text-sm font-normal text-muted-foreground">
            Messages Sent: {data?.sentMessage??0 + data?.deliveredMessage??0 + data?.readMessage??0}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex lg:flex-row flex-col-reverse">
      <div className="flex lg:justify-center flex-col gap-4 mt-4 md:grid-cols-5">
          {chartData.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: COLORS[index] }} 
              />
              <div className="flex lg:flex-col lg:gap-0 gap-3">
                <span className="text-xs font-medium">{entry.name}</span>
                <span className="text-xs text-muted-foreground">
                { totalMessages ? ((entry.value / totalMessages) * 100).toFixed(1) : "0" }%

                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="min-h-[300px] w-full  md:basis-8/12">
          <ResponsiveContainer width="100%" height="100%" className={"min-h-[300px]"}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius="65%"
                outerRadius="100%"
                strokeWidth={0}
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
     
      </CardContent>
    </Card>
  )
}