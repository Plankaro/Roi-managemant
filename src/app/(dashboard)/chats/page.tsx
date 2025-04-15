"use client";
import React from "react";
import { FilterMenu } from "@/components/page/chats/filter-menu";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ChatLists from "./@chatlist/page";
import AllChats from "./@allchats/page";
import Link from "next/link";




const DashboardLayout = () => {

  return (
    <div className="flex flex-col w-full">
      <div className="">
        <div className="md:flex items-center justify-between hidden">
          <div className="text-lg ml-3 font-semibold text-white">Filters</div>
          <div className="flex gap-6 items-center">
           
         <Link  href={"/broadcast/create"}>
            <Button className="bg-blue-500 hover:bg-blue-400">
              <Plus className="h-4 w-4" />
              <span className="ml-2 text-b">Broadcast Campaign</span>
            </Button>
            </Link>
          </div>
        </div>
       
      </div>
      <div className="flex h-full flex-col ">
      <FilterMenu />
        <div className="flex  gap-4 overflow-hidden md:h-[calc(100vh-220px)] h-[85vh]">
          {/* {children} */}
        <ChatLists/>
          <AllChats/>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
