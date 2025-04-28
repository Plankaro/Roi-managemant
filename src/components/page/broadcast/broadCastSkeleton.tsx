import { Card,CardContent, } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
export function BroadcastCardSkeleton() {
    return (
      <Card className="bg-[#19191980] border-primary text-white md:p-4 p-2">
        <CardContent className="md:p-4 p-2 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32 bg-gray-700" />
              <Skeleton className="h-6 w-24 rounded-lg bg-gray-700" />
            </div>
            <Skeleton className="h-4 w-full bg-gray-700" />
          </div>
  
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <Skeleton className="h-4 w-16 bg-gray-700" />
              <Skeleton className="h-4 w-20 bg-gray-700" />
            </div>
            <div className="flex justify-between text-sm">
              <Skeleton className="h-4 w-16 bg-gray-700" />
              <Skeleton className="h-4 w-10 bg-gray-700" />
            </div>
          </div>
  
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <Skeleton className="h-4 w-20 bg-gray-700" />
              <Skeleton className="h-4 w-24 bg-gray-700" />
              <Skeleton className="h-4 w-16 bg-gray-700" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-20 bg-gray-700" />
              <Skeleton className="h-4 w-24 bg-gray-700" />
              <Skeleton className="h-4 w-16 bg-gray-700" />
            </div>
          </div>
  
          <div className="grid grid-cols-2 gap-4 mt-4">
            <MetricRowSkeleton />
            <MetricRowSkeleton />
            <MetricRowSkeleton />
            <MetricRowSkeleton />
          </div>
  
          <Skeleton className="h-4 w-24 bg-gray-700 mt-2" />
        </CardContent>
      </Card>
    )
  }
  
  function MetricRowSkeleton() {
    return (
      <div className="">
        <div className="flex justify-between text-sm my-2">
          <Skeleton className="h-4 w-16 bg-gray-700" />
          <Skeleton className="h-4 w-8 bg-gray-700" />
        </div>
        <Skeleton className="h-1.5 w-full bg-gray-700" />
        <div className="text-xs text-right">
          <Skeleton className="h-3 w-8 bg-gray-700 ml-auto mt-1" />
        </div>
      </div>
    )
  }