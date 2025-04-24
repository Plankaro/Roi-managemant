import { Skeleton } from "@/components/ui/skeleton"

export default function CampaignSkeleton() {
  return (
    <div className="w-full space-y-6 p-4">
      {/* Header area skeleton */}
      <div className="flex justify-between">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-8 w-1/4" />
      </div>

      {/* Form fields skeleton */}
      <div className="space-y-8">
        {/* Two column layout */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2 space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="w-full md:w-1/2 space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Filter section */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/6" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-10 w-40" />
        </div>

        {/* Template section */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/6" />
          <Skeleton className="h-4 w-1/3" />
          <div className="border border-gray-800 rounded-md p-6">
            <div className="flex flex-col items-center justify-center py-8">
              <Skeleton className="h-16 w-16 rounded-full mb-4" />
              <Skeleton className="h-4 w-48 mb-2" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/6" />
          <div className="border border-gray-800 rounded-md p-6 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-800">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-24 w-full" />
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-800">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/6" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-36" />
      </div>
    </div>
  )
}
