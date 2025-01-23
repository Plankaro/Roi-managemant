import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const RecipientContents = () => {
  return (

      <ScrollArea className="h-[550px]">
        <div className="p-8 space-y-8">
          {/* Select Reply Action */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <h2 className="text-lg font-medium text-white">Select reply action</h2>
              <span className="text-red-500">*</span>
            </div>
            <p className="text-sm text-gray-400">
              Auto-reply bot for responses. If the user replies within 72 hours of getting the message.
            </p>
            <Select defaultValue="transfer">
              <SelectTrigger className="bg-white/5 border-gray-800 text-white">
                <SelectValue placeholder="Transfer Bot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transfer">Transfer Bot</SelectItem>
                <SelectItem value="auto">Auto Reply</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Smart Audience Filtering */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-white">Smart Audience Filtering</h2>

            <div className="space-y-4">
              {/* Dead Audience Filtering */}
              <div className="space-y-2">
                <h3 className="text-base font-medium text-white">Dead Audience Filtering</h3>
                <p className="text-sm text-gray-400">
                  Skip the audience if the contact has not engaged with your WhatsApp number for the last 15 days.
                </p>
              </div>

              {/* Marketing Message Frequency Control */}
              <div className="space-y-2">
                <h3 className="text-base font-medium text-white">Marketing Message Frequency Control</h3>
                <p className="text-sm text-gray-400">
                  Skip recipients if the contact has already received 2 marketing messages in the last 24 hours.
                </p>
              </div>

              {/* Duplicate Filtering */}
              <div className="space-y-2">
                <h3 className="text-base font-medium text-white">Duplicate Filtering</h3>
                <p className="text-sm text-gray-400">
                  Skip recipient if a duplicate contact has been found.
                </p>
              </div>
            </div>
          </div>

          {/* Messaging Limit */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-white">Messaging Limit</h2>
            <div className="space-y-2">
              <h3 className="text-base font-medium text-white">What to do when the messaging limit exceeds?</h3>
              <RadioGroup defaultValue="pause" className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pause" id="pause" className="border-gray-600" />
                  <Label htmlFor="pause" className="text-gray-400">
                    Pause Broadcast (recommended)
                  </Label>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm text-gray-400 ml-6">
                    The broadcast will automatically continue as soon as the limit is available.
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="skip" id="skip" className="border-gray-600" />
                  <Label htmlFor="skip" className="text-gray-400">
                    Skip messaging limit check and try sending to all.
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </ScrollArea>

  );
};

export default RecipientContents;
