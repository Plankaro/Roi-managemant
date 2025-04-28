/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Search, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import Link from "next/link"
import { BroadcastCardSkeleton } from "@/components/page/broadcast/broadCastSkeleton"

import { useGetAllBroadcastsQuery } from "@/store/features/apislice"
import { useState } from "react"

export default function BroadcastPage() {
  const { data: broadcasts, isLoading } = useGetAllBroadcastsQuery({})
  const [searchQuery, setSearchQuery] = useState("");
  const hasBroadcasts = broadcasts && broadcasts.length > 0
const filteredBroadcasts = broadcasts && broadcasts.filter((broadcast: any) => broadcast.name.toLowerCase().includes(searchQuery.toLowerCase()));
  return (
    <div className="">
      <div className="mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Broadcast</h1>
          <Link href="/broadcast/create">
            <Button className="bg-blue-600 hover:bg-blue-700">
              +<span className="md:block hidden"> Broadcast Campaigns</span>
            </Button>
          </Link>
        </div>

        {/* Search - Only show if there are broadcasts */}
        {hasBroadcasts && (
          <div className="relative bg-transparent border-white border-2 lg:w-1/2 rounded-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
            <Input placeholder="Search here..." className="pl-9 bg-transparent border-0 text-white"  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !hasBroadcasts ? (
          <div className="bottom-full left-0 right-0 rounded-t-lg h-[60vh] p-8 flex flex-col items-center justify-center">
            <div className="p-4 rounded-full mb-4">
              <Megaphone className="h-20 w-20 text-blue-500" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No Broadcast Campaigns Yet!</h2>
            <p className="text-center text-gray-300 mb-6 max-w-md">
              It looks like you haven&apos;t created any Broadcast Campaigns yet. Broadcasts allow you to send messages
              to multiple contacts at once, perfect for announcements, promotions, or updates. Start by clicking
              &apos;Create Broadcast&apos; to reach your audience!
            </p>
            <Link href="/broadcast/create">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">+ Create Broadcast Campaign</Button>
            </Link>
          </div>
        ) : (
          /* Broadcast Grid */
          <ScrollArea className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-[calc(100vh-270px)] no-scrollbar overflow-y-auto">
            {isLoading
              ? // Skeleton loading state
                Array(8)
                  .fill(0)
                  .map((_, i) => <BroadcastCardSkeleton key={i} />)
              : // Actual content from API
                filteredBroadcasts?.map((filteredBroadcast: any) => <BroadcastCard key={filteredBroadcast.id} broadcast={filteredBroadcast} />)}
          </ScrollArea>
        )}
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
  const createdDate = broadcast.isScheduled
    ? new Date(broadcast.scheduledDate)
    : new Date(broadcast.createdAt) || new Date()
  const formattedCreatedDate = `${createdDate.toLocaleDateString()}, ${createdDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`

  return (
    <Link href={`/broadcast/${broadcast.id}`}>
      <Card className="bg-[#19191980] border-primary text-white md:p-4 p-2">
        <CardContent className=" md:p-4 p-2 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium line-clamp-1">{broadcast.name || "Title of broadcast"}</h3>
              <Badge variant="outline" className="border-2 border-primary text-white rounded-lg">
                {broadcast.type || "Transactional"}
              </Badge>
            </div>
            {/* <p className="text-sm text-muted-foreground line-clamp-1">
              {broadcast.description || "Content of the broadcast..."}
            </p> */}
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

