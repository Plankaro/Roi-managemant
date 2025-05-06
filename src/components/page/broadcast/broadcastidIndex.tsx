/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button"
import { BentoGrid, BentoGridItem } from "@/components/ui/bentogrid"
import MessageStatus from "@/components/page/broadcast/messagestatus"
import ProfitChart from "@/components/page/broadcast/profit"
import Funnel from "@/components/page/broadcast/funnel"
import BroadcastDashboard from "./previewComponent"
import BroadcastAndRetries from "@/components/page/broadcast/Broadcastretries"
import { useGetBroadcastByIdQuery } from "@/store/features/apislice"
import { Download } from "lucide-react"



import { exportJsonToExcel } from "@/lib/utils"
import Link from "next/link"
import BroadcastDetailsSkeleton from "./broadvastIdskeleton"
import BroadcastNotAvailable from "./not-available"

export default function BroadcastDetails({id}:{id:string}) {

  const { data, refetch, isLoading,isSuccess }: { data?: any; isLoading: boolean,refetch:()=>void,isSuccess:boolean } = useGetBroadcastByIdQuery(id);
  
  const totalOrderAmount = data?.order?.reduce(
    (sum:any, order:any) => sum + parseFloat(order.amount),
    0
  ) || 0;
  

  const totalclicks = data?.link?.reduce(
    (sum:any, link:any) => sum + parseFloat(link?.no_of_click),
    0
  ) || 0;

  // 2. Format with “k” if ≥1000
  // const formattedTotal = totalOrderAmount >= 1_000
  //   ? `${(totalOrderAmount / 1_000).toFixed(2)}k`
  //   : totalOrderAmount.toFixed(2);
  


 
  //console.log(totalOrderPrice);
  const price = Number(data?.price);
const roi = price > 0 ? (totalOrderAmount / price).toFixed(3) : "0.000";

const clicks = data?.link?.reduce(
  (sum: any, link: any) => sum + parseFloat(link?.no_of_click),
  0
) || 0;



const gridComponents = [
  <MessageStatus key="message-status" selectedBroadcast={data} />,
  <ProfitChart key="profit-chart" expense={price} revenue={totalOrderAmount}/>,
  <Funnel key="funnel" selectedBroadcast={data}/>,
  <BroadcastDashboard  key="preview-component" selectedBroadcast={data}/>,
  <BroadcastAndRetries key="broadcast-retries" selectedBroadcast={data} BroadCastrefetch={refetch}/>
  
];

const metrics = [
  { label: "Orders", value: data?.order?.length??0 },
  { label: "ROI", value: `${roi}%` },
  { label: "Link Clicks", value: totalclicks??0 },
  { label: "Button Clicks", value: clicks??0 },
  { label: "Conversions", value: data?.conversion??0  },
  { label: "Replies", value: data?.reply_count??0 },
]





const handleDelete = ()=>{
  try {
    const formattedData = [{
      "ID": data?.id,
      "Name": data?.name,
      "Type": data?.type,
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
      "Creator Name": data.createdBy.name
  }];
  console.log(formattedData);
   exportJsonToExcel(formattedData);
  } catch (error) {
    console.log(error);
  }
}

if(isLoading){
  return <BroadcastDetailsSkeleton/>
}
if(!isSuccess){
  return <BroadcastNotAvailable/>
}



  return (
    <div className=" bg-transparent  p-1">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-white">{data?.name}</h1>
        <div className="flex gap-2">
          <Link href="/broadcast">
          <Button variant="outline" className="border-blue-500 border-2 bg-transparent text-white hover:border-blue-500/10 md:block hidden">
            Exit
          </Button>
          </Link>
          <Button className="bg-blue-500 text-white hover:bg-blue-600 md:block hidden" onClick={handleDelete}>Download Report</Button>
          <Button className="bg-blue-500 text-white hover:bg-blue-600 rounded-full md:hidden flex items-center justify-center" size={"icon"} onClick={handleDelete}><Download/></Button>
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
        <BentoGrid className="gap-3 md:px-3 grid-cols-1 lg:grid-cols-8 ">
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



