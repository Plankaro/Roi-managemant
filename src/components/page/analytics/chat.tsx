"use client";
import React from "react";
import MessageCountChart from "./message-count";
import { BentoGrid, BentoGridItem } from "@/components/ui/bentogrid";
import { EngagementComparisonChart } from "./message-automated-chart";
import { AgentMessagesChart } from "./agent-message-analytics";
import AbondnedAnalytics from "./abondned-chart";
import { useGetChatAnalyticsQuery } from "@/store/features/apislice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";




function ChatAnalytics() {
  const {analytics}=useSelector((state: RootState) => state);
  const {data} = useGetChatAnalyticsQuery({
    startDate: new Date(analytics.startDate).toISOString(),
  endDate: new Date(analytics.endDate).toISOString(),
  });

  console.log(data);

  const metrics = [
   
    { label: "Engagement", value: data?.totalEngagements??0 },
    { label: "Automated interaction time", value: "12" },
    { label: "Total agents messages", value: "12" },
    { label: "Total automated messages", value: "12" },
  ];

  const gridComponents = [
    <MessageCountChart key="message-count" />,
    <EngagementComparisonChart key="engagement" />,
    <AgentMessagesChart key="agent"/>,
    <AbondnedAnalytics key = "abondned"/>
];

 
  return (
    <div className="overflow-scroll no-scrollbar h-[calc(100vh-250px)]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 ">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="border-primary  border bg-backgroundColor rounded-md"
          >
            <div className="p-4">
              <p className="text-sm text-gray-400">{metric.label}</p>
              <p className="text-lg font-semibold mt-1 text-white">
                {metric.value}
              </p>
            </div>
          </div>
        ))}
      </div>
      <BentoGrid className="gap-3 md:grid-cols-2 md:px-3 ">
        {gridComponents.map((gridComponent, i) => (
          <BentoGridItem
            key={i}
            className={`
          `}
          >
            {gridComponent}
          </BentoGridItem>
        ))}
      </BentoGrid>
    </div>
  );
}

export default ChatAnalytics;
