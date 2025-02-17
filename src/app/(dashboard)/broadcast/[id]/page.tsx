import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/components/ui/button";
function BroadcastId() {
  const status = [
    { label: "Total Revenue", value: "₹641.00" },
    { label: "Expense", value: "₹641.00" },
    { label: "Orders", value: "641" },
    { label: "ROI", value: "₹641.00" },
    { label: "Link Clicks", value: "12" },
    { label: "Button Clicks", value: "12" },
    { label: "Conversions", value: "12" },
    { label: "Replies", value: "12" },
  ];
  return (
    <ScrollArea className="">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-white">
          Broadcast- All Product of the month
        </h1>
        <div className="flex gap-2">
          <Button
            variant={"outline"}
            className="border-blue-500 border-2 bg-transparent text-white"
          >
            Exit
          </Button>
          <Button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition-colors">
            Download Report
          </Button>
        </div>
      </div>
      <div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
        {status.map((metric, index) => (
          <Card key={index} className="bg-[#0D0B26] border-[#1E1B2C]">
            <CardContent className="p-4">
              <p className="text-sm text-gray-400">{metric.label}</p>
              <p className="text-lg font-semibold mt-1 text-white">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
        <div className="flex h-full w-full items-center justify-center">
          <div className="grid h-full w-full gap-4 bg-gray-200 p-2 grid-cols-8 grid-rows-8 rounded-lg shadow-md">
            <div className="col-span-3 row-span-4 bg-pink-200 rounded-lg shadow-md flex items-center justify-center">
              <p>Salmon</p>
            </div>

            <div className="col-span-2 row-span-3 bg-lime-200 rounded-lg shadow-md flex items-center justify-center">
              <p>Broccoli</p>
            </div>

            <div className="col-span-3 row-span-3 bg-yellow-200 rounded-lg shadow-md flex items-center justify-center">
              <p>Tamago</p>
            </div>

            <div className="col-span-5 row-span-5 bg-tan-200 rounded-lg shadow-md flex items-center justify-center">
              <p>Pork</p>
            </div>

            <div className="col-span-3 row-span-5 bg-green-200 rounded-lg shadow-md flex items-center justify-center">
              <p>Edamame</p>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

export default BroadcastId;
