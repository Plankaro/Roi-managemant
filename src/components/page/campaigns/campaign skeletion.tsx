import { Skeleton } from "@/components/ui/skeleton"

export default function CampaignSkeleton() {
  return (
    <div className="w-full min-h-screen space-y-6 p-4 sm:p-6">
      {/* Header area skeleton */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Skeleton className="h-8 w-full sm:w-1/3 bg-white/10" />
        <Skeleton className="h-8 w-full sm:w-1/4 bg-white/10" />
      </div>

      {/* Form fields skeleton */}
      <div className="space-y-8">
        {/* Two column layout */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2 space-y-2">
            <Skeleton className="h-6 w-1/4 bg-white/10" />
            <Skeleton className="h-10 w-full bg-white/10" />
          </div>
          <div className="w-full md:w-1/2 space-y-2">
            <Skeleton className="h-6 w-1/4 bg-white/10" />
            <Skeleton className="h-10 w-full bg-white/10" />
          </div>
        </div>

        {/* Filter section */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/6 bg-white/10" />
          <Skeleton className="h-4 w-1/3 bg-white/10" />
          <Skeleton className="h-10 w-40 bg-white/10" />
        </div>

        {/* Template section */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/6 bg-white/10" />
          <Skeleton className="h-4 w-1/3 bg-white/10" />
          <Skeleton className="h-10 w-40 bg-white/10" />
        </div>

        {/* Content section */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/6 bg-white/10" />
          <div className="border border-gray-800 rounded-md p-6 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-24 bg-white/10" />
              <Skeleton className="h-4 w-full bg-white/10" />
              <div className="flex flex-col sm:flex-row gap-2">
                <Skeleton className="h-10 w-full sm:w-32 bg-white/10" />
                <Skeleton className="h-10 w-full sm:w-32 bg-white/10" />
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-800">
              <Skeleton className="h-5 w-24 bg-white/10" />
              <Skeleton className="h-24 w-full bg-white/10" />
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-800">
              <Skeleton className="h-5 w-24 bg-white/10" />
              <Skeleton className="h-10 w-full bg-white/10" />
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/6 bg-white/10" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full bg-white/10" />
            <Skeleton className="h-10 w-full bg-white/10" />
            <Skeleton className="h-10 w-full bg-white/10" />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
        <Skeleton className="h-10 w-full sm:w-24 bg-white/10" />
        <Skeleton className="h-10 w-full sm:w-36 bg-white/10" />
      </div>
    </div>
  )
}
