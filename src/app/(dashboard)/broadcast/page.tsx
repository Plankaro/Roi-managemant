/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { formatScheduledDate } from "@/lib/utils"
import { useGetAllBroadcastsQuery } from "@/store/features/apislice"

export default function BroadcastPage() {
  const { data: broadcasts, isLoading } = useGetAllBroadcastsQuery({})
  console.log(broadcasts)

  return (
    <div className=" ">
      <div className=" mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Broadcast</h1>
          <Link href="/broadcast/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            +<span className="md:block hidden"> Broadcast Campaigns</span>
          </Button></Link>
          
        </div>

        {/* Search */}
        <div className="relative bg-transparent border-white border-2 lg:w-1/2 rounded-lg ">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
          <Input placeholder="Search here..." className="pl-9 bg-transparent border-0 text-white " />
        </div>

        {/* Broadcast Grid */}
        <ScrollArea className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-[calc(100vh-270px)] no-scrollbar overflow-y-auto">
          {isLoading
            ? // Skeleton loading state
              Array(8)
                .fill(0)
                .map((_, i) => <BroadcastCardSkeleton key={i} />)
            : // Actual content from API
              broadcasts?.map((broadcast:any) => <BroadcastCard key={broadcast.id} broadcast={broadcast} />)}
        </ScrollArea>
      </div>
    </div>
  )
}

function BroadcastCard({ broadcast }: { broadcast: any }) {
  // Calculate percentages
  const totalMessages = broadcast.totalMessages || 1 // Avoid division by zero
  const deliveredPercentage = Math.round((broadcast.deliveredCount / totalMessages) * 100)
  const readPercentage = Math.round((broadcast.readCount / totalMessages) * 100)
  const skippedPercentage = Math.round((broadcast.skippedCount / totalMessages) * 100)
  const failedPercentage = Math.round((broadcast.failedCount / totalMessages) * 100)

  // Format dates
  const createdDate = broadcast.isScheduled ? new Date(broadcast.scheduledDate) : new Date(broadcast.createdAt) || new Date()
  const formattedCreatedDate = `${createdDate.toLocaleDateString()}, ${createdDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`

  
  

  return (
    <Link href={`/broadcast/${broadcast.id}`}>
      <Card className="bg-[#19191980] border-primary text-white md:p-4 p-2">
        <CardContent className=" md:p-4 p-2 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{broadcast.name || "Title of broadcast"}</h3>
              <Badge variant="outline" className="border-2 border-primary text-white rounded-lg">
                {broadcast.type || "Transactional"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {broadcast.description || "Content of the broadcast..."}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-blue-300">Status:</span>
              <span>{broadcast.status || "Completed"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-200">Contacts:</span>
              <span>{broadcast.totalMessages || "0"}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-blue-400">Created at</p>
              <p>{formattedCreatedDate.split(",")[0]},</p>
              <p>{formattedCreatedDate.split(",")[1]}</p>
            </div>
            {broadcast.isScheduled && (
              <div>
                <p className="text-blue-400">Scheduled at</p>
                <p>{formattedCreatedDate.split(",")[0]},</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <MetricRow
              label="Delivered"
              value={broadcast.deliveredCount || "0"}
              percentage={deliveredPercentage}
              color="blue"
            />
            <MetricRow label="Read" value={broadcast.readCount || "0"} percentage={readPercentage} color="blue" />
            <MetricRow
              label="Skipped"
              value={broadcast.skippedCount || "0"}
              percentage={skippedPercentage}
              color="red"
            />
            <MetricRow label="Failed" value={broadcast.failedCount || "0"} percentage={failedPercentage} color="red" />
          </div>

          <Button variant="link" className="text-red-500 p-0 h-auto">
            View Details →
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}

function BroadcastCardSkeleton() {
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

function MetricRow({
  label,
  value,
  percentage,
  color,
}: {
  label: string
  value: string
  percentage: number
  color: "blue" | "red"
}) {
  return (
    <div className="">
      <div className="flex justify-between text-sm my-2">
        <span className="text-blue-400">{label}</span>
        <span>{value}</span>
      </div>
      <Progress
        value={percentage}
        className={`h-1.5 bg-[#C5C5C5]`}
        indicatorClassName={`${color === "blue" ? "bg-blue-500" : "bg-red-500"}`}
      />
      <div className="text-xs text-right text-muted-foreground">{percentage}%</div>
    </div>
  )
}

