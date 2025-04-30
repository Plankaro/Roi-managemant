"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { BentoGrid, BentoGridItem } from "@/components/ui/bentogrid"

export default function BroadcastDetailsSkeleton() {
  const metrics = [
    { label: "Orders" },
    { label: "ROI" },
    { label: "Link Clicks" },
    { label: "Button Clicks" },
    { label: "Conversions" },
    { label: "Replies" },
  ]

  return (
    <div className="bg-transparent p-1">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-64 bg-primary/10" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20 bg-primary/10 md:block hidden" />
          <Skeleton className="h-9 w-36 bg-primary/10 md:block hidden" />
        </div>
      </div>

      <div className="h-[calc(100vh-160px)] overflow-y-auto bg-transparent no-scrollbar">
        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="border-primary border bg-transparent">
              <div className="p-4">
                <Skeleton className="h-4 w-20 bg-primary/10" />
                <Skeleton className="h-6 w-12 mt-2 bg-primary/10" />
              </div>
            </div>
          ))}
        </div>

        {/* BentoGrid */}
        <BentoGrid className="gap-3 md:px-3 grid-cols-1 lg:grid-cols-8">
          {/* Message Status */}
          <BentoGridItem className="xl:col-span-3 xl:row-span-2 xl:order-1 lg:col-span-3 lg:row-span-2">
            <div className="p-4 h-full">
              <Skeleton className="h-6 w-40 mb-4 bg-primary/10" />
              <div className="flex justify-center items-center h-[calc(100%-2rem)]">
                <div className="relative w-48 h-48">
                  <Skeleton className="absolute inset-0 rounded-full bg-primary/10" />
                  <Skeleton className="absolute inset-[15%] rounded-full bg-transparent border border-primary/20" />
                </div>
              </div>
            </div>
          </BentoGridItem>

          {/* Profit Chart */}
          <BentoGridItem className="xl:col-span-2 xl:row-span-1 xl:order-2 lg:col-span-5 lg:row-span-1">
            <div className="p-4 h-full">
              <Skeleton className="h-6 w-32 mb-4 bg-primary/10" />
              <div className="flex flex-col space-y-2">
                <Skeleton className="h-4 w-full bg-primary/10" />
                <Skeleton className="h-16 w-full bg-primary/10" />
              </div>
            </div>
          </BentoGridItem>

          {/* Funnel */}
          <BentoGridItem className="xl:col-span-3 xl:row-span-1 xl:order-3 lg:col-span-5 lg:row-span-1">
            <div className="p-4 h-full">
              <Skeleton className="h-6 w-24 mb-4 bg-primary/10" />
              <div className="flex justify-between space-x-2">
                <Skeleton className="h-24 w-1/4 bg-primary/10" />
                <Skeleton className="h-24 w-1/4 bg-primary/10" />
                <Skeleton className="h-24 w-1/4 bg-primary/10" />
                <Skeleton className="h-24 w-1/4 bg-primary/10" />
              </div>
            </div>
          </BentoGridItem>

          {/* Broadcast Dashboard */}
          <BentoGridItem className="xl:col-span-5 xl:row-span-4 xl:order-4 lg:order-5 md:order-4 lg:col-span-5 lg:row-span-4">
            <div className="p-4 h-full">
              <Skeleton className="h-6 w-32 mb-4 bg-primary/10" />
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-8 w-full bg-primary/10" />
                  <Skeleton className="h-8 w-full bg-primary/10" />
                </div>
                <Skeleton className="h-40 w-full bg-primary/10" />
                <Skeleton className="h-60 w-full bg-primary/10" />
              </div>
            </div>
          </BentoGridItem>

          {/* Broadcast And Retries */}
          <BentoGridItem className="xl:col-span-3 xl:row-span-3 xl:order-5 lg:col-span-3 lg:row-span-3">
            <div className="p-4 h-full">
              <Skeleton className="h-6 w-48 mb-4 bg-primary/10" />
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24 bg-primary/10" />
                    <Skeleton className="h-4 w-24 bg-primary/10" />
                  </div>
                  <Skeleton className="h-12 w-full bg-primary/10" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24 bg-primary/10" />
                    <Skeleton className="h-4 w-24 bg-primary/10" />
                  </div>
                  <Skeleton className="h-12 w-full bg-primary/10" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24 bg-primary/10" />
                    <Skeleton className="h-4 w-24 bg-primary/10" />
                  </div>
                  <Skeleton className="h-12 w-full bg-primary/10" />
                </div>
              </div>
            </div>
          </BentoGridItem>
        </BentoGrid>
      </div>
    </div>
  )
}
