"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Podcast as Broadcast,
  Layout,
  LineChart,
  MessageSquare,
  PlusCircle,
  Hourglass,
  Users,
  Bot,
  Database,
  EllipsisVertical,
  BotIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

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

const AllChats = () => {
  const [takeOver, settakeOver] = useState(false);

  const [selectedContact] = useState(contacts[0]);
  return (
    <div className="flex-1 flex flex-col border border-primary rounded-[20px] glass backdrop-blur-3xl backdrop-brightness-75  relative ">
      {/* Header */}
      <div className="p-4 bg-primary/90 w-full  rounded-t-[20px] absolute top-0 z-10 glass">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <Image
                  fill
                  src={selectedContact?.avatar}
                  alt={selectedContact?.name}
                  className="object-cover"
                />
              </Avatar>
            </div>
            <div className="relative flex items-center gap-10 bg">
              <h3 className="text-lg font-semibold text-white">
                {selectedContact?.name}
              </h3>

              <div className="flex gap-3  px-3 py-2 rounded-3xl bg-[#A7B8D9]">
                <Hourglass width={18} height={18} />
                <span className="text-sm">23h 40m</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white/90 hover:bg-white/10"
                >
                  <EllipsisVertical className="h-10 w-10" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-blue-500">
                <DropdownMenuItem>
                  <div className="flex  pr-14 gap-5">
                    <Image
                      src="/icons/shopify.png"
                      alt="shopify"
                      width={21}
                      height={21}
                    />
                    <span>Create Order</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>Block Contact</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  Delete Chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 ">
        <div className="space-y-4">
          {/* Sample messages */}
          <div className="flex items-start gap-3 max-w-xl ml-auto">
            <div className="flex-1">
              <div className="bg-blue-600 text-white p-3 rounded-lg">
                <p>Hey Grace, how&apos;s it going?</p>
              </div>
              <span className="text-xs text-gray-400 mt-1 block">10:30 AM</span>
            </div>
            <Avatar className="h-8 w-8">
              <Image
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36"
                alt="Sender"
                className="object-cover"
                width={32}
                height={32}
              />
            </Avatar>
          </div>

          <div className="flex items-start gap-3 max-w-xl">
            <Avatar className="h-8 w-8">
              <Image
                fill
                src={selectedContact?.avatar}
                alt={selectedContact?.name}
                className="object-cover"
              />
            </Avatar>
            <div className="flex-1">
              <div className="bg-white/10 text-white p-3 rounded-lg">
                <Image
                  fill
                  src="https://images.unsplash.com/photo-1638716000957-e0e0e32d2d02"
                  alt="Product"
                  className="w-full h-auto rounded-lg mb-2"
                />
                <h4 className="font-semibold mb-1">
                  Exclusive Offer on [Product Name]!
                </h4>
                <p className="text-sm">
                  🔥 Grab It Before It&apos;s Gone!
                  <br />
                  Looking for [Product Name]? We&apos;ve got the best deal for
                  you!
                  <br />
                  💫 Discounted Price [Price] ✨ Free Delivery
                  <br />➜ Order Now on [E-Commerce Website Name]!
                </p>
              </div>
              <span className="text-xs text-gray-400 mt-1 block">10:32 AM</span>
            </div>
          </div>
          <div className="flex items-start gap-3 max-w-xl">
            <Avatar className="h-8 w-8">
              <Image
                fill
                src={selectedContact?.avatar}
                alt={selectedContact?.name}
                className="object-cover"
              />
            </Avatar>
            <div className="flex-1">
              <div className="bg-white/10 text-white p-3 rounded-lg">
                <Image
                  fill
                  src="https://images.unsplash.com/photo-1638716000957-e0e0e32d2d02"
                  alt="Product"
                  className="w-full h-auto rounded-lg mb-2"
                />
                <h4 className="font-semibold mb-1">
                  Exclusive Offer on [Product Name]!
                </h4>
                <p className="text-sm">
                  🔥 Grab It Before It&apos;s Gone!
                  <br />
                  Looking for [Product Name]? We&apos;ve got the best deal for
                  you!
                  <br />
                  💫 Discounted Price [Price] ✨ Free Delivery
                  <br />➜ Order Now on [E-Commerce Website Name]!
                </p>
              </div>
              <span className="text-xs text-gray-400 mt-1 block">10:32 AM</span>
            </div>
          </div>
          <div className="flex items-start gap-3 max-w-xl">
            <Avatar className="h-8 w-8">
              <Image
                fill
                src={selectedContact?.avatar}
                alt={selectedContact?.name}
                className="object-cover"
              />
            </Avatar>
            <div className="flex-1">
              <div className="bg-white/10 text-white p-3 rounded-lg">
                <Image
                  fill
                  src="https://images.unsplash.com/photo-1638716000957-e0e0e32d2d02"
                  alt="Product"
                  className="w-full h-auto rounded-lg mb-2"
                />
                <h4 className="font-semibold mb-1">
                  Exclusive Offer on [Product Name]!
                </h4>
                <p className="text-sm">
                  🔥 Grab It Before It&apos;s Gone!
                  <br />
                  Looking for [Product Name]? We&apos;ve got the best deal for
                  you!
                  <br />
                  💫 Discounted Price [Price] ✨ Free Delivery
                  <br />➜ Order Now on [E-Commerce Website Name]!
                </p>
              </div>
              <span className="text-xs text-gray-400 mt-1 block">10:32 AM</span>
            </div>
          </div>
          <div className="flex items-start gap-3 max-w-xl">
            <Avatar className="h-8 w-8">
              <Image
                fill
                src={selectedContact?.avatar}
                alt={selectedContact?.name}
                className="object-cover"
              />
            </Avatar>
            <div className="flex-1">
              <div className="bg-white/10 text-white p-3 rounded-lg">
                <Image
                  fill
                  src="https://images.unsplash.com/photo-1638716000957-e0e0e32d2d02"
                  alt="Product"
                  className="w-full h-auto rounded-lg mb-2"
                />
                <h4 className="font-semibold mb-1">
                  Exclusive Offer on [Product Name]!
                </h4>
                <p className="text-sm">
                  🔥 Grab It Before It&apos;s Gone!
                  <br />
                  Looking for [Product Name]? We&apos;ve got the best deal for
                  you!
                  <br />
                  💫 Discounted Price [Price] ✨ Free Delivery
                  <br />➜ Order Now on [E-Commerce Website Name]!
                </p>
              </div>
              <span className="text-xs text-gray-400 mt-1 block">10:32 AM</span>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Input */}
      {!takeOver ? (
        <div className="p-4 border-t border-primary bg-[#4064AC80] rounded-b-[20px]">
          <div className="flex items-center gap-2 text-white justify-between">
            <div className="flex items-center gap-2">
              <BotIcon /> <p>This conversation is assigned to a Bot</p>
            </div>

            <Button
              onClick={() => settakeOver(true)}
              className="bg-blue-600 hover:bg-blue-700 capitalize"
            >
              Take Over
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4 border-t border-primary bg-primary rounded-b-[20px]">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-white/90  hover:bg-white/10 aspect-square"
            >
              <PlusCircle />
            </Button>
            <Input
              placeholder="Type a message..."
              className="bg-white/5 border-none hover:right-0 focus-visible:ring-0  text-white placeholder:text-gray-400"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 capitalize">
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllChats;
