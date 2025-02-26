/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion, AnimatePresence } from "framer-motion"
import { z } from "zod"
import { formSchema, Templateschema } from "@/zod/broadcast/form"
import { ReactNode } from "react"
import SelectedPreview from "./selectTemplatepreview"
import {  format } from 'date-fns';


interface BroadcastPopupProps {
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    selectedTemplate: z.infer<typeof Templateschema>;
    form: any;
  }

function BroadcastPopup({ children,open,onOpenChange,selectedTemplate,form }: BroadcastPopupProps) {
  const formData = form.getValues();
  function mergeDateTime(dateStr: string, timeStr: string): string {
    const parsedDate = new Date(dateStr); // Convert date string to Date object

    // Extract hours and minutes from time string
    const matches = timeStr.match(/\d+/g);
    if (!matches) {
      throw new Error("Invalid time format");
    }
    const [hours, minutes] = matches.map(Number);
    const isPM = timeStr.includes("PM");

    // Adjust for 12-hour format
    parsedDate.setHours(
      isPM && hours !== 12 ? hours + 12 : !isPM && hours === 12 ? 0 : hours,
      minutes,
      0
    );

    // Format final datetime string
    return format(parsedDate, "yyyy-MM-dd HH:mm:ssXXX");
  }

  console.log(formData);
 
  const dateToBroadcast = formData?.schedule?.schedule
  ? mergeDateTime(`${formData.schedule.date}`, `${formData.schedule.time || '00:00'}`)
  : new Date();

  async function onConfirm() {
    await form.trigger()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[900px] rounded-lg p-0 ld:h-auto h-[80vh] overflow-scroll no-scrollbar max-w-[90vw]">
        <div className="bg-[#ECF0F7]  w-full p-4 sm:p-5 space-y-4">
          {/* Estimated Spend Header */}
          <div className="space-y-0.5 flex justify-between items-center mr-7">
            <h2 className="md:text-lg sm:text-base text-sm font-semibold text-gray-900">Estimated Spend</h2>
            
             
              <span className="md:text-xl flex gap-4 sm:text-lg font-bold text-gray-900"><span>₹</span>5000</span>
          
          </div>

          <Separator className="bg-gray-200" />

          {/* Main Content */}
          <div className="space-y-4 lg:flex gap-10 lg:space-y-0 lg:space-x-4">
            {/* Information Panel */}
            <div className="space-y-3 lg:w-3/5">
              <h2 className="text-base font-semibold text-gray-900">Information</h2>

              <div className="space-y-2 text-sm">
                {[
                  { label: "Broadcast Name", value: formData.name||"" },
               
                  { label: "Broadcast launch time", value: format(new Date(dateToBroadcast), "dd/MM/yy hh:mm a") || "" },
                  { label: "Recipients", value: "22 contacts" },
                  { label: "Action on limit reached", value: formData.onlimitexced },
                  { label: "Reply Action", value: "Transfer Bot" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-500 sm:text-base text-sm basis-1/2">{item.label}</span>
                    <span className="text-gray-900 sm:text-base text-sm basis-1/2">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview Panel */}
            <div className="lg:w-2/5">
              {/* Preview Panel (hidden on md screens and below) */}
              <div className="hidden lg:block space-y-3">
                <h2 className="text-base font-semibold text-gray-900">Template used</h2>
                <SelectedPreview selectedTemplate={selectedTemplate} />
              </div>

              {/* Collapsible Preview for md screens and below */}
              <div className="lg:hidden">
                <Accordion type="single" collapsible>
                  <AccordionItem value="preview">
                    <AccordionTrigger>Template used</AccordionTrigger>
                    <AccordionContent>
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <SelectedPreview selectedTemplate={selectedTemplate} />
                        </motion.div>
                      </AnimatePresence>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" className="h-8 px-4 text-sm">
              Exit
            </Button>
            <Button className="h-8 px-4 text-sm bg-blue-600 hover:bg-blue-700" onClick={onConfirm} type="submit">Confirm</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}



export default BroadcastPopup

