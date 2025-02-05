/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useCallback } from "react"
import debounce from "lodash/debounce"
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
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// Use unique broadcast entries to avoid duplicate IDs
const broadcasts = [
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
    type: "Promotional",
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
    title: "Exclusive Deal: Buy One Get One Free!",
    type: "Promotional",
    content: "For a limited time, buy one product and get another absolutely free...",
    status: "Scheduled",
    createdAt: "15/02/2025, 11:00 am",
    scheduledAt: "16/02/2025, 09:00 am",
    metrics: {
      contacts: 600,
      delivered: 0,
      read: 0,
      skipped: 0,
      failed: 0,
    },
  },
  {
    id: "5",
    title: "Account Verification Required",
    type: "Transactional",
    content: "Please verify your account to continue enjoying our services...",
    status: "Completed",
    createdAt: "10/02/2025, 08:30 am",
    scheduledAt: "10/02/2025, 08:30 am",
    metrics: {
      contacts: 200,
      delivered: 180,
      read: 150,
      skipped: 10,
      failed: 20,
    },
  },
  {
    id: "6",
    title: "Flash Sale: 50% Off for the Next 24 Hours!",
    type: "Promotional",
    content: "Hurry up! Grab your favorite items at half price before the sale ends...",
    status: "Scheduled",
    createdAt: "14/02/2025, 07:00 am",
    scheduledAt: "14/02/2025, 08:00 am",
    metrics: {
      contacts: 700,
      delivered: 0,
      read: 0,
      skipped: 0,
      failed: 0,
    },
  },
  {
    id: "7",
    title: "Password Reset Successful",
    type: "Transactional",
    content: "Your password has been successfully reset. If you did not initiate this change, please contact support immediately...",
    status: "Completed",
    createdAt: "11/02/2025, 05:45 pm",
    scheduledAt: "11/02/2025, 05:45 pm",
    metrics: {
      contacts: 100,
      delivered: 95,
      read: 80,
      skipped: 5,
      failed: 5,
    },
  },
  {
    id: "8",
    title: "New Collection Launch: Summer 2025",
    type: "Promotional",
    content: "Explore our brand-new summer collection and refresh your wardrobe with the latest trends...",
    status: "Scheduled",
    createdAt: "20/02/2025, 09:00 am",
    scheduledAt: "21/02/2025, 09:00 am",
    metrics: {
      contacts: 800,
      delivered: 0,
      read: 0,
      skipped: 0,
      failed: 0,
    },
  },
  {
    id: "9",
    title: "Subscription Renewal Confirmation",
    type: "Transactional",
    content: "Your subscription has been successfully renewed. Thank you for your continued support...",
    status: "Completed",
    createdAt: "18/02/2025, 02:15 pm",
    scheduledAt: "18/02/2025, 02:15 pm",
    metrics: {
      contacts: 250,
      delivered: 240,
      read: 200,
      skipped: 10,
      failed: 10,
    },
  },
  {
    id: "10",
    title: "Special Offer: Free Shipping on Orders Over $50",
    type: "Promotional",
    content: "Enjoy free shipping when you spend over $50. Shop now and save on delivery...",
    status: "Scheduled",
    createdAt: "22/02/2025, 10:00 am",
    scheduledAt: "23/02/2025, 10:00 am",
    metrics: {
      contacts: 550,
      delivered: 0,
      read: 0,
      skipped: 0,
      failed: 0,
    },
  },
  {
    id: "11",
    title: "Payment Received for Your Recent Order",
    type: "Transactional",
    content: "We have received your payment for order #12345. Thank you for shopping with us...",
    status: "Completed",
    createdAt: "19/02/2025, 04:30 pm",
    scheduledAt: "19/02/2025, 04:30 pm",
    metrics: {
      contacts: 180,
      delivered: 170,
      read: 150,
      skipped: 10,
      failed: 10,
    },
  },
  {
    id: "12",
    title: "Weekend Sale: Up to 30% Off Selected Items",
    type: "Promotional",
    content: "This weekend only, enjoy up to 30% off on selected items. Don't miss out...",
    status: "Scheduled",
    createdAt: "21/02/2025, 08:00 am",
    scheduledAt: "22/02/2025, 08:00 am",
    metrics: {
      contacts: 650,
      delivered: 0,
      read: 0,
      skipped: 0,
    }}
]

const statuses = ["all", "Completed", "Aborted", "Scheduled", "Draft", "Running", "Pause"]

export default function BroadcastDashboard() {
  const [inputValue, setInputValue] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilters, setStatusFilters] = useState<string[]>([])

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value)
    }, 300),
    [],
  )
  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    debouncedSearch(e.target.value)
  }

  // Filtering: When no filters are active, all broadcasts show up.
  const filteredBroadcasts = broadcasts.filter((broadcast: any) => {
    const matchesStatus =
      statusFilters.length === 0 || statusFilters.includes(broadcast.status)
    const matchesSearch = broadcast.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getMetricPercentage = (value: number, total: number) => {
    return total > 0 ? Math.round((value / total) * 100) : 0
  }

  return (
    <div className="w-full p-4 space-y-4">
      {/* Header */}
      <div className="flex  justify-between items-center mb-6">
        <h1 className="md:text-2xl  text-base font-bold text-white">Broadcast</h1>
        <Link href={"/broadcast/create"}>
          <Button variant="default" className="bg-blue-500 text-white hover:bg-blue-600 md:text-base text-sm">
            + Broadcast Campaigns
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search here..."
          className="w-80 pl-10 pr-4 py-2 rounded-md bg-transparent text-white border"
          value={inputValue}
          onChange={handleSearchChange}
        />
      </div>

      {/* Mobile View - Cards */}
      <div className="xl:hidden space-y-4">
        {filteredBroadcasts.length > 0 ? (
          filteredBroadcasts.map((broadcast: any, index: number) => (
            <Card key={`${broadcast.id}-${index}`} className="text-black bg-blue-50">
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div>
                        <h3 className="font-medium line-clamp-1">{broadcast.title}</h3>
                        <p className="text-sm line-clamp-1">{broadcast.content}</p>
                      </div>
                      <div>
                        <Badge variant="secondary" className="text-xs">
                          {broadcast.type}
                        </Badge>
                      </div>
                    </div>
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
                <Button variant="link" className="w-full justify-between p-0 text-red-500">
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No broadcasts found matching your criteria
          </div>
        )}
      </div>

      {/* Desktop View - Table with Horizontal Scrolling */}
      <ScrollArea className="hidden xl:block text-white overflow-auto no-scrollbar  max-h-[75vh] max-w-[90vw]">
        <Table className="min-w-[1000px]">
          <TableHeader className="bg-blue-500">
            <TableRow className="hover:bg-blue-500">
              <TableHead className="text-white py-4 px-6 w-80">Broadcast Name</TableHead>
              <TableHead className="text-white py-4 px-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-white hover:bg-blue-600 px-4 py-2">
                      Status
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuCheckboxItem
                      checked={statusFilters.length === 0}
                      onCheckedChange={() => setStatusFilters([])}
                    >
                      All
                    </DropdownMenuCheckboxItem>
                    {statuses.filter((status) => status !== "all").map((status) => (
                      <DropdownMenuCheckboxItem
                        key={status}
                        checked={statusFilters.includes(status)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setStatusFilters((prev) => [...prev, status])
                          } else {
                            setStatusFilters((prev) => prev.filter((s) => s !== status))
                          }
                        }}
                      >
                        {status}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableHead>
              <TableHead className="text-white py-4 px-6">Created at</TableHead>
              <TableHead className="text-white py-4 px-6">Scheduled at</TableHead>
              <TableHead className="text-white py-4 px-6">Contacts</TableHead>
              <TableHead className="text-white py-4 px-6">Delivered</TableHead>
              <TableHead className="text-white py-4 px-6">Read</TableHead>
              <TableHead className="text-white py-4 px-6">Skipped</TableHead>
              <TableHead className="text-white py-4 px-6">Failed</TableHead>
              <TableHead className="text-white py-4 px-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-blue-50 text-black">
            {filteredBroadcasts.length > 0 ? (
              filteredBroadcasts.map((broadcast: any, index: number) => (
                <TableRow key={`${broadcast.id}-${index}`} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="py-4 px-6">
                    <div className="space-y-1 w-80">
                      <div className="flex items-start">
                        <div className="flex flex-col">
                          <span className="font-semibold line-clamp-1">{broadcast.title}</span>
                          <p className="text-sm text-gray-500 line-clamp-1">{broadcast.content}</p>
                        </div>
                        <Badge variant="outline" className="border border-blue-600 text-xs whitespace-nowrap ml-2">
                          {broadcast.type}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
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
                  <TableCell className="py-4 px-6">{broadcast.createdAt}</TableCell>
                  <TableCell className="py-4 px-6">{broadcast.scheduledAt}</TableCell>
                  <TableCell className="py-4 px-6">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{broadcast.metrics.contacts}</TooltipTrigger>
                        <TooltipContent>
                          <p>Total Contacts</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{broadcast.metrics.delivered}</TooltipTrigger>
                        <TooltipContent>
                          <p>{getMetricPercentage(broadcast.metrics.delivered, broadcast.metrics.contacts)}% of total contacts</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{broadcast.metrics.read}</TooltipTrigger>
                        <TooltipContent>
                          <p>{getMetricPercentage(broadcast.metrics.read, broadcast.metrics.contacts)}% of total contacts</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{broadcast.metrics.skipped}</TooltipTrigger>
                        <TooltipContent>
                          <p>{getMetricPercentage(broadcast.metrics.skipped, broadcast.metrics.contacts)}% of total contacts</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{broadcast.metrics.failed}</TooltipTrigger>
                        <TooltipContent>
                          <p>{getMetricPercentage(broadcast.metrics.failed, broadcast.metrics.contacts)}% of total contacts</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="py-4 px-6">
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-4">
                  No broadcasts found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}
