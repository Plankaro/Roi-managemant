/* eslint-disable @typescript-eslint/no-explicit-any */
import { BroadcastDetailResult } from "@/zod/broadcast/broadcast";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatScheduledDate(broadcast:BroadcastDetailResult) {
  if (broadcast.isScheduled && broadcast.scheduledDate) {
    const scheduledDate = new Date(broadcast.scheduledDate);
    return `${scheduledDate.toLocaleDateString()}, ${scheduledDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }
}

export function calculateTotalPrice(orders:any) {
  return orders.reduce((total:any, order:any) => total + parseFloat(order.amount), 0);
}
