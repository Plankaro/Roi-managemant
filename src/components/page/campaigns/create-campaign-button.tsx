"use client";

import { Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

interface CreateCampaignButtonProps {
  className?: string;
}

export function CreateCampaignButton({ className }: CreateCampaignButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild className="">
        <Button
          className={`bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 rounded-full px-4 ${className}`}
        >
          <Plus className="h-4 w-4" />
          Create New Campaign
          <ChevronDown
            className={`h-4 w-4 ml-1 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </Button>
      </DropdownMenuTrigger>
      <AnimatePresence>
        {open && (
          <DropdownMenuContent
            asChild
            align="end"
            className="w-56 p-0 border-0 overflow-hidden"
            forceMount
          >
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.9 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-blue-500 text-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="bg-blue-600 px-4 py-2 font-medium text-sm border-b border-blue-600">
                Select Triggers
              </div>
              <div className="py-1 bg-blue-500">
                <Link href="/campaigns/order-created">
                  <DropdownMenuItem className="px-4 py-2 text-white hover:bg-blue-900 focus:bg-blue-900 focus:text-white">
                    Order Created
                  </DropdownMenuItem>
                </Link>
                <Link href="/campaigns/order-updated">
                  <DropdownMenuItem className="px-4 py-2 text-white hover:bg-blue-900 focus:bg-blue-900 focus:text-white">
                    Order Updated
                  </DropdownMenuItem>
                </Link>
                <Link href="/campaigns/checkout-created">
                  <DropdownMenuItem className="px-4 py-2 text-white hover:bg-blue-900 focus:bg-blue-900 focus:text-white">
                    Checkout Created
                  </DropdownMenuItem>
                </Link>
                <Link href="/campaigns/order-tag-added">
                  <DropdownMenuItem className="px-4 py-2 text-white hover:bg-blue-900 focus:bg-blue-900 focus:text-white">
                    Order Tag Added
                  </DropdownMenuItem>
                </Link>
                <Link href="/campaigns/order-cancelled">
                  <DropdownMenuItem className="px-4 py-2 text-white hover:bg-blue-900 focus:bg-blue-900 focus:text-white">
                    Order Cancelled
                  </DropdownMenuItem>
                </Link>
                <Link href="/campaigns/order-cancelled">
                  <DropdownMenuItem className="px-4 py-2 text-white hover:bg-blue-900 focus:bg-blue-900 focus:text-white">
                    Order Cancelled
                  </DropdownMenuItem>
                </Link>
                <Link href="/campaigns/fullfilment-create">
                  <DropdownMenuItem className="px-4 py-2 text-white hover:bg-blue-900 focus:bg-blue-900 focus:text-white">
                    Fulfilment Created
                  </DropdownMenuItem>
                </Link>
                <Link href="/campaigns/fullfilment-update">
                  <DropdownMenuItem className="px-4 py-2 text-white hover:bg-blue-900 focus:bg-blue-900 focus:text-white">
                    Fulfilment Update
                  </DropdownMenuItem>
                </Link>
              </div>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}
