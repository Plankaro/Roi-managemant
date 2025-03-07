"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Phone,
  Mail,
  ArrowLeft,
  MoreVertical, Pencil,
  CircleEllipsis
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function Dashboard() {
  return (
    <div className="">
      <div className=" ">
        <header className="mb-6 flex justify-between">
          <h1 className="text-2xl font-semibold mb-4 text-white">Team</h1>
          <div className="flex flex-col sm:flex-row gap-3  items-start sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                className="pl-10 bg-[#1e1e3f] border-none rounded-full text-sm h-9 text-white"
                placeholder="Search here..."
              />
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center gap-1 px-4 py-2 h-9">
              <Plus className="h-4 w-4" />
              <span className="text-sm">New Agents</span>
            </Button>
          </div>
        </header>

        <div className=" no-scrollbar overflow-y-scroll h-[calc(100vh-200px)] ">
          <div className="md:grid hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
            {Array.from({ length: 12 }).map((_, index) => (
              <AgentCard key={index} />
            ))}
          </div>

          <div className=" md:hidden grid-cols-1 space-y-2">
            {Array.from({ length: 12 }).map((_, index) => (
              <AgentListItem key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentCard() {
  return (
    <div className="bg-backgroundColor border  border-primary rounded-xl p-6 relative">
      <div className="absolute top-4 right-4 flex flex-col gap-3">
        <button className="text-gray-400  rounded-full p-2 hover:bg-primary hover:text-white">
          <Edit2 className="h-4 w-4" />
        </button>
        <button className="text-red-500 hover:text-red-400 rounded-full p-2">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative mb-4 w-20 h-20">
          <Image
            src="https://github.com/shadcn.png"
            alt="Agent profile"
            fill
            className="rounded-full  object-cover border-2 border-[#4C2A87]"
          />
        </div>

        <h3 className="text-xl font-semibold text-white mb-1">Gautam Thakur</h3>
        <span className="px-4 py-1 bg-black/30 rounded-full text-xs text-gray-300 mb-4">
          Agent
        </span>

        <div className="w-full space-y-3">
          <div className="flex items-center text-sm text-gray-300">
            <Phone className="h-4 w-4 mr-2 text-gray-400" />
            <span>+919876543210</span>
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <Mail className="h-4 w-4 mr-2 text-gray-400" />
            <span>emailfake@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}




function AgentListItem() {
  return (

      

        <div className="bg-[#0A0A1B] rounded-lg py-4 px-5 border border-primary relative overflow-hidden">
          <span className="absolute top-0  right-2 bg-blue-600 text-white text-sm px-3 py-1 rounded-lg">
            Admin
          </span>

          <div className="flex items-center mt-4 gap-3 mb-4">
            <div className="flex items-center gap-4">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <h2 className="md:text-base text-sm  font-semibold text-white">Gautam Thakur</h2>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-400 hover:text-white focus:outline-none">
                 < CircleEllipsis className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-blue-50 border-0 ">
                <DropdownMenuItem className="cursor-pointer">
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-500">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex sm:flex-row flex-col gap-6">
            <div className="flex items-center gap-2 text-gray-400">
              <Mail size={18} />
              <span>ekedfdfd@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Phone size={18} />
              <span>+919876543210</span>
            </div>
          </div>
        </div>

  
  );
}




