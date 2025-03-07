"use client"

import { Button } from "@/components/ui/button"
import { BentoGrid, BentoGridItem } from "@/components/ui/bentogrid"
import MessageStatus from "@/components/page/broadcast/messagestatus"
import ProfitChart from "@/components/page/broadcast/profit"
import Funnel from "@/components/page/broadcast/funnel"
import BroadcastDashboard from "./previewComponent"
import BroadcastAndRetries from "@/components/page/broadcast/Broadcastretries"
import { useGetBroadcastByIdQuery } from "@/store/features/apislice"

import { BroadcastDetailResult } from "@/zod/broadcast/broadcast"

import { calculateTotalPrice, exportJsonToExcel } from "@/lib/utils"
import Link from "next/link"

export default function BroadcastDetails({id}:{id:string}) {

  const { data, isLoading,refetch }: { data?: BroadcastDetailResult; isLoading: boolean,refetch:()=>void } = useGetBroadcastByIdQuery(id);
  //console.log(data)
  
  let totalOrderPrice = 0;

  if (Array.isArray(data?.Order) && data.Order.length > 0) {
    totalOrderPrice = calculateTotalPrice(data.Order);
  }
  //console.log(totalOrderPrice);
  const roi = data?.price ? (totalOrderPrice / Number(data.price)).toFixed(3) : "0.000";




const gridComponents = [
  <MessageStatus key="message-status" selectedBroadcast={data} />,
  <ProfitChart key="profit-chart" expense={Number(data?.price)} revenue={totalOrderPrice}/>,
  <Funnel key="funnel" selectedBroadcast={data}/>,
  <BroadcastDashboard  key="preview-component" selectedBroadcast={data}/>,
  <BroadcastAndRetries key="broadcast-retries" selectedBroadcast={data} BroadCastrefetch={refetch}/>
  
];

const metrics = [
  { label: "Orders", value: data?.Order?.length },
  { label: "ROI", value: `${roi}%` },
  { label: "Link Clicks", value: "12" },
  { label: "Button Clicks", value: "12" },
  { label: "Conversions", value: data?.unique_order_created },
  { label: "Replies", value: data?.reply_count },
]



const handleDownload = async () => {
    if (data) {
        // Convert `data` object into an array format for Excel
        const formattedData = [{
            "ID": data.id,
            "Name": data.name,
            "Type": data.type,
            "Status": data.status,
            "Template Name": data.template_name,
            "Template Language": data.template_language,
            "Total Contacts": data.total_contact,
            "Created At": new Date(data.createdAt).toLocaleString(),
            "Scheduled At": new Date(data?.scheduledDate??"").toLocaleString(),
            "Scheduled": data.isScheduled,
            "Price": data.price,
          
   
            "UTM Campaign": data.utm_campaign,
            "UTM Medium": data.utm_medium,
            "UTM Source": data.utm_source,
         
            "Reply Count": data.reply_count,
            "Unique Interactions": data.unique_interactions,
            "Total Messages": data.totalMessages,
            "Delivered Count": data.deliveredCount,
            "Read Count": data.readCount,
            "Failed Count": data.failedCount,
            "Sent Count": data.sentCount,
            "Creator Name": data.creator.name
        }];

        // Create an Excel sheet
         exportJsonToExcel(formattedData);
    } else {
        //console.log("No data available to download.");
    }
};




  return (
    <div className=" bg-transparent  p-1">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-white">Broadcast- All Product of the month</h1>
        <div className="flex gap-2">
          <Link href="/broadcast">
          <Button variant="outline" className="border-blue-500 border-2 bg-transparent text-white hover:border-blue-500/10 md:block hidden">
            Exit
          </Button>
          </Link>
          <Button className="bg-blue-500 text-white hover:bg-blue-600 md:block hidden" onClick={handleDownload}>Download Report</Button>
        </div>
      </div>

      <div className="h-[calc(100vh-160px)] overflow-y-auto bg-transparent no-scrollbar">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="border-primary border bg-transparent">
              <div className="p-4">
                <p className="text-sm text-gray-400">{metric.label}</p>
                <p className="text-lg font-semibold mt-1 text-white">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>
        <BentoGrid className="gap-3 md:px-3">
  {gridComponents.map((gridComponent, i) => (
    <BentoGridItem
      key={i}
      className={`
        /* Base / Medium screens */
      


   

       
        ${i === 0 ? "xl:col-span-3 xl:row-span-2 xl:order-1 lg:col-span-3 lg:row-span-2" : ""}
        ${i === 1 ? "xl:col-span-2 xl:row-span-1 xl:order-2 lg:col-span-5 lg:row-span-1" : ""}
        ${i === 2 ? "xl:col-span-3 xl:row-span-1 xl:order-3 lg:col-span-5 lg:row-span-1" : ""}
        ${i === 3 ? "xl:col-span-5 xl:row-span-4 xl:order-4 lg:order-5  md:order-4   lg:col-span-5 lg:row-span-4 " : ""}
        ${i === 4 ? "xl:col-span-3 xl:row-span-3 xl:order-5 lg:col-span-3 lg:row-span-3 " : ""}
      `}
    >
      {gridComponent}
    </BentoGridItem>
  ))}
</BentoGrid>
      </div>
    </div>
  )
}



