"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Bell, Podcast as Broadcast, ChevronDown, Layout, LineChart, LogOut, MessageSquare, PlusCircle, Search, Send, Settings, Users, Bot, Database } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const contacts = [
  {
    id: 1,
    name: "Grace Miller",
    phone: "+91 9873535637",
    message: "Lorem ipsum dolor sit amet, consectetur adipisc...",
    time: "2:46 pm",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    online: true,
  },
  {
    id: 2,
    name: "Jacob Math",
    phone: "+91 8765498768",
    message: "Lorem ipsum dolor sit amet, consectetur adip...",
    time: "2:46 pm",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    online: false,
  },
  // Add more contacts as needed
];

export const sidebarItems = [
  { icon: Layout, label: "Overview" },
  { icon: MessageSquare, label: "Chats", active: true },
  { icon: Broadcast, label: "Broadcast" },
  { icon: Bot, label: "AI Builder" },
  { icon: LineChart, label: "Analytics" },
  { icon: Database, label: "Data Integration" },
  { icon: Users, label: "Agents" },
];

const filters = [
  { label: "Conversation Status", icon: ChevronDown },
  { label: "Channels", icon: ChevronDown },
  { label: "Agents", icon: ChevronDown },
  { label: "Assigned Status", icon: ChevronDown },
  { label: "Read Status", icon: ChevronDown },
  { label: "Broadcast Campaigns", icon: ChevronDown },
  { label: "Drip Campaigns", icon: ChevronDown },
  { label: "Tags", icon: ChevronDown },
];

export default function Home() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);

  return (
    <div className="flex  bg-navy-900">

    </div>
  );
}