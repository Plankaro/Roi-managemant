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

const contacts = [
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

const ChatLists = () => {
    return (
        < div className="w-96 bg-navy-900/50 border-r border-gray-800" >
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">All Chats</h2>
                    <Button variant="outline" size="sm" className="gap-2">
                        <PlusCircle className="h-4 w-4" /> New Chat
                    </Button>
                </div>

                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search conversations..."
                        className="pl-9 bg-white/5 border-gray-700 text-white placeholder:text-gray-400"
                    />
                </div>

                <ScrollArea className="h-[calc(100vh-200px)]">
                    <div className="space-y-2">
                        {contacts.map((contact) => (
                            <button
                                key={contact.id}
                                // onClick={() => setSelectedContact(contact)}
                                className={cn(
                                    "w-full p-3 rounded-lg text-left transition-colors",
                                    // selectedContact?.id === contact.id
                                    //     ? "bg-white/10"
                                    //     : "hover:bg-white/5"
                                )}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="relative">
                                        <Avatar className="h-10 w-10">
                                            <img
                                                src={contact.avatar}
                                                alt={contact.name}
                                                className="object-cover"
                                            />
                                        </Avatar>
                                        {contact.online && (
                                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-navy-900" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-white truncate">
                                                {contact.name}
                                            </p>
                                            <span className="text-xs text-gray-400">
                                                {contact.time}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400 truncate">
                                            {contact.message}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </ div>
    )
}

export default ChatLists
