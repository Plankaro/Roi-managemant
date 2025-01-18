"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Search, } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
    {
        id: 2,
        name: "Jacob Math",
        phone: "+91 8765498768",
        message: "Lorem ipsum dolor sit amet, consectetur adip...",
        time: "2:46 pm",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
        online: false,
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
    {
        id: 2,
        name: "Jacob Math",
        phone: "+91 8765498768",
        message: "Lorem ipsum dolor sit amet, consectetur adip...",
        time: "2:46 pm",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
        online: false,
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
    {
        id: 2,
        name: "Jacob Math",
        phone: "+91 8765498768",
        message: "Lorem ipsum dolor sit amet, consectetur adip...",
        time: "2:46 pm",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
        online: false,
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

const ChatLists = () => {
    return (
        <div className="max-w-md max-lg:max-w-[18rem] w-full border rounded-[20px] border-primary backdrop-blur-xl flex flex-col h-full overflow-hidden  ">
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">All Chats</h2>
                    <Button variant="outline" size="sm" className="gap-2 bg-blue-900 border-none rounded-[10px] text-white">
                        <PlusCircle className="h-4 w-4" /> contacts
                    </Button>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search here..."
                        className="pl-9 bg-white/5 border-gray-700 text-white placeholder:text-gray-400 w-full max-w-[18.75rem]"
                    />
                </div>
            </div>
            <ScrollArea  >
                <div className="space-y-2 p-4">
                    {contacts.map((contact) => (
                        <button
                            key={contact.id}
                            className={cn(
                                "w-full p-3 rounded-lg text-left transition-colors"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <div className="relative">
                                    <Avatar className="w-14 h-14">
                                        <Image src={contact.avatar} alt="@shadcn" className="object-contain" width={56} height={56} />
                                    </Avatar>
                                    {contact.online && (
                                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-navy-900" />
                                    )}
                                </div>
                                <div className="flex-1 w-full h-14 py-[2px] flex flex-col justify-between">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-white truncate">
                                            {contact.name}
                                        </p>
                                        <span className="text-xs text-gray-400">
                                            {contact.time}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 truncate mt-auto ">
                                        {contact.message}
                                    </p>
                                </div>

                            </div>
                        </button>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};

export default ChatLists;
