/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"

function Schedule() {
  const [date, setDate] = React.useState<Date>()
  const [time, setTime] = React.useState<string>("10:00 AM")
  const [isTimePickerOpen, setIsTimePickerOpen] = React.useState(false)

  const hours = Array.from({ length: 12 }, (_, i) => i + 1)
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))
  const periods = ["AM", "PM"]

  const formatTime = (hour: number, minute: string, period: string) => {
    return `${hour}:${minute} ${period}`
  }

  return (
    <ScrollArea className="flex-1 h-fit no-scrollbar overflow-scroll bg-gray-50 rounded-3xl">
      <div className="p-8 space-y-8">
        <div className="space-y-6">
          <h2 className="text-lg font-medium">Schedule</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Frequency</label>
              <Select defaultValue="once">
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Once" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="once">Once</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-600">Date & Time (IST)</label>
              <div className="grid grid-cols-2 gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal bg-white", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "MMM dd, yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>

                <Popover open={isTimePickerOpen} onOpenChange={setIsTimePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal bg-white", !time && "text-muted-foreground")}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {time || "Select time"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[280px] p-4" align="start">
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="space-y-2">
                          <label className="text-xs font-medium">Hour</label>
                          <Select
                            value={time.split(":")[0]}
                            onValueChange={(value) => {
                              const [_, minute, period] = time.split(/[: ]/)
                              setTime(formatTime(Number.parseInt(value), minute, period))
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {hours.map((hour) => (
                                <SelectItem key={hour} value={hour.toString()}>
                                  {hour}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium">Minute</label>
                          <Select
                            value={time.split(":")[1].split(" ")[0]}
                            onValueChange={(value) => {
                              const [hour, _, period] = time.split(/[: ]/)
                              setTime(formatTime(Number.parseInt(hour), value, period))
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {minutes.map((minute) => (
                                <SelectItem key={minute} value={minute}>
                                  {minute}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium">Period</label>
                          <Select
                            value={time.split(" ")[1]}
                            onValueChange={(value) => {
                              const [hour, minute] = time.split(/[: ]/)
                              setTime(formatTime(Number.parseInt(hour), minute, value))
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {periods.map((period) => (
                                <SelectItem key={period} value={period}>
                                  {period}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsTimePickerOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setIsTimePickerOpen(false)}>OK</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">Run test message</h2>
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Enter the mobile number</label>
            <Input type="tel" defaultValue="+91 9876543212" className="bg-white border-gray-200" />
          </div>
          <Button className="bg-[#4B6BFB] hover:bg-[#4B6BFB]/90 text-white">Send Message</Button>
        </div>
      </div>
    </ScrollArea>
  )
}

export default Schedule

