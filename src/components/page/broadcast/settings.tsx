"use client"

import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Minus, Plus, HelpCircle } from "lucide-react"

const Settings = () => {
  const [inactiveDays, setInactiveDays] = React.useState(15)
  const [marketingMessages, setMarketingMessages] = React.useState(2)
  const [marketingHours, setMarketingHours] = React.useState(24)

  return (
    <ScrollArea className="h-[650px] flex-1 no-scrollbar overflow-scroll bg-blue-50 rounded-3xl">
      <div className="p-8 space-y-8">
        {/* Select Reply Action */}
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <h2 className="text-lg font-medium">Select reply action</h2>
            <span className="text-red-500">*</span>
          </div>
          <p className="text-sm text-gray-600">
            Auto-reply bot for responses. If the user replies within 72 hours of getting the message.
          </p>
          <Select defaultValue="transfer">
            <SelectTrigger className="bg-white border-gray-200">
              <SelectValue placeholder="Transfer Bot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="transfer">Transfer Bot</SelectItem>
              <SelectItem value="auto">Auto Reply</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Audience Filtering Options */}
        <div className="space-y-6">
          <h2 className="text-lg font-medium">Audience Filtering Options</h2>

          {/* Skip Inactive Contacts */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-medium">Skip Inactive Contacts</h3>
              <div className="flex items-center gap-2">
                <Checkbox id="skip-inactive" />
                <Label htmlFor="skip-inactive" className="text-sm">
                  Skip contacts who haven&apos;t engaged with WhatsApp in the last:
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setInactiveDays(Math.max(0, inactiveDays - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{inactiveDays}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setInactiveDays(inactiveDays + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span>days</span>
                </div>
              </div>
            </div>

            {/* Limit Marketing Messages */}
            <div className="space-y-2">
              <h3 className="text-base font-medium">Limit Marketing Messages</h3>
              <div className="flex items-center gap-2">
                <Checkbox id="limit-marketing" />
                <Label htmlFor="limit-marketing" className="text-sm">
                  Skip contacts who have already received:
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setMarketingMessages(Math.max(0, marketingMessages - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{marketingMessages}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setMarketingMessages(marketingMessages + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span>messages in the last</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setMarketingHours(Math.max(0, marketingHours - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{marketingHours}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setMarketingHours(marketingHours + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span>hours</span>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Avoid Duplicate Contacts */}
            <div className="space-y-2">
              <h3 className="text-base font-medium">Avoid Duplicate Contacts</h3>
              <div className="flex items-center gap-2">
                <Checkbox id="avoid-duplicates" />
                <Label htmlFor="avoid-duplicates" className="text-sm">
                  Skip if duplicate contacts are found.
                </Label>
              </div>
            </div>
          </div>

          {/* UTM Parameters */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">UTM Parameters</h2>
            <p className="text-sm text-gray-600">
              Link in this broadcast will include additional tracking information called UTM parameters. This allows
              source tracking within third party reporting tools such as Google Analytics
            </p>

            <div className="space-y-2">
              <h3 className="text-base font-medium">Preview</h3>
              <div className="p-3 bg-gray-100 rounded text-sm text-gray-600">{"{your_link}"}</div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="utm-source" />
                  <Label htmlFor="utm-source" className="text-sm">
                    UTM source (The referrer- eg: Google, Newsletter)
                  </Label>
                </div>
                <Input placeholder="ROI Magnet" className="bg-white" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="utm-medium" />
                  <Label htmlFor="utm-medium" className="text-sm">
                    UTM medium (Marketing medium- eg: cpc, banner, email)
                  </Label>
                </div>
                <Input placeholder="Whatsapp" className="bg-white" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="utm-campaign" />
                  <Label htmlFor="utm-campaign" className="text-sm">
                    UTM campaign name (Product, promo code or slogan- eg: spring_sale)
                  </Label>
                </div>
                <Input placeholder="ABC Broadcast" className="bg-white" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="utm-id" />
                  <Label htmlFor="utm-id" className="text-sm">
                    UTM ID (The ads campaign ID)
                  </Label>
                </div>
                <Input placeholder="Campaign ID" className="bg-white" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="utm-term" />
                  <Label htmlFor="utm-term" className="text-sm">
                    UTM term (Identify the paid keywords)
                  </Label>
                </div>
                <Input placeholder="Keywords" className="bg-white" />
              </div>
            </div>
          </div>

          {/* Messaging Limit */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Messaging Limit</h2>
            <div className="space-y-2">
              <h3 className="text-base font-medium">What to do when the messaging limit exceeds?</h3>
              <RadioGroup defaultValue="pause" className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pause" id="pause" />
                  <Label htmlFor="pause">Pause Broadcast (recommended)</Label>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm text-gray-600 ml-6">
                    The broadcast will automatically continue as soon as the limit is available.
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="skip" id="skip" />
                  <Label htmlFor="skip">Skip messaging limit check and try sending to all.</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

export default Settings

