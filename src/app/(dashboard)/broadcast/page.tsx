/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Search, ArrowRight, MoreVertical, ChevronDown, Copy, Download, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"



 const broadcasts: any = [
  {
    id: "1",
    title: "Unlock Exclusive Access to Our New Features!",
    type: "Transactional",
    content: "Discover the latest updates we've added to enhance your experience...",
    status: "Completed",
    createdAt: "12/02/2025, 12:01 pm",
    scheduledAt: "12/02/2025, 12:01 pm",
    metrics: {
      contacts: 300,
      delivered: 201,
      read: 34,
      skipped: 21,
      failed: 34,
    },
  },
  {
    id: "2",
    title: "Limited-Time Offer: 20% Off on All Products!",
    type: "Marketing",
    content: "Don't miss out on our exclusive sale. Shop now and save big...",
    status: "Scheduled",
    createdAt: "13/02/2025, 10:15 am",
    scheduledAt: "14/02/2025, 09:00 am",
    metrics: {
      contacts: 500,
      delivered: 0,
      read: 0,
      skipped: 0,
      failed: 0,
    },
  },
  {
    id: "3",
    title: "Your Order Has Been Shipped!",
    type: "Transactional",
    content: "Good news! Your recent purchase is on its way. Track your order here...",
    status: "Completed",
    createdAt: "12/02/2025, 03:20 pm",
    scheduledAt: "12/02/2025, 03:20 pm",
    metrics: {
      contacts: 150,
      delivered: 130,
      read: 45,
      skipped: 5,
      failed: 15,
    },
  },
  {
    id: "4",
    title: "Join Us for an Exclusive Webinar on Marketing Strategies",
    type: "Marketing",
    content: "Learn the latest marketing tactics from industry experts. Register now...",
    status: "Running",
    createdAt: "14/02/2025, 08:45 am",
    scheduledAt: "14/02/2025, 09:00 am",
    metrics: {
      contacts: 700,
      delivered: 400,
      read: 120,
      skipped: 30,
      failed: 50,
    },
  },
  {
    id: "5",
    title: "Your Subscription Renewal Confirmation",
    type: "Transactional",
    content: "Thank you for renewing your subscription. Here are the details...",
    status: "Completed",
    createdAt: "13/02/2025, 02:30 pm",
    scheduledAt: "13/02/2025, 02:30 pm",
    metrics: {
      contacts: 600,
      delivered: 550,
      read: 300,
      skipped: 10,
      failed: 40,
    },
  },
  {
    id: "6",
    title: "Flash Sale Alert: Up to 50% Off Selected Items!",
    type: "Marketing",
    content: "Hurry! Our flash sale is live for a limited time. Grab your favorites now...",
    status: "Completed",
    createdAt: "15/02/2025, 05:00 pm",
    scheduledAt: "15/02/2025, 06:00 pm",
    metrics: {
      contacts: 1000,
      delivered: 800,
      read: 450,
      skipped: 50,
      failed: 100,
    },
  },
  {
    id: "7",
    title: "Important: Update to Our Privacy Policy",
    type: "Transactional",
    content: "We've made changes to our privacy policy. Please review the updates...",
    status: "Completed",
    createdAt: "16/02/2025, 09:15 am",
    scheduledAt: "16/02/2025, 09:30 am",
    metrics: {
      contacts: 250,
      delivered: 230,
      read: 80,
      skipped: 5,
      failed: 15,
    },
  },
  {
    id: "8",
    title: "You're Invited: Exclusive Event Just for You",
    type: "Marketing",
    content: "Join us for a special event featuring industry leaders and networking opportunities...",
    status: "Scheduled",
    createdAt: "17/02/2025, 07:00 pm",
    scheduledAt: "18/02/2025, 08:00 am",
    metrics: {
      contacts: 400,
      delivered: 0,
      read: 0,
      skipped: 0,
      failed: 0,
    },
  },
  {
    id: "9",
    title: "Your Weekly Digest: Top News and Updates",
    type: "Transactional",
    content: "Stay informed with the latest news and updates from our team...",
    status: "Completed",
    createdAt: "17/02/2025, 11:30 am",
    scheduledAt: "17/02/2025, 11:45 am",
    metrics: {
      contacts: 500,
      delivered: 450,
      read: 200,
      skipped: 20,
      failed: 30,
    },
  },
  {
    id: "10",
    title: "New Feature Announcement: Enhance Your Experience",
    type: "Marketing",
    content: "We're excited to introduce a new feature that will improve your workflow...",
    status: "Running",
    createdAt: "18/02/2025, 04:00 pm",
    scheduledAt: "18/02/2025, 06:00 pm",
    metrics: {
      contacts: 350,
      delivered: 100,
      read: 50,
      skipped: 10,
      failed: 20,
    },
  },
  {
    id: "1",
    title: "Unlock Exclusive Access to Our New Features!",
    type: "Transactional",
    content: "Discover the latest updates we've added to enhance your experience...",
    status: "Completed",
    createdAt: "12/02/2025, 12:01 pm",
    scheduledAt: "12/02/2025, 12:01 pm",
    metrics: {
      contacts: 300,
      delivered: 201,
      read: 34,
      skipped: 21,
      failed: 34,
    },
  },
  {
    id: "2",
    title: "Limited-Time Offer: 20% Off on All Products!",
    type: "Marketing",
    content: "Don't miss out on our exclusive sale. Shop now and save big...",
    status: "Scheduled",
    createdAt: "13/02/2025, 10:15 am",
    scheduledAt: "14/02/2025, 09:00 am",
    metrics: {
      contacts: 500,
      delivered: 0,
      read: 0,
      skipped: 0,
      failed: 0,
    },
  },
  {
    id: "3",
    title: "Your Order Has Been Shipped!",
    type: "Transactional",
    content: "Good news! Your recent purchase is on its way. Track your order here...",
    status: "Completed",
    createdAt: "12/02/2025, 03:20 pm",
    scheduledAt: "12/02/2025, 03:20 pm",
    metrics: {
      contacts: 150,
      delivered: 130,
      read: 45,
      skipped: 5,
      failed: 15,
    },
  },
  {
    id: "4",
    title: "Join Us for an Exclusive Webinar on Marketing Strategies",
    type: "Marketing",
    content: "Learn the latest marketing tactics from industry experts. Register now...",
    status: "Running",
    createdAt: "14/02/2025, 08:45 am",
    scheduledAt: "14/02/2025, 09:00 am",
    metrics: {
      contacts: 700,
      delivered: 400,
      read: 120,
      skipped: 30,
      failed: 50,
    },
  },
  {
    id: "5",
    title: "Your Subscription Renewal Confirmation",
    type: "Transactional",
    content: "Thank you for renewing your subscription. Here are the details...",
    status: "Completed",
    createdAt: "13/02/2025, 02:30 pm",
    scheduledAt: "13/02/2025, 02:30 pm",
    metrics: {
      contacts: 600,
      delivered: 550,
      read: 300,
      skipped: 10,
      failed: 40,
    },
  },
  {
    id: "6",
    title: "Flash Sale Alert: Up to 50% Off Selected Items!",
    type: "Marketing",
    content: "Hurry! Our flash sale is live for a limited time. Grab your favorites now...",
    status: "Completed",
    createdAt: "15/02/2025, 05:00 pm",
    scheduledAt: "15/02/2025, 06:00 pm",
    metrics: {
      contacts: 1000,
      delivered: 800,
      read: 450,
      skipped: 50,
      failed: 100,
    },
  },
  {
    id: "7",
    title: "Important: Update to Our Privacy Policy",
    type: "Transactional",
    content: "We've made changes to our privacy policy. Please review the updates...",
    status: "Completed",
    createdAt: "16/02/2025, 09:15 am",
    scheduledAt: "16/02/2025, 09:30 am",
    metrics: {
      contacts: 250,
      delivered: 230,
      read: 80,
      skipped: 5,
      failed: 15,
    },
  },
  {
    id: "8",
    title: "You're Invited: Exclusive Event Just for You",
    type: "Marketing",
    content: "Join us for a special event featuring industry leaders and networking opportunities...",
    status: "Scheduled",
    createdAt: "17/02/2025, 07:00 pm",
    scheduledAt: "18/02/2025, 08:00 am",
    metrics: {
      contacts: 400,
      delivered: 0,
      read: 0,
      skipped: 0,
      failed: 0,
    },
  },
  {
    id: "9",
    title: "Your Weekly Digest: Top News and Updates",
    type: "Transactional",
    content: "Stay informed with the latest news and updates from our team...",
    status: "Completed",
    createdAt: "17/02/2025, 11:30 am",
    scheduledAt: "17/02/2025, 11:45 am",
    metrics: {
      contacts: 500,
      delivered: 450,
      read: 200,
      skipped: 20,
      failed: 30,
    },
  },
  {
    id: "10",
    title: "New Feature Announcement: Enhance Your Experience",
    type: "Marketing",
    content: "We're excited to introduce a new feature that will improve your workflow...",
    status: "Running",
    createdAt: "18/02/2025, 04:00 pm",
    scheduledAt: "18/02/2025, 06:00 pm",
    metrics: {
      contacts: 350,
      delivered: 100,
      read: 50,
      skipped: 10,
      failed: 20,
    },
  },
]

export default function BroadcastDashboard() {
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const statuses = ["all", "Completed", "Aborted", "Scheduled", "Draft", "Running", "Pause"]

  const filteredBroadcasts = broadcasts.filter((broadcast:any) =>
    statusFilter === "all" ? true : broadcast.status === statusFilter,
  )

  const getMetricPercentage = (value: number, total: number) => {
    return total > 0 ? Math.round((value / total) * 100) : 0
  }

  return (
    <div className="w-full p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Broadcast</h1>
        <Link href={"/broadcast/create"}><Button variant="default" className="bg-blue-500 text-white hover:bg-blue-600">+ Broadcast Campaigns</Button></Link>
      </div>

      {/* Search and Filter */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <input
          type="text"
          placeholder="Search here..."
          className="w-80 pl-10 pr-4 py-2 rounded-md bg-transparent border"
        />
      </div>

      {/* Mobile View - Cards */}
      <div className="lg:hidden space-y-4 ">
        {broadcasts.map((broadcast:any) => (
          <Card key={broadcast.id} className="text-black bg-blue-50">
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium line-clamp-1">{broadcast.title}</h3>
                    <Badge variant="secondary" className="text-xs ">
                      {broadcast.type}
                    </Badge>
                  </div>
                  <p className="text-sm line-clamp-1">{broadcast.content}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" /> Copy Broadcast ID
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" /> Download Contacts
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Info className="mr-2 h-4 w-4" /> More Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Created at</p>
                  <p className="text-sm font-light">{broadcast.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Scheduled at</p>
                  <p className="text-sm font-light">{broadcast.scheduledAt}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Contacts</p>
                  <p className="text-sm text-muted-foreground">{broadcast.metrics.contacts}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Delivered</p>
                  <p className="text-sm text-muted-foreground">{broadcast.metrics.delivered}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium">Read</p>
                  <p className="text-sm text-muted-foreground">{broadcast.metrics.read}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Skipped</p>
                  <p className="text-sm text-muted-foreground">{broadcast.metrics.skipped}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Failed</p>
                  <p className="text-sm text-muted-foreground">{broadcast.metrics.failed}</p>
                </div>
              </div>
              <Button variant="link" className="w-full justify-between p-0 text-blue-600">
                View Details
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden lg:block text-white ">
      <ScrollArea className='no-scrollbar h-[70vh] flex flex-1 overflow-scroll  rounded-md border'>
       
            <Table className="overflow-x-scroll">
              <TableHeader className=" bg-blue-500">
                <TableRow className="hover:bg-blue-500 ">
                  <TableHead className="text-white">Broadcast Name</TableHead>
                  <TableHead className="text-white">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-white hover:bg-blue-600 px-2">
                          Status
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter}>
                          {statuses.map((status) => (
                            <DropdownMenuRadioItem key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableHead>
                  <TableHead className="text-white">Created at</TableHead>
                  <TableHead className="text-white">Scheduled at</TableHead>
                  <TableHead className="text-white">Contacts</TableHead>
                  <TableHead className="text-white">Delivered</TableHead>
                  <TableHead className="text-white">Read</TableHead>
                  <TableHead className="text-white">Skipped</TableHead>
                  <TableHead className="text-white">Failed</TableHead>
                  <TableHead className="text-white"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-blue-50 text-black">
                {filteredBroadcasts.map((broadcast:any) => (
                  <TableRow key={broadcast.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>
                      <div className="space-y-1 w-80">
                        <div className="flex items-start gap-2">
                          <span className="font-medium line-clamp-1">{broadcast.title}</span>
                          <Badge variant="outline" className="text-xs whitespace-nowrap">
                            {broadcast.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-1">{broadcast.content}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className={cn(
                          "flex items-center gap-2 w-fit px-2 py-1 rounded-lg font-medium",
                          broadcast.status === "Completed" && "text-blue-500",
                          broadcast.status === "Scheduled" && "text-amber-500",
                          broadcast.status === "Running" && "text-green-500",
                          broadcast.status === "Aborted" && "text-red-500",
                          broadcast.status === "Draft" && "text-gray-500",
                          broadcast.status === "Pause" && "text-purple-500",
                        )}
                      >
                        {broadcast.status}
                      </div>
                    </TableCell>
                    <TableCell>{broadcast.createdAt}</TableCell>
                    <TableCell>{broadcast.scheduledAt}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>{broadcast.metrics.contacts}</TooltipTrigger>
                          <TooltipContent>
                            <p>Total Contacts</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>{broadcast.metrics.delivered}</TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {getMetricPercentage(broadcast.metrics.delivered, broadcast.metrics.contacts)}% of total
                              contacts
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>{broadcast.metrics.read}</TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {getMetricPercentage(broadcast.metrics.read, broadcast.metrics.contacts)}% of total
                              contacts
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>{broadcast.metrics.skipped}</TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {getMetricPercentage(broadcast.metrics.skipped, broadcast.metrics.contacts)}% of total
                              contacts
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>{broadcast.metrics.failed}</TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {getMetricPercentage(broadcast.metrics.failed, broadcast.metrics.contacts)}% of total
                              contacts
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" /> Copy Broadcast ID
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" /> Download Contacts
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Info className="mr-2 h-4 w-4" /> More Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </ScrollArea>
        </div>
      
    </div>
  )
}

