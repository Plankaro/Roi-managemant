"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import TemplateBuilder from "@/components/page/broadcast/templatedialog";
import SelectContactDialog from "@/components/page/broadcast/selectcontactDialog";


export default function BroadcastCampaign() {
  const  [templateSelectionDialog,setTemplateSelectionDialog] = useState(false)



 
  return (
    <ScrollArea className="  text-white p-4 h-[90vh] ">
      <div className=" mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold">Create Broadcast Campaign</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-transparent border-primary py-3 px-7"
            >
              Exit
            </Button>
            <Button className="bg-blue-500 py-3 px-7">
              Proceed
            </Button>
          </div>
        </header>

        <div className="space-y-8">
          <div className=" flex justify-between gap-10 items-center">
            <div className="basis-1/2 flex flex-col gap-5">
            <div className="space-y-4">
            <Label className="text-2xl ">
                  BroadCast Name
                </Label>
              <Input
                placeholder="Enter broadcast name"
                className="bg-transparent border-gray-600 text-white p-6 rounded-3xl"
              />
              </div>
              <div className="space-y-2 " >
                <Label className="text-2xl text-white">
                  Select Template <span className="text-red-500">*</span>
                </Label>
                <p className=" text-gray-400">
                  Select a template for broadcast messages
                </p>
                <Button
                 
                  className="bg-transparent bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => setTemplateSelectionDialog(true)}
                >
                  Select Template
                </Button>
                <TemplateBuilder open={templateSelectionDialog} setOpen={setTemplateSelectionDialog} />
              </div>
            </div>

            <div className="basis-1/2 flex flex-col gap-5">
              <div className="space-y-4">
              <Label className="text-2xl ">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="w-full bg-transparent border-gray-600 text-white p-6 rounded-3xl">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="category1">Category 1</SelectItem>
                    <SelectItem value="category2">Category 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 ">
                <Label className=" text-white text-2xl">
                  Recipients <span className="text-red-500">*</span>
                </Label>
                <p className=" text-gray-400">
                  You can upload an Excel sheet or select a Shopify segment.
                </p>
                <SelectContactDialog>
                <Button className="bg-blue-500 hover:bg-blue-500">
                  <Upload className="w-4 h-4 mr-2" /> Upload Recipients
                </Button>
                </SelectContactDialog>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl text-white">
              Add Content <span className="text-red-500">*</span>
            </h3>
         
            <div className="space-y-2">
              <Label className="text-sm">Image</Label>
              <p className=" text-gray-400">
                Upload an image under 5 MB with a recommended aspect ratio of
                1.91:1.
              </p>
              <Button className="bg-blue-500">
                <Upload className="w-4 h-4 mr-2" /> Upload Image
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Body</Label>
              <p className="text-xs text-gray-400\">
                Enter the &lt;span className=&quot;text-gray-400&quot;&gt;{1}
                &lt;/span&gt; parameter for your message.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">{`{1`}</span>
                  <Checkbox className="border-gray-600" />
                  <span className="text-sm text-gray-400">
                    From Shopify Segment
                  </span>
                </div>
                <Input
                  placeholder="Enter the parameter for {{1}}"
                  className="bg-transparent border-gray-600 text-white"
                />
                <Input
                  placeholder="Alternative for {{1}}"
                  className="bg-transparent border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">CTA Button</Label>
              <p className="text-xs text-gray-400">
                Enter the URL for the CTA Button
              </p>
              <Input
                placeholder="Enter the URL"
                className="bg-transparent border-gray-600 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-400">
              Select reply action <span className="text-red-500">*</span>
            </Label>
            <p className="text-xs text-gray-400">
              Auto-reply bot for responses. If the user replies within 72 hours
              of getting the message.
            </p>
            <Select>
              <SelectTrigger className="w-full bg-transparent border-gray-600 text-white">
                <SelectValue placeholder="Transfer Bot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transfer">Transfer Bot</SelectItem>
                <SelectItem value="auto-reply">Auto Reply</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">UTM Parameters</h3>
              <p className="text-xs text-gray-400">
                Link in this broadcast will include additional tracking
                information called UTM parameters. This allows source tracking
                within third party reporting tools such as Google Analytics
              </p>
              <Button className="bg-[#4B6BFB] hover:bg-[#4B6BFB]/90">
                + Add Parameters
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Audience Filtering Options
              </h3>
              <p className="text-xs text-gray-400">
                An advance audience filtering options for an effective
                broadcasting
              </p>
              <Button className="bg-[#4B6BFB] hover:bg-[#4B6BFB]/90">
                + Add Filter
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Messaging Limit</h3>
            <p className="text-sm">
              What to do when the messaging limit exceeds?
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="pause"
                  className="border-gray-600"
                  defaultChecked
                />
                <Label htmlFor="pause" className="text-sm">
                  Pause Broadcast (recommended)
                </Label>
              </div>
              <p className="text-xs text-gray-400 ml-6">
                The broadcast will pause automatically and resume when the limit
                resets.
              </p>

              <div className="flex items-center gap-2">
                <Checkbox id="skip" className="border-gray-600" />
                <Label htmlFor="skip" className="text-sm">
                  Skip messaging limit check and try sending to all.
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Schedule</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label className="text-sm">Frequency</Label>
                <Select>
                  <SelectTrigger className="w-full bg-transparent border-gray-600 text-white">
                    <SelectValue placeholder="Once" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">Once</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Date (IST)</Label>
                <Select>
                  <SelectTrigger className="w-full bg-transparent border-gray-600 text-white">
                    <SelectValue placeholder="Jan 24, 2025" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jan24">Jan 24, 2025</SelectItem>
                    <SelectItem value="jan25">Jan 25, 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Time</Label>
                <Select>
                  <SelectTrigger className="w-full bg-transparent border-gray-600 text-white">
                    <SelectValue placeholder="10:00 AM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10am">10:00 AM</SelectItem>
                    <SelectItem value="11am">11:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Run test message</h3>
            <div className="space-y-2">
              <Label className="text-sm">Enter the mobile number</Label>
              <Input
                placeholder="+91 9876543212"
                className="bg-transparent border-gray-600 text-white w-full md:w-72"
              />
            </div>
            <Button className="bg-[#4B6BFB] hover:bg-[#4B6BFB]/90">
              Send Text Message
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
