import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProspectSkeleton() {
  return (
    <ScrollArea className="px-4 h-[calc(100vh-200px)]  sm:px-6 lg:px-8 mt-20 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-backgroundColor rounded-lg p-6 w-full">
            <div className="flex items-start">
              <Skeleton className="h-8 w-8 rounded mr-3" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-7 w-24 sm:w-32 md:w-24 lg:w-24" />
                <Skeleton className="h-4 w-32 sm:w-40 md:w-32 lg:w-32" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Profile Card */}
      <div className="bg-backgroundColor rounded-lg p-6 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Skeleton className="h-20 w-20 rounded-full bg-white/10" />
          <div className="flex-1 space-y-4 w-full">
            <Skeleton className="h-8 w-full max-w-md bg-white/10" />
            <Skeleton className="h-10 w-full max-w-sm bg-white/10" />
            <Skeleton className="h-px w-full bg-slate-700" />
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 w-full">
              <Skeleton className="h-5 w-full max-w-lg bg-white/10" />
              <Skeleton className="h-5 w-full max-w-md bg-white/10" />
            </div>
          </div>
        </div>
      </div>

      {/* Integration Card */}
      <div className="bg-backgroundColor rounded-lg p-6 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded bg-white/10" />
            <Skeleton className="h-6 w-24 bg-white/10" />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
            <Skeleton className="h-6 w-full max-w-xs bg-white/10" />
            <Skeleton className="h-6 w-full max-w-sm bg-white/10" />
            <Skeleton className="h-10 w-full max-w-md rounded bg-white/10" />
          </div>
        </div>
      </div>

      {/* User Attributes */}
      <div className="bg-backgroundColor rounded-lg p-6 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-full max-w-xs" />
        </div>
      </div>
    </ScrollArea>
  )
}
