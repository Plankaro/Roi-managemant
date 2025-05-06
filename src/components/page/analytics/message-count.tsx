/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardHeader } from "@/components/ui/card";
import { useGetChatAnalyticsQuery } from "@/store/features/apislice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Bar, BarChart, ResponsiveContainer, XAxis, Tooltip } from "recharts";

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
  const { analytics } = useSelector((state: RootState) => state);
  const { data: chat } = useGetChatAnalyticsQuery({
    startDate: new Date(analytics.startDate).toISOString(),
    endDate: new Date(analytics.endDate).toISOString(),
  });

  //   const totalProfit = revenue - expense;

  const data = [
    {
      name: "Total chat",
      total: chat?.totalMessages ?? 0,
      fill: "#4285F4", //
    },
    {
      name: "Automated Chat",
      total: chat?.automatedMessages ?? 0,
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
      <CardHeader className="text-white text-xl">Total Chats</CardHeader>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {/* {totalProfit < 0 ? 'Total Loss' : 'Total Profit'}: ₹{Math.abs(100).toLocaleString()}  */}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="basis-3/6 h-[300px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
              className={"min-h-[300px] "}
            >
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
                <Bar
                  dataKey="total"
                  fill="#4064AC"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          
    <div className="space-y-4">
      {data.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-white">
          <div
            className="h-3 w-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.fill }}
          />
          <span className="text-sm font-medium">{entry.name}</span>
          <span className="text-sm">{entry.total.toLocaleString()}</span>
        </div>
      ))}
    </div>
        </div>
      </div>
    </Card>
  );
}

export default ProfileChart;
