/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import { BroadcastDetailResult } from "@/zod/broadcast/broadcast";
import { Bar, BarChart, ResponsiveContainer,  YAxis, Tooltip } from "recharts";



const CustomTooltip = ({ active, payload}: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20">
        <p className="text-white font-medium">{payload[0]?.value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

function Funnel({ selectedBroadcast }: { selectedBroadcast: BroadcastDetailResult }) {
  if(!selectedBroadcast) return
  const {sentCount,readCount,failedCount,skippedCount,deliveredCount} = selectedBroadcast
  const totalMessages = sentCount + readCount + failedCount + deliveredCount + skippedCount 

  const data = [
    {
      name: "Processed",
      total: totalMessages
    },
    {
      name: "Delivered",
      total: selectedBroadcast?.deliveredCount??0
    },
    {
      name: "Read",
      total: selectedBroadcast?.readCount??0
    },
    {
      name: "Unique Engage",
      total: 1
    }
  ];
  return (
  
      <Card className="p-4 md:p-6 h-full bg-transparent border-primary shadow-lg rounded-xl">
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Funnel
          </h2>
          
          <div className="grid grid-cols-4 gap-4 text-center">
            {data.map((item, index) => (
              <div key={index} className="space-y-1">
                <p className="text-gray-300 sm:text-sm text-xs">{item.name}</p>
                <p className="text-red-500 font-medium md:text-base sm:text-sm text-xs">{item?.total.toLocaleString()}</p>
              </div>
            ))}
          </div>
          
          <div className="h-[200px] min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={data} 
                barGap={0}
                barCategoryGap={10}
                margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
              >
                <YAxis
                  hide={true}
                />
                <Tooltip
                  content={CustomTooltip}
                  cursor={{ fill: 'transparent' }}
                />
                <Bar
                  dataKey="total"
                  fill="#4064AC"
                  radius={[0, 0, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
  
  );
}

export default Funnel;