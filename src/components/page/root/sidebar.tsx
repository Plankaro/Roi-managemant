/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AIBuilder } from "@/components/icons";
import { cn } from "@/lib/utils";
import {
  BetweenHorizonalEnd,
  LineChart,
  LogOut,
  MessageSquare,
  Settings,
  Users,
  X,
} from "lucide-react";
import { RiAccountPinBoxFill } from "react-icons/ri";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenuModal } from "@/store/features/prospect";
import { RootState } from "@/store/store";
import Logo from "@/components/ui/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { handleSignOut } from "@/app/(auth)/sign-in/action";
import { FaBoltLightning } from "react-icons/fa6";
import { IoMegaphone } from "react-icons/io5";
import { CgTemplate } from "react-icons/cg";
import { GrIntegration } from "react-icons/gr";

import { useGetProfileQuery } from "@/store/features/apislice";
import { Skeleton } from "@/components/ui/skeleton";

export const sidebarItems = [
  {
    icon: LineChart,
    label: "Analytics",
    slugs: ["/", "/engagement-analytics", "/chat-analytics"],
  },
  { icon: MessageSquare, label: "Chats", slugs: ["/chats", "/orders/*"] },
  { icon: CgTemplate, label: "Templates", slugs: ["/templates"] },
  { icon: FaBoltLightning, label: "Flash Response", slugs: ["/flashresponse"] },
  { icon: RiAccountPinBoxFill, label: "Prospects", slugs: ["/prospects"] },
  { icon: Users, label: "Teams", slugs: ["/teams"] },
  { icon: BetweenHorizonalEnd, label: "Broadcast", slugs: ["/broadcast"] },
  { icon: IoMegaphone, label: "Campaigns", slugs: ["/campaigns"] },
  { icon: AIBuilder, label: "Bots", slugs: ["/bots"] },
  { icon: GrIntegration, label: "Integrations", slugs: ["/integrations"] },
];

const Sidebar = () => {
  const pathname = usePathname();

  const isOpen = useSelector(
    (state: RootState) => state.Prospect.openMenuModal
  );
  const { data, isLoading } = useGetProfileQuery({});
  console.log(data);
  const dispatch = useDispatch();
  const isPathActive = (slugs: string[]) => {
    return slugs.some((slug) => {
      if (slug.endsWith("/*")) {
        const basePath = slug.slice(0, -2);
        return pathname.startsWith(basePath);
      }
      return pathname === slug || pathname.startsWith(`${slug}/`);
    });
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-40 md:bg-backgroundColor bg-primary   overflow-y-scroll  no-scrollbar  p-3 md:rounded-lg flex flex-col border border-primary transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0 md:static  xl:min-w-[230px]"
      )}
    >
      <nav className="space-y-2 flex-1  ">
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
          {isLoading ? (
            <div className="items-center gap-2 sm:flex hidden">
              <div className="flex flex-col text-white">
                <Skeleton className="h-4 w-24 mb-1 bg-backgroundColor" />
                <Skeleton className="h-3 w-32 bg-backgroundColor" />
              </div>
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          ) : (
            <Avatar>
              <AvatarImage
                src={data?.image ?? ""}
                alt="@shadcn"
                height={28}
                width={28}
              />
              <AvatarFallback>{data?.name?.slice(0, 1) ?? ""}</AvatarFallback>
            </Avatar>
          )}

          <div className="flex flex-col text-white">
            <span className="text-sm ">{data?.name ?? ""}</span>
            <span className="text-xs">{data?.email ?? ""}</span>
          </div>
        </div>
        {sidebarItems.map((item: any) => (
          <Link
            href={item.slugs[0]}
            key={item.label}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors xl:justify-normal",
              isPathActive(item.slugs)
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
        <Link href={"/settings"}>
          <button
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium justify-normal ${
              pathname.startsWith("/settings")
                ? "bg-blue-500 text-white"
                : "text-gray-50 hover:text-white hover:bg-white/10"
            }`}
          >
            <Settings className="h-5 w-5" />
            <span className="xl:inline md:hidden inline">Settings</span>
          </button>
        </Link>
        <button
          onClick={() => handleSignOut()}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-50 hover:text-white hover:bg-white/5 justify-normal "
        >
          <LogOut className="h-5 w-5" />
          <span className="xl:inline md:hidden inline">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
