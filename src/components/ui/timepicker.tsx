"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface TimePickerProps {
  minTime?: string // Format: "HH:mm"
  onChange?: (time: string) => void
  className?: string
}

export default function TimePicker({ minTime = "00:00", onChange, className }: TimePickerProps) {
  // "Raw" state lets the user edit freely.
  const [rawHour, setRawHour] = React.useState("12")
  const [rawMinute, setRawMinute] = React.useState("00")
  const [period, setPeriod] = React.useState<"AM" | "PM">("AM")
  const [isOpen, setIsOpen] = React.useState(false)

  const [minHour, minMinute] = minTime.split(":").map(Number)

  // Disable if the chosen time is earlier than minTime.
  const isDisabled = (h: number, m: number, p: "AM" | "PM") => {
    const hour24 = p === "AM" ? (h === 12 ? 0 : h) : h === 12 ? 12 : h + 12
    if (hour24 < minHour) return true
    if (hour24 === minHour && m < minMinute) return true
    return false
  }

  // Allow free editing (up to 2 digits).
  const handleHourChange = (value: string) => {
    // Only allow up to 2 digits.
    if (!/^\d{0,2}$/.test(value)) return;
  
    // Allow empty value for editing.
    if (value === "") {
      setRawHour(value);
      return;
    }
  
    // If it's one digit, allow it (even "0" temporarily if you want to allow correction).
    if (value.length === 1) {
      setRawHour(value);
      return;
    }
  
    // When two digits are present, validate it.
    const num = Number(value);
    if (num < 1 || num > 12) return; // Do not update if invalid.
    setRawHour(value);
  }
  
  const handleMinuteChange = (value: string) => {
    if (!/^\d{0,2}$/.test(value)) return;
  
    if (value === "") {
      setRawMinute(value);
      return;
    }
  
    if (value.length === 1) {
      setRawMinute(value);
      return;
    }
  
    const num = Number(value);
    if (num < 0 || num > 59) return; // Do not update if invalid.
    setRawMinute(value);
  }
  // On blur, validate and auto-correct.
  const handleHourBlur = () => {
    let num = Number(rawHour)
    if (rawHour === "" || isNaN(num)) {
      // If cleared, default to "12"
      setRawHour("12")
      return
    }
    if (num > 12) num = 12
    if (num < 1) num = 12
    setRawHour(num.toString().padStart(2, "0"))
  }

  const handleMinuteBlur = () => {
    let num = Number(rawMinute)
    if (rawMinute === "" || isNaN(num)) {
      // If cleared, default to "00"
      setRawMinute("00")
      return
    }
    if (num > 59) num = 59
    if (num < 0) num = 0
    setRawMinute(num.toString().padStart(2, "0"))
  }

  // Allow arrow keys to adjust values.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, type: "hour" | "minute") => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault()
      const isUp = e.key === "ArrowUp"
      if (type === "hour") {
        let num = rawHour === "" ? 0 : Number(rawHour)
        num = num + (isUp ? 1 : -1)
        if (num > 12) num = 12
        if (num < 1) num = 1
        setRawHour(num.toString().padStart(2, "0"))
      } else if (type === "minute") {
        let num = rawMinute === "" ? 0 : Number(rawMinute)
        num = num + (isUp ? 1 : -1)
        if (num > 59) num = 59
        if (num < 0) num = 0
        setRawMinute(num.toString().padStart(2, "0"))
      }
    }
  }

  const handleOk = () => {
    // Force validation on blur.
    handleHourBlur()
    handleMinuteBlur()

    const h = Number(rawHour)
    const m = Number(rawMinute)

    if (isDisabled(h, m, period)) {
      // Reset to minTime if the selected time is too early.
      const minHour12 = minHour === 0 ? 12 : minHour > 12 ? minHour - 12 : minHour
      setRawHour(minHour12.toString().padStart(2, "0"))
      setRawMinute(minMinute.toString().padStart(2, "0"))
      setPeriod(minHour >= 12 ? "PM" : "AM")
      return
    }

    onChange?.(`${rawHour.padStart(2, "0")}:${rawMinute.padStart(2, "0")} ${period}`)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Input
        type="text"
        value={`${rawHour.padStart(2, "0")}:${rawMinute.padStart(2, "0")} ${period}`}
        readOnly
        onClick={() => setIsOpen(true)}
        className={className}
      />

      {isOpen && (
        <div className="absolute top-full mt-2 bg-[#4B6BFB] rounded-[6px] p-4 w-[240px] shadow-lg z-50">
          <div className="flex items-start gap-1 mb-8">
            <div className="flex-1">
              <div className="text-center">
                <label className="block text-[11px] text-white/70 mb-1">Hour</label>
                <Input
                  type="text"
                  value={rawHour}
                  onChange={(e) => handleHourChange(e.target.value)}
                  onBlur={handleHourBlur}
                  onKeyDown={(e) => handleKeyDown(e, "hour")}
                  className="h-8 w-full text-center bg-white/10 border-white/20 text-white text-lg rounded-[4px]"
                />
              </div>
            </div>
            <div className="text-2xl text-white mt-4 mx-0.5">:</div>
            <div className="flex-1">
              <div className="text-center">
                <label className="block text-[11px] text-white/70 mb-1">Minute</label>
                <Input
                  type="text"
                  value={rawMinute}
                  onChange={(e) => handleMinuteChange(e.target.value)}
                  onBlur={handleMinuteBlur}
                  onKeyDown={(e) => handleKeyDown(e, "minute")}
                  className="h-8 w-full text-center bg-white/10 border-white/20 text-white text-lg rounded-[4px]"
                />
              </div>
            </div>
            <div className="ml-2 flex flex-col gap-1 mt-4">
              <Button
                variant="ghost"
                onClick={() => setPeriod("AM")}
                className={cn(
                  "h-6 px-2 min-w-[40px] text-sm rounded-[4px]",
                  period === "AM" ? "bg-white text-[#4B6BFB]" : "bg-white/10 text-white hover:bg-white/20"
                )}
              >
                AM
              </Button>
              <Button
                variant="ghost"
                onClick={() => setPeriod("PM")}
                className={cn(
                  "h-6 px-2 min-w-[40px] text-sm rounded-[4px]",
                  period === "PM" ? "bg-white text-[#4B6BFB]" : "bg-white/10 text-white hover:bg-white/20"
                )}
              >
                PM
              </Button>
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="h-8 px-3 text-sm text-white hover:bg-white/10 rounded-[4px]"
            >
              CANCEL
            </Button>
            <Button
              variant="ghost"
              onClick={handleOk}
              className={cn(
                "h-8 px-3 text-sm text-white hover:bg-white/10 rounded-[4px]",
                isDisabled(Number(rawHour), Number(rawMinute), period) && "opacity-50 cursor-not-allowed"
              )}
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
