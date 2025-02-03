/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AIBuilder } from "@/components/icons";
import { cn } from "@/lib/utils";
import {
  BetweenHorizonalEnd,
  Database,
  LineChart,
  LogOut,
  MessageSquare,
  Settings,
  Users,

  X,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenuModal } from "@/store/features/prospectslice";
import { RootState } from "@/store/store";
import Logo from "@/components/ui/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  useSession } from "next-auth/react";


export const sidebarItems = [
  { icon: AIBuilder, label: "Overview", slug: "/" },
  { icon: MessageSquare, label: "Chats", slug: "/chats" },
  { icon: BetweenHorizonalEnd, label: "Broadcast", slug: "/broadcast" },
  { icon: AIBuilder, label: "AI Builder", slug: "/ai-builder" },
  { icon: LineChart, label: "Analytics", slug: "/analytics" },
  { icon: Database, label: "Data Integration", slug: "/data-integration" },
  { icon: Users, label: "Agents", slug: "/agents" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const session:any = useSession();
  const isOpen = useSelector(
    (state: RootState) => state.selectedProspect.openMenuModal
  );
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-navy-900 p-3 !rounded-r-[20px] flex flex-col border border-primary backdrop-blur-3xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:static md:w-auto"
        )}
      >
        <nav className="space-y-2 flex-1">
          <div className="flex m-2 justify-between items-center">
            <Logo width={120} height={58} className="md:hidden inline" />

            <button
              className="md:hidden left-4  p-2 bg-navy-900 rounded-full text-white self-start"
              onClick={() => dispatch(toggleMenuModal())}
            >
              
                <X className="h-6 w-6" />
             
            </button>
          </div>
          <div className=" items-center  space-y-4 m-2 mb-6 w-full gap-2 sm:hidden flex ">
              <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    height={20}
                    width={20}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col  text-white">
                <span className="text-sm ">{session?.data?.user?.user?.name??""}</span>
                <span className="text-xs">{session?.data?.user?.user?.email??""}</span>
                </div>
               
              </div>
          {sidebarItems.map((item: any) => (
            <Link
              href={item.slug}
              key={item.label}
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors xl:justify-normal ",
                pathname === item.slug || pathname.startsWith(`${item.slug}/`)
                  ? "bg-blue-500 text-white"
                  : "text-gray-50 hover:text-white hover:bg-white/10"
              )}
              onClick={() => {
                if (isOpen) {
                  dispatch(toggleMenuModal());
                }
              }}
            >
              <item.icon className="h-5 w-5" />
              <span className="xl:inline md:hidden inline">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-2">
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-50 hover:text-white hover:bg-white/5 justify-normal ">
            <Settings className="h-5 w-5" />
            <span className="xl:inline md:hidden inline">Settings</span>
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-50 hover:text-white hover:bg-white/5 justify-normal ">
            <LogOut className="h-5 w-5" />
            <span className="xl:inline md:hidden inline">Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
