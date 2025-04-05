"use client";
import { AnalyticsTabs } from "@/components/page/analytics/analytics-tab";
import { useState } from "react";
import ChatAnalytics from "@/components/page/analytics/chat";
import EcommerceAnalytics from "@/components/page/analytics/ecommerce";

import EngagementAnalytics from "@/components/page/analytics/engagement";
import TimeFilter, { DateRange } from "@/components/page/chats/timefilter";

const tabs = [
  { id: "ecommerce", label: "Ecommerce" },
  { id: "engagement", label: "Engagement" },
  { id: "chat-analytics", label: "Chat" },
];

export default function ChatAnalyticsPage() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date(),
  });

  return (
    <div className="flex-1 overflow-auto md:p-6">
      <div className="mb-6 space-y-5">
        <div className="flex">
          <h1 className="text-2xl font-bold mb-2 text-white">Analytics</h1>
          <TimeFilter value={dateRange} onChange={setDateRange} />
        </div>
        <div className="mb-8">
          <AnalyticsTabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {activeTab === "ecommerce" && <EcommerceAnalytics />}
        {activeTab === "engagement" && <EngagementAnalytics />}
        {activeTab === "chat-analytics" && <ChatAnalytics />}
      </div>
    </div>
  );
}
