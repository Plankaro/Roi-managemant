"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { link: "/", label: "Ecommerce" },
  { link: "/engagement-analytics", label: "Engagement" },
  { link: "/chat-analytics", label: "Chat" },
];

export function AnalyticsTabs() {
  const pathname = usePathname();

  return (
    <div className="flex space-x-4 border-b border-gray-50 border-opacity-30 pb-3">
      
      {tabs.map((tab) => (
        <Link href={tab.link} key={tab.link}>
          <span
            className={cn(
              "px-4 py-2 sm:text-sm text-xs font-medium transition-colors relative cursor-pointer",
              pathname === tab.link
                ? "text-white"
                : "text-gray-400 hover:text-white"
            )}
          >
            {tab.label}
            {pathname === tab.link && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </span>
        </Link>
      ))}
    </div>
  );
}
