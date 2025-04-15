
"use client"
import { useState } from "react"
import { ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { CreateCampaignButton } from "@/components/page/campaigns/create-campaign-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BsGraphUpArrow } from "react-icons/bs"
import { useGetCampaignQuery } from "@/store/features/apislice"


interface CampaignStats {
  id: string
  name: string
  type: string
  trigger: string
  totalMessages: number
  deliveredCount: number
  readCount: number
  skippedCount: number
  failedCount: number
  abondnedCheckoutRecovered: number
  abondnedCheckoutRecoveredAmount: number
  codtoCheckout: number
  codtoCheckoutRecoveredAmount: number
  status: string
}

export default function CampaignsPage() {
  const { data: Campaigns, isLoading } = useGetCampaignQuery({})
  const [search, setSearch] = useState("")

  // Filter campaigns based on search query (by campaign name)
  const filteredCampaigns = Campaigns
    ? Campaigns.filter((campaign: CampaignStats) =>
        campaign.name.toLowerCase().includes(search.toLowerCase())
      )
    : []

  return (
    <div className="min-h-screen">
      <div className="mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mt-5">
          <p className="text-2xl font-semibold text-white">Campaigns</p>
          <CreateCampaignButton />
        </div>

        {/* Search */}
        <div className="relative bg-transparent border-white border-2 lg:w-1/2 rounded-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
          <Input
            placeholder="Search here..."
            className="pl-9 bg-transparent border-0 text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Campaigns Grid */}
        <div className="grid no-scrollbar grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-8 overflow-auto h-[calc(100vh-270px)]">
          {isLoading
            ? Array(8)
                .fill(0)
                .map((_, i) => <CampaignsCardSkeleton key={i} />)
            : filteredCampaigns.map((Campaigns: CampaignStats) => (
                <div key={Campaigns.id} className="h-full">
                  <CampaignsCard Campaigns={Campaigns} />
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

function CampaignsCard({ Campaigns }: { Campaigns: CampaignStats }) {
  const {
    totalMessages,
    deliveredCount,
    readCount,
    skippedCount,
    failedCount,
  } = Campaigns

  const deliveredPercentage =
    totalMessages > 0 ? Math.round((deliveredCount / totalMessages) * 100) : 0
  const readPercentage =
    totalMessages > 0 ? Math.round((readCount / totalMessages) * 100) : 0
  const skippedPercentage =
    totalMessages > 0 ? Math.round((skippedCount / totalMessages) * 100) : 0
  const failedPercentage =
    totalMessages > 0 ? Math.round((failedCount / totalMessages) * 100) : 0

  return (
    <Card className="bg-backgroundColor border-primary border-none text-white rounded-xl h-full">
      <CardContent className="p-6 space-y-4">
        {/* Title and Badge */}
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg line-clamp-1">
            {Campaigns.name || "Marketing..."}
          </h3>
          <Badge
            variant="outline"
            className="bg-[#3b3b6b] text-white text-xs px-3 py-1 rounded-full border-none"
          >
            {Campaigns.type || "Promotional"}
          </Badge>
        </div>

        {/* Order Created and Revenue */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-blue-400 text-sm mb-1">Order Created</p>
            <div className="flex items-center">
              <BsGraphUpArrow className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-lg font-semibold">{totalMessages}</span>
            </div>
          </div>
          <div>
            <p className="text-blue-400 text-sm mb-1">Revenue</p>
            <div className="flex items-center">
              <BsGraphUpArrow className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-lg font-semibold">+25,000</span>
            </div>
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="flex justify-between items-center">
          <p className="text-blue-400 text-sm">Status:</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 px-2 text-white hover:text-white flex items-center gap-1 hover:bg-blue-900/20"
              >
                {Campaigns.status || "ACTIVE"}
                <ChevronDown className="h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#1a1a2e] border-gray-700 text-white hover:text-white"
            >
              <DropdownMenuItem className="hover:bg-blue-900/20 cursor-pointer">
                ACTIVE
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-blue-900/20 cursor-pointer">
                PAUSED
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-blue-900/20 cursor-pointer">
                ARCHIVED
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Trigger Set */}
        <div className="flex justify-between items-center">
          <p className="text-blue-400 text-sm">Trigger Set</p>
          <p className="text-sm">{Campaigns.trigger}</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <MetricRow
            label="Delivered"
            value={deliveredCount}
            percentage={deliveredPercentage}
            color="blue"
          />
          <MetricRow
            label="Read"
            value={readCount}
            percentage={readPercentage}
            color="blue"
          />
          <MetricRow
            label="Skipped"
            value={skippedCount}
            percentage={skippedPercentage}
            color="red"
          />
          <MetricRow
            label="Failed"
            value={failedCount}
            percentage={failedPercentage}
            color="red"
          />
        </div>

        {/* Edit Details Button */}
        {/* <div className="flex justify-end">
          <Button variant="link" className="text-red-400 p-0 h-auto">
            Edit Details →
          </Button>
        </div> */}
      </CardContent>
    </Card>
  )
}

function MetricRow({
  label,
  value,
  percentage,
  color,
}: {
  label: string
  value: number
  percentage: number
  color: "blue" | "red"
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className={color === "blue" ? "text-blue-400" : "text-red-400"}>
          {label}
        </span>
        <span>{value}</span>
      </div>
      <Progress
        value={percentage}
        className="h-1.5 bg-gray-700/50"
        indicatorClassName={`${
          color === "blue" ? "bg-blue-500" : "bg-red-500"
        }`}
      />
      <div className="text-xs text-right text-gray-400 mt-0.5">
        {percentage}%
      </div>
    </div>
  )
}

function CampaignsCardSkeleton() {
  return (
    <Card className="bg-backgroundColor border-primary text-white rounded-xl h-full">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-32 bg-gray-700" />
          <Skeleton className="h-6 w-24 rounded-full bg-gray-700" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-12 w-full bg-gray-700" />
          <Skeleton className="h-12 w-full bg-gray-700" />
        </div>
        <Skeleton className="h-8 w-full bg-gray-700" />
        <Skeleton className="h-8 w-full bg-gray-700" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-10 w-full bg-gray-700" />
          <Skeleton className="h-10 w-full bg-gray-700" />
          <Skeleton className="h-10 w-full bg-gray-700" />
          <Skeleton className="h-10 w-full bg-gray-700" />
        </div>
      </CardContent>
    </Card>
  )
}
