/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,

  Tooltip,
} from "recharts";

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

function AbondnedAnalytics() {
  //   const totalProfit = revenue - expense;

  const data = [
    {
      name: "User\nEngaged",
      total: 100,
      fill: "#4285F4", //
    },
    {
      name: "User\nAbandoned",
      total: 200,
      fill: "#1E3A8A",
    },
  ];
  //   const data = [
  //     {
  //       name: "User\nEngaged",
  //       value: 250,
  //       fill: "#4285F4", // bg-blue-500 equivalent
  //     },
  //     {
  //       name: "User\nAbandoned",
  //       value: 230,
  //       fill: "#1E3A8A", // bg-blue-600 equivalent
  //     },
  //   ]

  return (
    <Card className=" h-full p-4  md:p-6  bg-backgroundColor border-primary border shadow-lg rounded-xl ">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {/* {totalProfit < 0 ? 'Total Loss' : 'Total Profit'}: ₹{Math.abs(100).toLocaleString()}  */}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="basis-4/6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%" className={"min-h-[300px]"}>
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
                  tick={{ fill: "#ffffff" }} // Correct white hex code
                />

                <Tooltip
                  content={CustomTooltip}
                  cursor={{ fill: "transparent" }}
                />
                <Bar dataKey="total" fill="#4064AC" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500 text-white" />
              <p className="text-sm text-white">
                Users Engaged Average increased by 20% from past week
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <p className="text-sm text-white">
                User Abandoned Average decreased by 12% from past week
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AbondnedAnalytics;
