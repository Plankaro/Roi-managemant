/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import ConversionsAnalytics from "./conversion-ctr";
import { BentoGrid, BentoGridItem } from "@/components/ui/bentogrid";
import RevenueAnalytics from "./revenue";
import RecoveredCartAnalytics from "./recovered-cart-analytics";
import CodToCheckoutAnalytics from "./checkout-cod-analytics";
import { useGetEcommerceAnalyticsQuery } from "@/store/features/apislice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ChatAnalyticsSkeleton from "./analytics-skeleton";

function EcommerceAnalytics() {
  const { analytics } = useSelector((state: RootState) => state);
  const { data, isLoading } = useGetEcommerceAnalyticsQuery({
    startDate: new Date(analytics.startDate).toISOString(),
    endDate: new Date(analytics.endDate).toISOString(),
  });
  console.log(data);
  const percentAbandon =
    +(
      ((data?.recoveredCheckout ?? 0) /
        ((data?.AbondnedCheckout ?? 0) + (data?.recoveredCheckout ?? 0))) *
      100
    ).toFixed(2) || 0;

    const revenue = data?.getOrder?.reduce((acc:any, o:any) => acc + (Number(o.amount) || 0), 0).toFixed(2) || 0;

  console.log(revenue)
  const metrics = [
    { label: "Total Sales", value: `₹ ${revenue}` },
    { label: "Total Orders", value: data?.getOrder?.length },
    { label: "Cod to Prepaid", value: data?.totalCodtocheckoutlinkDelivered },
    { label: "Abondned Cart Recovered", value: `${percentAbandon}% ` },
  ];
  const gridComponents = [
    <RevenueAnalytics key="revenue" />,
    <ConversionsAnalytics key="conversion" />,
    <RecoveredCartAnalytics key="analytics" />,
    <CodToCheckoutAnalytics key="codanalytics" />,
  ];
  if (isLoading) {
    return <ChatAnalyticsSkeleton />;
  }
  return (
    <div className="overflow-scroll no-scrollbar h-[calc(100vh-250px)]">
      <div className="grid grid-cols-2  md:grid-cols-4 gap-4 mb-6 ">
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
      <BentoGrid className="gap-3 grid-cols-2 md:px-3 ">
        {gridComponents.map((gridComponent, i) => (
          <BentoGridItem
            key={i}
            className={`
                  ${i === 0 ? "col-span-2" : ""}
        ${i === 1 ? "col-span-2" : ""}


          ${i === 2 ? "md:col-span-1 col-span-2" : ""}
        ${i === 3 ? "md:col-span-1 col-span-2" : ""}

             `}
          >
            {gridComponent}
          </BentoGridItem>
        ))}
      </BentoGrid>
    </div>
  );
}

export default EcommerceAnalytics;
