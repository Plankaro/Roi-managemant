/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { format, subDays, subMonths } from "date-fns"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useSelector, useDispatch } from "react-redux"
import { setDateRange, type DateRange } from "@/store/features/analytics"
import { RootState } from "@/store/store"

type TimeFilterProps = {
  className?: string
}

export default function TimeFilter({ className }: TimeFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string>("14days")
  const today = new Date()


  // Use Redux hooks
  const dispatch = useDispatch()
  const dateRange = useSelector((state: RootState) => state.analytics)
  console.log(dateRange)

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)

    let newRange: DateRange = {
      startDate: dateRange?.startDate,
      endDate: dateRange?.endDate,
    }

    switch (option) {
      case "14days":
        newRange = {
          startDate: subDays(today, 14),
          endDate: today,
        }
        break
      case "30days":
        newRange = {
          startDate: subDays(today, 30),
          endDate: today,
        }
        break
      case "6months":
        newRange = {
          startDate: subMonths(today, 6),
          endDate: today,
        }
        break
      case "custom":
        // Keep the current range when switching to custom
        newRange = {
          startDate: dateRange?.startDate || subDays(today, 14),
          endDate: dateRange?.endDate || today,
        }
        break
    }

    // Dispatch the action to update Redux state
    dispatch(setDateRange(newRange))

    if (option !== "custom") {
      setIsOpen(false)
    }
  }

  const handleCustomDateChange = (field: "startDate" | "endDate", date: string) => {
    // Ensure date is never null and not in the future
    if (!date) return

    const newDate = new Date(date)
    const today = new Date()
    today.setHours(23, 59, 59, 999) // Set to end of day for comparison

    // Don't allow future dates
    if (newDate > today) return

    // Don't allow end date before start date
    if (field === "endDate" && newDate < dateRange.startDate) return
    if (field === "startDate" && newDate > dateRange.endDate) return

    // Dispatch the action to update Redux state
    dispatch(
      setDateRange({
        ...dateRange,
        [field]: newDate,
      })
    )
  }

  const getDisplayText = () => {
    switch (selectedOption) {
      case "14days":
        return "Last 14 Days"
      case "30days":
        return "Last 30 Days"
      case "6months":
        return "Last 6 Months"
      case "custom":
        return "Custom"
      default:
        return "Select Time Range"
    }
  }

  // Format today's date for max attribute
  const maxDate = format(today, "yyyy-MM-dd")

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={"sm"}
          className={cn(
            "justify-between rounded-full border border-primary hover:text-white bg-transparent py-2 text-lg font-medium text-white hover:bg-transparent",
            isOpen && "ring-1 ",
            className,
          )}
        >
          {getDisplayText()}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border border-primary bg-backgroundColor p-0 text-white shadow-lg backdrop-blur-sm"
        align="start"
      >
        <div className="grid gap-1 p-2">
          <Button
            variant="ghost"
            className={cn(
              "justify-start rounded-md text-left text-white hover:text-white hover:bg-primary",
              selectedOption === "14days" && "bg-primary",
            )}
            onClick={() => handleOptionSelect("14days")}
          >
            Last 14 Days
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "justify-start rounded-md text-left hover:text-white hover:bg-primary",
              selectedOption === "30days" && "bg-white/10",
            )}
            onClick={() => handleOptionSelect("30days")}
          >
            Last 30 Days
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "justify-start rounded-md text-left text-white hover:text-white hover:bg-primary",
              selectedOption === "6months" && "bg-primary",
            )}
            onClick={() => handleOptionSelect("6months")}
          >
            Last 6 Months
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "justify-start rounded-md text-left text-white hover:text-white hover:bg-primary",
              selectedOption === "custom" && "bg-primary",
            )}
            onClick={() => handleOptionSelect("custom")}
          >
            Custom
          </Button>

          {selectedOption === "custom" && (
            <div className="mt-2 grid gap-3 border-t border-white/20 p-3">
              <div className="grid gap-1">
                <label className="text-sm text-white/70">Start Date</label>
                <Input
                  type="date"
                  max={maxDate}
                  value={dateRange?.startDate ? format(new Date(dateRange.startDate), "yyyy-MM-dd") : ""}
                  onChange={(e) => handleCustomDateChange("startDate", e.target.value)}
                  className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-white/70">End Date</label>
                <Input
                  type="date"
                  max={maxDate}
                  value={dateRange?.endDate ? format(new Date(dateRange.endDate), "yyyy-MM-dd") : ""}
                  onChange={(e) => handleCustomDateChange("endDate", e.target.value)}
                  className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <Button onClick={() => setIsOpen(false)} className="mt-2 bg-blue-950 hover:bg-blue-950">
                Apply
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}