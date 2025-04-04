import React from "react";
import MessageCountChart from "./message-count";
import { BentoGrid, BentoGridItem } from "@/components/ui/bentogrid";
import { EngagementComparisonChart } from "./message-automated-chart";
import { AgentMessagesChart } from "./agent-message-analytics";
import AbondnedAnalytics from "./abondned-chart";

const gridComponents = [
    <MessageCountChart key="message-count" />,
    <EngagementComparisonChart key="engagement" />,
    <AgentMessagesChart key="agent"/>,
    <AbondnedAnalytics key = "abondned"/>
];
function ChatAnalytics() {
  const metrics = [
    { label: "Total Messages", value: "12" },
    { label: "New leads Interacted", value: `12` },
    { label: "Agents  interaction time", value: "12" },
    { label: "Automated interaction time", value: "12" },
    { label: "Total agents messages", value: "12" },
    { label: "Total automated messages", value: "12" },
  ];

 
  return (
    <div className="overflow-scroll no-scrollbar h-[calc(100vh-250px)]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6 ">
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
