/* eslint-disable @typescript-eslint/no-explicit-any */
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
import ChatAnalyticsSkeleton from "./analytics-skeleton";

function ChatAnalytics() {
  const { analytics } = useSelector((state: RootState) => state);
  const { data,isLoading } = useGetChatAnalyticsQuery({
    startDate: new Date(analytics.startDate).toISOString(),
    endDate: new Date(analytics.endDate).toISOString(),
  });

  const totalAgentMessage =
    data?.messagesByAgents?.reduce(
      (total: number, agent: any) => total + Number(agent.messageCount),
      0
    ) ?? 0;

  const metrics = [
    { label: "Engagement", value: data?.totalEngagements ?? 0 },
    {
      label: "Agent interaction time",
      value: `${data?.totalMessageTime ?? 0} min`,
    },
    { label: "Total agents messages", value: totalAgentMessage },
    { label: "Total automated messages", value: data?.automatedMessages ?? 0 },
  ];

  const gridComponents = [
    <MessageCountChart key="message-count" />,
    <EngagementComparisonChart key="engagement" />,
    <AgentMessagesChart key="agent" />,
    <AbondnedAnalytics key="abondned" />,
  ];

  if(isLoading){
    return <ChatAnalyticsSkeleton/>
  }

  return (
    <div className="overflow-auto no-scrollbar h-[calc(100vh-250px)]">
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
