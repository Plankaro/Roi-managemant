"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"


const filters: { title: string; options: string[] }[] = [
  {
    title: "Conversation Status",
    options: ["Open", "Closed"],
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
    title: "Tags",
    options: ["Tag 1", "Tag 2", "Tag 3"],
  },
]

export default function FilterDropdown({children }:{children:React.ReactNode}) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [isOpen, setIsOpen] = useState(false)

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

      <DropdownMenuContent className="sm:w-[85vw]  w-[80vw] sm:p-5 p-1 bg-primary border-none" align="start">
        
        <div className=" overflow-y-auto scrollbar-hide">
          <Accordion type="single" collapsible className="w-full">
            {filters.map((filter) => (
              <AccordionItem value={filter.title} key={filter.title} className="border-none">
                <AccordionTrigger className="text-sm text-white px-4 py-2 hover:no-underline hover:bg-blue-700/20">
                  {filter.title}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2">
                    {filter.options.map((option) => (
                      <div className="flex items-center space-x-2" key={option}>
                        <Checkbox
                          id={`${filter.title}-${option}`}
                          checked={selectedFilters[filter.title]?.includes(option)}
                          onCheckedChange={() => handleFilterChange(filter.title, option)}
                          className="border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-blue-600"
                        />
                        <Label htmlFor={`${filter.title}-${option}`} className="text-sm font-normal text-white/90">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

