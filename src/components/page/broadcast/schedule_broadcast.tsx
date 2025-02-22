/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { TimePicker } from "@/components/ui/time-picker";
import { Checkbox } from "@/components/ui/checkbox";
import z from "zod";
import { scheduleSchema } from "@/zod/broadcast/form";function ScheduleBroadcast({
  schedule,
  setSchedule,
}: {
  schedule: z.infer<typeof scheduleSchema>;
  setSchedule: React.Dispatch<React.SetStateAction<z.infer<typeof scheduleSchema>>>;
}) {
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const handleDateChange = (selectedDate: any) => {
    if (!selectedDate) return; // Prevent errors on null/undefined selection

    setSchedule((prev) => ({
      ...prev,
      date: selectedDate, // Ensure we're updating the correct key
    }));

    // Automatically open time picker if today's date is selected
    if (selectedDate.toDateString() === new Date().toDateString()) {
      setSchedule((prev) => ({
        ...prev,
        time: format(new Date(), "hh:mm a"), // Set current time
      }));
    }

    setIsTimePickerOpen(true);
  };

  const handleTimeChange = (selectedTime: string) => {
    setSchedule((prev) => ({
      ...prev,
      time: selectedTime, // Ensure time is updated properly
    }));
    setIsTimePickerOpen(false);
  };

  const isToday = schedule.date.toDateString() === new Date().toDateString();

  return (
    <div className="text-lg">
      <Checkbox
        variant="white"
        className="border-white mr-3"
        checked={schedule.schedule}
        onCheckedChange={() =>
          setSchedule((prev) => ({ ...prev, schedule: !prev.schedule }))
        }
      />
      Schedule broadcast
      <div className="">
        <Label className="text-sm font-medium">Date & Time (IST)</Label>
        <div className="flex gap-2 mt-1.5">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal bg-transparent text-white min-w-72",
                  !schedule.date && "text-muted-foreground"
                )}
                disabled={!schedule.schedule}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {schedule.date
                  ? format(schedule.date, "MMM dd, yyyy")
                  : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-none" align="start">
              <Calendar
                mode="single"
                selected={schedule.date}
                onSelect={handleDateChange} // Directly pass the function
                initialFocus
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />
            </PopoverContent>
          </Popover>

          <Popover open={isTimePickerOpen} onOpenChange={setIsTimePickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal bg-transparent text-white min-w-72",
                  !schedule.date && "text-muted-foreground"
                )}
                disabled={!schedule.schedule}
              >
                <Clock className="mr-2 h-4 w-4" />
                {schedule.time}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-[#4064AC] border-none shadow-lg"
              align="start"
            >
              <TimePicker
                value={schedule.time}
                onChange={handleTimeChange}
                onCancel={() => setIsTimePickerOpen(false)}
                onOk={() => setIsTimePickerOpen(false)}
                disabled={!schedule.date}
                minTime={isToday ? new Date() : undefined}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default ScheduleBroadcast;
