import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "@radix-ui/react-label";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AudienceFilteringDialog({children}: {children: React.ReactNode}) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Audience Filtering Options</DialogTitle>
          </DialogHeader>
  
          <div className="mt-6 space-y-8">
            {/* Skip Inactive Contacts */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Skip Inactive Contacts</h3>
              <div className="flex items-start space-x-3">
                <Checkbox id="skip_inactive" defaultChecked />
                <div className="flex-1 space-y-1">
                  <Label htmlFor="skip_inactive" className="text-base">
                    Skip contacts who haven't engaged with WhatsApp in the last:
                  </Label>
                  <div className="flex items-center space-x-2">
                    <NumberInput value={15} onChange={() => {}} />
                    <span className="text-gray-600">days</span>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Limit Marketing Messages */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Limit Marketing Messages</h3>
              <div className="flex items-start space-x-3">
                <Checkbox id="limit_messages" />
                <div className="flex-1 space-y-1">
                  <Label htmlFor="limit_messages" className="text-base">
                    Skip contacts who have already received:
                  </Label>
                  <div className="flex items-center space-x-2">
                    <NumberInput value={2} onChange={() => {}} />
                    <span className="text-gray-600">messages in the last</span>
                    <NumberInput value={24} onChange={() => {}} />
                    <span className="text-gray-600">hours</span>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Avoid Duplicate Contacts */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Avoid Duplicate Contacts</h3>
              <div className="flex items-start space-x-3">
                <Checkbox id="avoid_duplicates" />
                <div className="space-y-1">
                  <Label htmlFor="avoid_duplicates" className="text-base">
                    Skip if duplicate contacts are found.
                  </Label>
                </div>
              </div>
            </div>
          </div>
  
          <div className="flex justify-end gap-3 mt-6">
            <DialogTrigger asChild>
              <Button variant="outline">Exit</Button>
            </DialogTrigger>
            <Button>Proceed</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  function NumberInput({ value, onChange, min = 1, max = 999 }: { value: number; onChange: (value: number) => void; min?: number; max?: number }) {
    return (
      <div className="flex items-center space-x-1">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          <span className="text-lg">-</span>
        </Button>
        <Input
          type="number"
          value={value}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            if (!isNaN(newValue) && newValue >= min && newValue <= max) {
              onChange(newValue);
            }
          }}
          className="w-16 h-8 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          <span className="text-lg">+</span>
        </Button>
      </div>
    );
  }
  