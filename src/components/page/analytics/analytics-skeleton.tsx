import { BentoGrid, BentoGridItem } from "@/components/ui/bentogrid";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChatAnalyticsSkeleton() {
    return (
      <div className="overflow-auto no-scrollbar h-[calc(100vh-250px)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="border-primary border bg-backgroundColor rounded-md"
              >
                <div className="p-4">
                  <Skeleton className="h-4 w-24 bg-gray-700 mb-2" />
                  <Skeleton className="h-6 w-16 bg-gray-700" />
                </div>
              </div>
            ))}
        </div>
        <BentoGrid className="gap-3 md:grid-cols-2 md:px-3">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <BentoGridItem key={i}>
                <ChartSkeleton />
              </BentoGridItem>
            ))}
        </BentoGrid>
      </div>
    );
  }
  
  function ChartSkeleton() {
    return (
      <div className="h-full p-4 md:p-6 bg-backgroundColor border-primary border shadow-lg rounded-xl">
        <Skeleton className="h-6 w-40 bg-gray-700 mb-6" />
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="basis-4/6 h-[300px]">
              <Skeleton className="w-full h-full bg-gray-700" />
            </div>
            <div className="mt-8 space-y-3 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Skeleton className="h-2 w-2 rounded-full bg-gray-700" />
                <Skeleton className="h-4 w-48 bg-gray-700" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-2 w-2 rounded-full bg-gray-700" />
                <Skeleton className="h-4 w-48 bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }