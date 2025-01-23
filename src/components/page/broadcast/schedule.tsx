import React from 'react'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
function Schedule() {
  return (
    <ScrollArea className="h-full">
    <div className="p-8 space-y-8">
      <div className="space-y-6">
        <h2 className="text-lg font-medium text-white">Schedule</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Frequency</label>
            <Select defaultValue="once">
              <SelectTrigger className="bg-white/5 border-gray-800 text-white">
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
            <label className="text-sm text-gray-400">Date & Time (IST)</label>
            <Input
              type="text"
              defaultValue="20/01/ 2015   10: 00 AM"
              className="bg-white/5 border-gray-800 text-white"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-white">Run test message</h2>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Enter the mobile number</label>
          <Input type="tel" defaultValue="+91 9876543212" className="bg-white/5 border-gray-800 text-white" />
        </div>
        <Button className="bg-[#4B6BFB] hover:bg-[#4B6BFB]/90 text-white">Send Message</Button>
      </div>
    </div>
  </ScrollArea>
  )
}

export default Schedule