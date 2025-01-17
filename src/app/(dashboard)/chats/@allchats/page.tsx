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

const AllChats = () => {
    const [selectedContact, setSelectedContact] = useState(contacts[0]);
    return (
        <div className="flex-1 flex flex-col bg-gradient-to-br from-navy-900 via-purple-900/20 to-red-900/20">
            {/* Header */}
            <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Avatar className="h-10 w-10">
                                <img
                                    src={selectedContact?.avatar}
                                    alt={selectedContact?.name}
                                    className="object-cover"
                                />
                            </Avatar>
                            {selectedContact?.online && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-navy-900" />
                            )}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">
                                {selectedContact?.name}
                            </h3>
                            <p className="text-sm text-gray-400">Active now</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-white"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-white"
                        >
                            <Bell className="h-5 w-5" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-400 hover:text-white"
                                >
                                    <ChevronDown className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Block Contact</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500">
                                    Delete Chat
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* <div className="mt-4">
            <ScrollArea className="" >
              <div className="flex gap-2 pb-2">
                {filters.map((filter) => (
                  <Button
                    key={filter.label}
                    variant="outline"
                    size="sm"
                    className="gap-2 whitespace-nowrap"
                  >
                    {filter.label}
                    <filter.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div> */}
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {/* Sample messages */}
                    <div className="flex items-start gap-3 max-w-xl ml-auto">
                        <div className="flex-1">
                            <div className="bg-blue-600 text-white p-3 rounded-lg">
                                <p>Hey Grace, how's it going?</p>
                            </div>
                            <span className="text-xs text-gray-400 mt-1 block">
                                10:30 AM
                            </span>
                        </div>
                        <Avatar className="h-8 w-8">
                            <img
                                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36"
                                alt="Sender"
                                className="object-cover"
                            />
                        </Avatar>
                    </div>

                    <div className="flex items-start gap-3 max-w-xl">
                        <Avatar className="h-8 w-8">
                            <img
                                src={selectedContact?.avatar}
                                alt={selectedContact?.name}
                                className="object-cover"
                            />
                        </Avatar>
                        <div className="flex-1">
                            <div className="bg-white/10 text-white p-3 rounded-lg">
                                <img
                                    src="https://images.unsplash.com/photo-1638716000957-e0e0e32d2d02"
                                    alt="Product"
                                    className="w-full h-auto rounded-lg mb-2"
                                />
                                <h4 className="font-semibold mb-1">
                                    Exclusive Offer on [Product Name]!
                                </h4>
                                <p className="text-sm">
                                    🔥 Grab It Before It's Gone!
                                    <br />
                                    Looking for [Product Name]? We've got the best deal for you!
                                    <br />
                                    💫 Discounted Price [Price] ✨ Free Delivery
                                    <br />
                                    ➜ Order Now on [E-Commerce Website Name]!
                                </p>
                            </div>
                            <span className="text-xs text-gray-400 mt-1 block">
                                10:32 AM
                            </span>
                        </div>
                    </div>
                </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-white"
                    >
                        <PlusCircle className="h-5 w-5" />
                    </Button>
                    <Input
                        placeholder="Type a message..."
                        className="bg-white/5 border-gray-700 text-white placeholder:text-gray-400"
                    />
                    <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AllChats
