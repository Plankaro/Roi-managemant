"use client";
import { BentoGrid, BentoGridItem } from '@/components/ui/bentogrid'
import React from 'react'
import MessageStats from './message-status';
import SessionStats from './session-to-template-message';
import { useSelector } from 'react-redux';
import { useGetEngagementAnalyticsQuery } from '@/store/features/apislice';
import { RootState } from '@/store/store';
import ChatAnalyticsSkeleton from './analytics-skeleton';


function EngagementAnalytics() {
    const {analytics}=useSelector((state: RootState) => state);
    const {data,isLoading} = useGetEngagementAnalyticsQuery({
      startDate: new Date(analytics.startDate).toISOString(),
    endDate: new Date(analytics.endDate).toISOString(),
    })
    console.log(data);
    const metrics = [
        { label: "Template Messages", value: data?.templateMessage??0},
        { label: "Session Messages", value: data?.sessionMessage??0 },
        { label: "Leads", value: data?.customerCount??0 },
        { label: "Engagement", value: data?.engagementCount??0 },  
       
      ];
const gridComponents = [
    <MessageStats key={"messagestats"}/>,
    <SessionStats key={"sessionstats"}/>
]    
 if(isLoading){
   return  <ChatAnalyticsSkeleton/>
  }
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
  )
}

export default EngagementAnalytics