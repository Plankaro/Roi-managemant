"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { format, subDays, subMonths } from "date-fns"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type DateRange = {
  startDate: Date | null
  endDate: Date | null
}

type TimeFilterProps = {
  value: DateRange
  onChange: (range: DateRange) => void
  className?: string
}

export default function TimeFilter({ value, onChange, className }: TimeFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string>("30days")

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)

    const today = new Date()
    let newRange: DateRange = { startDate: null, endDate: null }

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
        newRange = value
        break
    }

    onChange(newRange)

    if (option !== "custom") {
      setIsOpen(false)
    }
  }

  const handleCustomDateChange = (field: "startDate" | "endDate", date: Date | null) => {
    onChange({
      ...value,
      [field]: date,
    })
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

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={"sm"}
          className={cn(
            " justify-between rounded-full border-2 border-purple-500 bg-gradient-to-r from-purple-900 to-blue-900 py-6 text-3xl font-bold text-white hover:from-purple-800 hover:to-blue-800",
            isOpen && "ring-2 ring-purple-400",
            className,
          )}
        >
          {getDisplayText()}
          <ChevronDown className="ml-2 h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className=" border-purple-700 bg-gradient-to-b from-purple-950 to-blue-950 p-0 text-white shadow-lg"
        align="start"
      >
        <div className="grid gap-1 p-2">
          <Button
            variant="ghost"
            className={cn(
              "justify-start rounded-md  text-left text-white hover:bg-white/10",
              selectedOption === "14days" && "bg-white/20",
            )}
            onClick={() => handleOptionSelect("14days")}
          >
            Last 14 Days
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "justify-start rounded-md px-4 py-2 text-left text-white hover:bg-white/10",
              selectedOption === "30days" && "bg-white/20",
            )}
            onClick={() => handleOptionSelect("30days")}
          >
            Last 30 Days
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "justify-start rounded-md px-4 py-2 text-left text-white hover:bg-white/10",
              selectedOption === "6months" && "bg-white/20",
            )}
            onClick={() => handleOptionSelect("6months")}
          >
            Last 6 Months
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "justify-start rounded-md px-4 py-2 text-left text-white hover:bg-white/10",
              selectedOption === "custom" && "bg-white/20",
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
                  value={value.startDate ? format(value.startDate, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : null
                    handleCustomDateChange("startDate", date)
                  }}
                  className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-white/70">End Date</label>
                <Input
                  type="date"
                  value={value.endDate ? format(value.endDate, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : null
                    handleCustomDateChange("endDate", date)
                  }}
                  className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <Button
                onClick={() => {
                  if (value.startDate && value.endDate) {
                    setIsOpen(false)
                  }
                }}
                disabled={!value.startDate || !value.endDate}
                className="mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Apply
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

