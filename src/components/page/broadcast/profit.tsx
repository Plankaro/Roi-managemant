/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  {
    name: "Revenue",
    total: 75685
  },
  {
    name: "Expenses",
    total: 51234
  }
];

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

function ProfileChart() {
  const totalProfit = data[0].total - data[1].total;

  return (
 
      <Card className=" bg-transparent h-full p-4  md:p-6  border-primary  shadow-lg rounded-xl ">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              Total Profit: ₹{totalProfit.toLocaleString()}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="basis-5/6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={data} 
                  barGap={40}
                  barCategoryGap={20}
                  margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
                >
                  <XAxis
                    dataKey="name"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                    hide
                  />
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
                    radius={[4, 4, 0, 0]}
                    
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col justify-center gap-6 ">
              <div className="flex flex-col">
                <div className="text-sm text-gray-300">Total revenue</div>
                <div className="font-bold text-lg text-green-500">{data[0].total.toLocaleString()}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-sm text-gray-300">Expenses</div>
                <div className="font-bold text-lg text-red-500">{data[1].total.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    
  );
}

export default ProfileChart;