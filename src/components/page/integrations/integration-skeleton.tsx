import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function IntegrationSkeleton() {
  return (
    <>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-lg border border-primary p-6 bg-[#0D0D0D4D] flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <Skeleton className="h-10 w-10 rounded-md bg-gray-700" />
              <div className="flex-1">
                <Skeleton className="h-6 w-32 bg-gray-700 mb-2" />
                <Skeleton className="h-4 w-full bg-gray-700" />
                <Skeleton className="h-4 w-3/4 bg-gray-700 mt-1" />
              </div>
            </div>
            <div className="mt-auto flex justify-end">
              <Skeleton className="h-9 w-28 rounded-md bg-gray-700" />
            </div>
          </div>
        ))}
      </>
  )
}

export default IntegrationSkeleton