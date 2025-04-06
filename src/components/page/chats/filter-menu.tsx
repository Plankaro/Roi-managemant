/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useGetAllBroadcastsQuery, useGetCampaignQuery, useGetTeamQuery } from "@/store/features/apislice"
import { useDispatch, useSelector } from "react-redux"
import { toggleFilterOption, clearAllFilters,type Filters } from "@/store/features/prospect"
import { RootState } from "@/store/store"


type FilterOption = {
  label: string
  value: string
}

type FilterGroup = {
  title: string
  options: FilterOption[]
  filter_title: string
  isLoading?: boolean
}

export function FilterMenu() {
  const { data: BroadcastData, isLoading: isBroadcastLoading } = useGetAllBroadcastsQuery({})
  const { data: CampaignData, isLoading: isCampaignLoading } = useGetCampaignQuery({})
  const { data: TeamData, isLoading: isTeamLoading } = useGetTeamQuery({})

  const dispatch = useDispatch();
  const {filters}=useSelector((State:RootState)=>State.Prospect)
  console.log(filters)


  const FilterOptions: FilterGroup[] = [
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
      filter_title:"assignment_status",
      options: [
        { label: "Assigned", value: "assigned" },
        { label: "Unassigned", value: "unassigned" },
      ],
    },
    {
      title: "Message Status",
      filter_title:"conversation_status",
      options: [
        { label: "Read", value: "read" },
        { label: "Unread", value: "unread" },
      ],
    },
    {
      title: "Broadcast Campaigns",
      filter_title:"broadcast",
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
      filter_title:"engagement_status",
      options: [
        { label: "Lead", value: "LEAD" },
        { label: "Lost", value: "LOST" },
        { label: "Negotiation", value: "NEGOTIATION" },
        { label: "Other", value: "OTHER" },
      ],
    },    
    {
      title: "Drip Campaigns",
      filter_title:"campaigns",
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
      filter_title:"tags",
      options: [
        { label: "Tag 1", value: "tag_1" },
        { label: "Tag 2", value: "tag_2" },
        { label: "Tag 3", value: "tag_3" },
      ],
    },
  ]



  const handleFilterChange = (filterTitle: string, optionValue: string) => {
    console.log("handleFilterChange called with filterTitle:", filterTitle, "and optionValue:", optionValue);
    dispatch(toggleFilterOption({ filterKey: filterTitle as keyof Filters, value: optionValue }))
  }




  return (
    <div>
      <div className="flex items-center my-2">
        <ScrollArea className="xl:w-[calc(89vw-130px)] md:w-[calc(90vw-100px)] md:block hidden bg-transparent text-white p-4">
          <div className="flex gap-2 pb-2 flex-nowrap">
            <Button
              variant="link"
              className="text-red-500 hover:text-red-400 px-0 whitespace-nowrap"
              onClick={() => dispatch(clearAllFilters())}
              size="sm"
            >
              Clear All
            </Button>

            {FilterOptions.map((filter) => (
              <DropdownMenu key={filter.title}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center hover:bg-slate-800 h-auto hover:bg-transparent hover:text-white/90 whitespace-nowrap"
                    size="sm"
                  >
                    <span>{filter.title}</span>
                    {filter.isLoading && <Loader2 className="h-3 w-3 ml-1 animate-spin" />}
                    {!filter.isLoading && <ChevronDown className="h-4 w-4 ml-1" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-slate-900 border-slate-800 max-h-[300px] overflow-y-auto">
                  {filter.isLoading ? (
                    <div className="flex items-center justify-center py-4 text-white/70">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      <span>Loading...</span>
                    </div>
                  ) : filter.options.length === 0 ? (
                    <div className="px-2 py-4 text-center text-white/70">No {filter.title.toLowerCase()} found</div>
                  ) : (
                    filter.options.map((option) => (
                      <DropdownMenuCheckboxItem
                        key={option.value}
                        checked={filters[filter?.filter_title as keyof Filters]?.includes(option.value as never)}
                        onSelect={(e) => {
                          e.preventDefault()
                          handleFilterChange(filter.filter_title, option.value)
                        }}
                        className="text-white hover:bg-slate-800"
                      >
                        {option.label}
                      </DropdownMenuCheckboxItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="" />
        </ScrollArea>
      </div>
    </div>
  )



}

