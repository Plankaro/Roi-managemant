
import { AnalyticsTabs } from "@/components/page/analytics/analytics-tab";


import TimeFilter from "@/components/page/chats/timefilter";



export default function ChatAnalyticsPage({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {


  return (
    <div className="flex-1 overflow-auto md:p-6">
      <div className="mb-6 space-y-5">
        <div className="flex  gap-5 items-center ">
          <h1 className="text-2xl font-bold mb-2 text-white">Analytics</h1>
          <TimeFilter />
        </div>
        <div className="mb-8">
          <AnalyticsTabs/>
        </div>

        {/* {activeTab === "ecommerce" && <EcommerceAnalytics />}
        {activeTab === "engagement" && <EngagementAnalytics />}
        {activeTab === "chat-analytics" && <ChatAnalytics />} */}
        {children}
      </div>
    </div>
  );
}
