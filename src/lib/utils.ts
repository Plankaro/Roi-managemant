/* eslint-disable @typescript-eslint/no-explicit-any */
import { BroadcastDetailResult } from "@/zod/broadcast/broadcast";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as XLSX from 'xlsx';

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

export function exportJsonToExcel(data:any, sheetName = "Sheet1", fileName = "output.xlsx") {
  if (!Array.isArray(data) || data.length === 0) {
      console.error("Invalid data: Must be a non-empty array.");
      return;
  }

  const ws = XLSX.utils.json_to_sheet(data); // Convert JSON to worksheet
  const wb = XLSX.utils.book_new(); // Create a new workbook
  XLSX.utils.book_append_sheet(wb, ws, sheetName); // Add sheet to workbook
  XLSX.writeFile(wb, fileName); // Save the Excel file

  //console.log(`Excel file '${fileName}' has been created successfully.`);
}
