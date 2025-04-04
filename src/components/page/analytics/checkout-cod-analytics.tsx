import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts"



const COLORS = ['#1e40af', '#ef4444'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export default function CodToCheckoutAnalytics() {
  const chartData = [
    { name: 'Abondned Carts', value:100 },
    { name: 'Recovered Carts', value: 200 }
  ];

  const totalMessages = chartData.reduce((acc, curr) => acc + curr.value, 0);


  return (
    <Card className="bg-backgroundColor border border-primary  text-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Abondned cart to recovered carts</span>
          <div className="text-sm font-normal text-muted-foreground">
            Session Messages: {544}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex lg:flex-row flex-col">
        <div className="h-[300px] w-full relative basis-8/12">
          <ResponsiveContainer width="100%" height="100%">
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
        <div className="flex lg:flex-col flex-row items-center justify-center gap-4 mt-4">
          {chartData.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: COLORS[index] }} 
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{entry.name}</span>
                <span className="text-xs text-muted-foreground">
                  {((entry.value / totalMessages) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}