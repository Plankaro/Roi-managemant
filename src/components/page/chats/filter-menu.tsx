"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const filters: { title: string; options: string[] }[] = [
  {
    title: "Conversation Status",
    options: ["Open", "Closed", "Pending"],
  },
  {
    title: "Channels",
    options: ["WhatsApp", "SMS", "Email", "Phone"],
  },
  {
    title: "Agents",
    options: ["X", "Y", "Z"],
  },
  {
    title: "Assignment Status",
    options: ["Assigned", "Unassigned"],
  },
  {
    title: "Read Status",
    options: ["Read", "Unread"],
  },
  {
    title: "Broadcast Campaigns",
    options: ["Campaign 1", "Campaign 2", "Campaign 3"],
  },
  {
    title: "Drip Campaigns",
    options: ["Campaign A", "Campaign B", "Campaign C"],
  },
  {
    title: "Tags/Labels",
    options: ["Tag 1", "Tag 2", "Tag 3"],
  },
]

export function FilterMenu() {
  const [selectedFilters, setSelectedFilters] = React.useState<Record<string, string[]>>({})

  const handleFilterChange = (filterTitle: string, option: string) => {
    setSelectedFilters((prev) => {
      const currentOptions = prev[filterTitle] || []
      const newOptions = currentOptions.includes(option)
        ? currentOptions.filter((item) => item !== option)
        : [...currentOptions, option]

      return {
        ...prev,
        [filterTitle]: newOptions,
      }
    })
  }

  const clearAllFilters = () => {
    setSelectedFilters({})
  }

  return (
    <div className="bg-transparent text-white p-4 w-full max-w-screen-xl">
     
       
        <ScrollArea className="w-full">

          {" "}
          {/* Adjust width to account for "Clear All" button */}
          <div className="flex gap-2 pb-2">
             <Button
          variant="link"
          className="text-red-500 hover:text-red-400 px-0 whitespace-nowrap"
          onClick={clearAllFilters}
          size="sm"
        >
          Clear All
        </Button>
            {" "}
            {/* Add bottom padding for ScrollBar */}
            {filters?.map((filter) => (
              <DropdownMenu key={filter.title}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center hover:bg-slate-800 h-auto hover:bg-transparent hover:text-white/90 whitespace-nowrap"
                    size="sm"
                  >
                    <span>{filter.title}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-slate-900 border-slate-800 max-h-[300px] overflow-y-auto">
                  {filter.options.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option}
                      checked={selectedFilters[filter.title]?.includes(option)}
                      onSelect={(e) => {
                        e.preventDefault()
                        handleFilterChange(filter.title, option)
                      }}
                      className="text-white hover:bg-slate-800"
                    >
                      {option}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
    
    </div>
  )
}

