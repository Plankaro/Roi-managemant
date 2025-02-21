"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AudienceFilterState {
  skipInactiveContacts: {
    enabled: boolean
    days: number
  }
  limitMarketingMessages: {
    enabled: boolean
    maxMessages: number
    timeRange: number
    timeUnit: string
  }
  avoidDuplicateContacts: {
    enabled: boolean
  }
}

export function AudienceFilteringDialog({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<AudienceFilterState>({
    skipInactiveContacts: { enabled: true, days: 15 },
    limitMarketingMessages: { enabled: false, maxMessages: 2, timeRange: 24, timeUnit: "hours" },
    avoidDuplicateContacts: { enabled: true }
  })
  console.log(filters)

  const NumberInput = ({ value, onChange }: { value: number; onChange: (val: number) => void }) => (
    <div className="flex items-center">
      <Button
        type="button"
        size="icon"
        className="h-8 w-8 rounded-full bg-[#4F75E8]/10 hover:bg-[#4F75E8]/20 border-0"
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        <span className="text-lg text-[#4F75E8]">-</span>
      </Button>
      <span className="w-8 text-center text-sm">{value}</span>
      <Button
        type="button"
        size="icon"
        className="h-8 w-8 rounded-full bg-[#4F75E8]/10 hover:bg-[#4F75E8]/20 border-0"
        onClick={() => onChange(Math.min(999, value + 1))}
      >
        <span className="text-lg text-[#4F75E8]">+</span>
      </Button>
    </div>
  )

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl bg-gradient-to-b bg-blue-50 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Audience Filtering Options</DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-8">
          {/* Skip Inactive Contacts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Skip Inactive Contacts</h3>
            <div className="flex items-start space-x-3">
              <Checkbox variant="blue"
                checked={filters.skipInactiveContacts.enabled}
                onCheckedChange={(checked) =>
                  setFilters((prev) => ({
                    ...prev,
                    skipInactiveContacts: { ...prev.skipInactiveContacts, enabled: checked as boolean }
                  }))
                }
                className="mt-1"
              />
              <div className="flex-1">
                <Label className="text-gray-600">
                  Skip contacts who haven&apos;t engaged with WhatsApp in the last:
                </Label>
                <div className="flex items-center space-x-2 mt-2">
                  <NumberInput
                    value={filters.skipInactiveContacts.days}
                    onChange={(val) =>
                      setFilters((prev) => ({
                        ...prev,
                        skipInactiveContacts: { ...prev.skipInactiveContacts, days: val }
                      }))
                    }
                  />
                  <span className="text-gray-600">days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Limit Marketing Messages */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Limit Marketing Messages</h3>
            <div className="flex items-start space-x-3">
            <Checkbox
                variant="blue"
                checked={filters.limitMarketingMessages.enabled}
                onCheckedChange={(checked) =>
                  setFilters((prev) => ({
                    ...prev,
                    limitMarketingMessages: { ...prev.limitMarketingMessages, enabled: checked as boolean }
                  }))
                }
                className="mt-1"
              />
              <div className="flex-1">
                <Label className="text-gray-600">Skip contacts who have already received:</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <NumberInput
                    value={filters.limitMarketingMessages.maxMessages}
                    onChange={(val) =>
                      setFilters((prev) => ({
                        ...prev,
                        limitMarketingMessages: { ...prev.limitMarketingMessages, maxMessages: val }
                      }))
                    }
                  />
                  <span className="text-gray-600">messages in the last</span>
                  <NumberInput
                    value={filters.limitMarketingMessages.timeRange}
                    onChange={(val) =>
                      setFilters((prev) => ({
                        ...prev,
                        limitMarketingMessages: { ...prev.limitMarketingMessages, timeRange: val }
                      }))
                    }
                  />
                  <Select
                    value={filters.limitMarketingMessages.timeUnit}
                    onValueChange={(val) =>
                      setFilters((prev) => ({
                        ...prev,
                        limitMarketingMessages: { ...prev.limitMarketingMessages, timeUnit: val }
                      }))
                    }
                  >
                    <SelectTrigger className="w-[110px] bg-[#EEF2FF] border-0 rounded-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minutes">minutes</SelectItem>
                      <SelectItem value="hours">hours</SelectItem>
                      <SelectItem value="days">days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Avoid Duplicate Contacts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Avoid Duplicate Contacts</h3>
            <div className="flex items-center space-x-3">
              <Checkbox variant="blue"
                checked={filters.avoidDuplicateContacts.enabled}
                onCheckedChange={(checked) =>
                  setFilters((prev) => ({
                    ...prev,
                    avoidDuplicateContacts: { ...prev.avoidDuplicateContacts, enabled: checked as boolean }
                  }))
                }
              />
              <Label className="text-gray-600">Skip if duplicate contacts are found.</Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-full px-8">
              Exit
            </Button>
          </DialogTrigger>
          <Button className="bg-blue-500 hover:bg-blue-600 rounded-full px-8">Proceed</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
