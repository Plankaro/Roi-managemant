import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  onCancel: () => void;
  onOk: () => void;
  disabled?: boolean;
  minTime?: Date;
}

export function TimePicker({ value, onChange, onCancel, onOk, disabled = false, minTime }: TimePickerProps) {
  const [hour, setHour] = React.useState(() => {
    const [h] = value.split(":");
    return parseInt(h) || 12;
  });
  const [minute, setMinute] = React.useState(() => {
    const [, m] = value.split(":");
    return parseInt(m) || 0;
  });
  const [period, setPeriod] = React.useState<"AM" | "PM">(() => {
    return value.includes("PM") ? "PM" : "AM";
  });

  const isTimeDisabled = (h: number, m: number, p: "AM" | "PM") => {
    if (!minTime) return false;
    
    let hour24 = h;
    if (p === "PM" && h !== 12) hour24 += 12;
    if (p === "AM" && h === 12) hour24 = 0;
    
    const currentTime = new Date(minTime);
    const selectedTime = new Date(minTime);
    selectedTime.setHours(hour24, m, 0, 0);
    
    return selectedTime < currentTime;
  };

  const handleHourChange = (newHour: string) => {
    if (disabled) return;
    const hourNum = parseInt(newHour);
    
    if (!isTimeDisabled(hourNum, minute, period)) {
      setHour(hourNum);
      const timeString = `${String(hourNum).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${period}`;
      onChange(timeString);
    }
  };

  const handleMinuteChange = (newMinute: string) => {
    if (disabled) return;
    const minuteNum = parseInt(newMinute);
    
    if (!isTimeDisabled(hour, minuteNum, period)) {
      setMinute(minuteNum);
      const timeString = `${String(hour).padStart(2, "0")}:${String(minuteNum).padStart(2, "0")} ${period}`;
      onChange(timeString);
    }
  };

  const handlePeriodChange = (newPeriod: "AM" | "PM") => {
    if (disabled) return;
    if (!isTimeDisabled(hour, minute, newPeriod)) {
      setPeriod(newPeriod);
      const timeString = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${newPeriod}`;
      onChange(timeString);
    }
  };

  return (
    <div className={cn(
      "w-[280px] bg-transparent text-white p-6 rounded-lg",
      disabled && "opacity-50"
    )}>
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="flex flex-col items-center gap-1">
          <Select
            value={hour.toString()}
            onValueChange={handleHourChange}
            disabled={disabled}
          >
            <SelectTrigger 
              className={cn(
                "w-[65px] bg-[#7F97C7] border-none focus:ring-offset-0 focus:ring-0 text-white",
                disabled && "text-gray-400 bg-opacity-50"
              )}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-none text-white">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                <SelectItem
                  key={h}
                  value={h.toString()}
                  className={cn(
                    " text-blue-500 bg-white",
                    isTimeDisabled(h, minute, period) && "text-gray-400 pointer-events-none"
                  )}
                >
                  {h.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-xs">Hour</span>
        </div>

        <div className="text-2xl font-light mt-[-8px]">:</div>

        <div className="flex flex-col items-center gap-1">
          <Select
            value={minute.toString()}
            onValueChange={handleMinuteChange}
            disabled={disabled}
          >
            <SelectTrigger 
              className={cn(
                "w-[65px] bg-[#7F97C7] border-none focus:ring-offset-0 focus:ring-0 text-white",
                disabled && "text-gray-400 bg-opacity-50"
              )}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className=" border-none text-white">
              {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                <SelectItem
                  key={m}
                  value={m.toString()}
                  className={cn(
                    "text-blue-500 bg-white",
                    isTimeDisabled(hour, m, period) && "text-gray-400 pointer-events-none"
                  )}
                >
                  {m.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-xs">Minute</span>
        </div>

        <div className="flex flex-col items-center gap-1 ml-2 mt-[-8px]">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handlePeriodChange("AM")}
              className={cn(
                "w-[65px] h-[35px] text-sm rounded transition-colors",
                period === "AM" 
                  ? "bg-[#7F97C7] text-white" 
                  : "text-white hover:bg-[#7F97C7]/50",
                disabled && "text-gray-400 bg-opacity-50 pointer-events-none",
                isTimeDisabled(hour, minute, "AM") && "text-gray-400 pointer-events-none"
              )}
              disabled={disabled || isTimeDisabled(hour, minute, "AM")}
            >
              AM
            </button>
            <button
              onClick={() => handlePeriodChange("PM")}
              className={cn(
                "w-[65px] h-[35px] text-sm rounded transition-colors",
                period === "PM" 
                  ? "bg-[#7F97C7] text-white" 
                  : "text-white hover:bg-[#7F97C7]/50",
                disabled && "text-gray-400 bg-opacity-50 pointer-events-none",
                isTimeDisabled(hour, minute, "PM") && "text-gray-400 pointer-events-none"
              )}
              disabled={disabled || isTimeDisabled(hour, minute, "PM")}
            >
              PM
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between border-t border-[#7F97C7] pt-4">
        <button
          onClick={onCancel}
          className="text-sm font-medium hover:bg-[#7F97C7]/20 px-6 py-2 rounded transition-colors text-white"
          disabled={disabled}
        >
          CANCEL
        </button>
        <button
          onClick={onOk}
          className="text-sm font-medium hover:bg-[#7F97C7]/20 px-6 py-2 rounded transition-colors text-white"
          disabled={disabled}
        >
          OK
        </button>
      </div>
    </div>
  );
}