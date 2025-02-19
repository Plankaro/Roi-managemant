"use client";
import React from "react";
import { useState } from "react";
import {
  Wallet,
  Package,
  MousePointerClick,
  MessageSquare,
  Mail,
  Phone,
  Tags,
  ShoppingBag,
  Plus,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MdOutlineChat } from "react-icons/md";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ShopifyLogo from "@/components/icons/shopify";
function ProspectId() {
  const [userEmail] = useState("Ankijit Roy");
  const stats = [
    { icon: Wallet, label: "TOTAL SPENT", value: "₹478" },
    { icon: Package, label: "TOTAL ORDERS", value: "9560" },
    { icon: MousePointerClick, label: "TOTAL PAGE VISIT", value: "8547" },
    { icon: MessageSquare, label: "TOTAL MESSAGES", value: "47748" },
  ];

  const userAttributes = [
    {
      id: 1,
      label: "Messages Seen",
      value: "1,234",
    },
    {
      id: 2,
      label: "Total Messages Read",
      value: "5,678",
    },
    {
      id: 3,
      label: "Total Messages Sent",
      value: "9,012",
    },
  ];

  return (
    <div className="h-[calc(100vh-100px)] overflow-auto no-scrollbar  text-white sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">
          Prospect User Description
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ icon: Icon, label, value }, index) => (
            <Card
              key={index}
              className="bg-backgroundColor text-white border border-primary"
            >
              <CardContent className="lg:p-6 p-3">
                <div className="flex items-center  gap-4">
                  <Icon className="w-8 h-8" />
                  <div className="flex lg:flex-col flex-col-reverse">
                    <p className="lg:text-2xl md:text-lg  font-bold">{value}</p>
                    <p className="md:text-sm text-xs text-gray-400">{label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User Profile Section */}
        <Card className="bg-backgroundColor border border-primary text-white   mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row  items-center gap-6">
              <div className="relative">
                <Avatar className="w-32 h-32 ">
                  <AvatarFallback className="bg-[#4166AE24] text-white text-6xl">
                    R
                  </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0">
                  <ShopifyLogo />
                </span>
              </div>

              <div className="flex-1 flex-col flex w-full">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h2 className="text-lg md:text-left text-center">{userEmail}</h2>
                </div>
                <Select>
                  <SelectTrigger className=" bg-[#4166AE24] border-[#4166AE24] rounded-[7px] text-white w-[200px] md:self-start self-center">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LEAD">Lead</SelectItem>
                    <SelectItem value="LOST">Lost</SelectItem>
                    <SelectItem value=" NEGOTIATION">Negotiation</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                <hr className="w-full my-4 h-1" />
                <div className="flex flex-wrap flex-col sm:flex-row gap-7">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>ankijit@example.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+91-9876543210</span>
                  </div>
                  <div className=" flex gap-2 items-center">
                    <Tags className="w-4 h-4 mr-2" />
                    Add Tags
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shopify Section */}
        <Card className="bg-backgroundColor border-primary text-white mb-8">
  <CardContent className="md:p-6 py-4">
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      {/* Shopify Logo & Create Orders button on mobile */}
      <div className="flex w-full md:w-auto items-center justify-between">
        <div className="flex items-center gap-4">
          <ShopifyLogo className="md:h-16 md:w-20 w-10 h-12" />
          <span className="text-xl">Shopify</span>
        </div>
        {/* Show button inline with logo on small screens */}
        <Button className="bg-blue-600 hover:bg-blue-700  md:hidden sm:rounded-none rounded-full! sm:w-auto sm:h-auto w-5! h-5!  md:text-base md:ml-0 ml-4">
          <Plus className="w-4 h-4 sm:hidden block md:block  text-xs" />
          <span className="sm:block hidden">Create New Orders</span>
        </Button>
      </div>

      {/* Stats and button on larger screens */}
      <div className="flex flex-col lg:pl-10 flex-1 justify-between md:flex-row items-start md:items-center gap-4 w-full">
        <div className="grid grid-cols-2 md:flex gap-4 w-full md:w-auto">
          <div className="bg-[#4166AE24] px-4 py-4 text-center">
            ₹ 0.00
          </div>
          <div className="bg-[#4166AE24] px-4 py-4 text-center">
            0 (Orders)
          </div>
        </div>
        {/* Button stays at the end in desktop */}
        <Button className="hidden md:flex bg-blue-600 hover:bg-blue-700 rounded-none">
          <Plus className="w-4 h-4 mr-2" />
          Create New Orders
        </Button>
      </div>
    </div>
  </CardContent>
</Card>

        {/* User Attributes Accordion */}
        <Accordion type="single" collapsible className="rounded-t-lg">
          <AccordionItem value="attributes" className="border-none">
            <AccordionTrigger
              className="px-6 py-4 hover:no-underline border border-primary bg-backgroundColor rounded-lg 
             data-[state=open]:rounded-b-none data-[state=open]:border-b-0"
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>User Attributes</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-6 -mt-2 border border-primary bg-backgroundColor rounded-b-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {userAttributes.map((attribute) => (
                  <div
                    key={attribute.id}
                    className="bg-[#0A051E] p-4 rounded-lg"
                  >
                    <p className="text-gray-400 mb-2">{attribute.label}</p>
                    <p className="text-2xl font-bold">{attribute.value}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="absolute bottom-10 right-10">
  <div className="relative flex items-center justify-center w-16 h-16 group">
    {/* Animated Wave Effect (Only on Hover) */}
    <span className="absolute w-full h-full rounded-full bg-primary opacity-30 scale-0 group-hover:scale-100 group-hover:animate-ping transition-transform duration-500"></span>
    <span className="absolute w-12 h-12 rounded-full bg-primary opacity-50 scale-0 group-hover:scale-100 group-hover:animate-ping transition-transform duration-500 delay-100"></span>
    
    {/* Chat Icon */}
    <div className="relative w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg">
      <MdOutlineChat className="text-white w-6 h-6" />
    </div>
  </div>
</div>

    </div>
  );
}

export default ProspectId;
