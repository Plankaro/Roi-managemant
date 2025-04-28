/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { toggleFilterOption, clearAllFilters, Filters } from "@/store/features/prospect"
import type { RootState } from "@/store/store"
import {
  useGetAllBroadcastsQuery,
  useGetCampaignQuery,
  useGetTeamQuery,
  useGetTagsQuery,
} from "@/store/features/apislice"

export default function FilterDropdown({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const { filters } = useSelector((state: RootState) => state.Prospect)

  // Fetch data using RTK Query hooks
  const { data: BroadcastData, isLoading: isBroadcastLoading } = useGetAllBroadcastsQuery({})
  const { data: CampaignData, isLoading: isCampaignLoading } = useGetCampaignQuery({})
  const { data: TeamData, isLoading: isTeamLoading } = useGetTeamQuery({})
  const { data: TagData, isLoading: isTagLoading } = useGetTagsQuery({})

  // Define filter groups with the same structure as FilterMenu
  const filterGroups = [
    {
      title: "Agents",
      filter_title: "Agents",
      options: TeamData?.agents
        ? TeamData.agents.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))
        : [],
      isLoading: isTeamLoading,
    },
    {
      title: "Assignment Status",
      filter_title: "assignment_status",
      options: [
        { label: "Assigned", value: "assigned" },
        { label: "Unassigned", value: "unassigned" },
      ],
    },
    {
      title: "Message Status",
      filter_title: "conversation_status",
      options: [
        { label: "Read", value: "read" },
        { label: "Unread", value: "unread" },
      ],
    },
    {
      title: "Broadcast Campaigns",
      filter_title: "broadcast",
      options: BroadcastData?.length
        ? BroadcastData.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))
        : [],
      isLoading: isBroadcastLoading,
    },
    {
      title: "Engagement Status",
      filter_title: "engagement_status",
      options: [
        { label: "Lead", value: "LEAD" },
        { label: "Lost", value: "LOST" },
        { label: "Negotiation", value: "NEGOTIATION" },
        { label: "Other", value: "OTHER" },
      ],
    },
    {
      title: "Drip Campaigns",
      filter_title: "campaigns",
      options: CampaignData?.length
        ? CampaignData?.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))
        : [],
      isLoading: isCampaignLoading,
    },
    {
      title: "Tags/Labels",
      filter_title: "tags",
      options: TagData?.length
        ? TagData?.map((item: any) => ({
            label: item.tagName,
            value: item.id,
          }))
        : [],
      isLoading: isTagLoading,
    },
  ]

  // Handle filter change using Redux dispatch
  const handleFilterChange = (filterTitle: string, optionValue: string) => {
    dispatch(toggleFilterOption({ filterKey: filterTitle as keyof Filters, value: optionValue }))
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-white hover:bg-transparent hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {children}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="sm:w-[85vw] w-[80vw] sm:p-5 p-1 bg-primary border-none" align="start">
        <Button
          variant="link"
          className="text-red-500 hover:text-red-400 px-4 py-2 whitespace-nowrap mb-2"
          onClick={() => dispatch(clearAllFilters())}
          size="sm"
        >
          Clear All
        </Button>

        <div className="overflow-y-auto scrollbar-hide">
          <Accordion type="single" collapsible className="w-full">
            {filterGroups.map((filter) => (
              <AccordionItem value={filter.title} key={filter.title} className="border-none">
                <AccordionTrigger className="text-sm text-white px-4 py-2 hover:no-underline hover:bg-blue-700/20 flex justify-between">
                  {filter.title}
                  {filter.isLoading && <Loader2 className="h-3 w-3 ml-1 animate-spin" />}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  {filter.isLoading ? (
                    <div className="flex items-center justify-center py-4 text-white/70">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      <span>Loading...</span>
                    </div>
                  ) : filter.options.length === 0 ? (
                    <div className="px-2 py-4 text-center text-white/70">No {filter.title.toLowerCase()} found</div>
                  ) : (
                    <div className="space-y-2">
                      {filter.options.map((option:any) => (
                        <div className="flex items-center space-x-2" key={option.value}>
                          <Checkbox
                            id={`${filter.title}-${option.value}`}
                            checked={filters[filter.filter_title as keyof typeof filters]?.includes(
                              option.value as never,
                            )}
                            onCheckedChange={() => handleFilterChange(filter.filter_title, option.value)}
                            className="border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-blue-600"
                          />
                          <Label
                            htmlFor={`${filter.title}-${option.value}`}
                            className="text-sm font-normal text-white/90"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
