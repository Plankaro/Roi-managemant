"use client"

import * as React from "react"
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
    MenubarSeparator,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSubContent,
} from "@/components/ui/menubar"

const filters: { title: string; options: string[] }[] = [
    {
        title: "Conversation Status",
        options: ["Open", "Closed", "Pending"],
    },
    {
        title: "Channels",
        options: ["WhatsApp", "SMS", "Email", "Phone"],
    },
    {
        title: "Agents",
        options: ["X", "Y", "Z"],
    },
    {
        title: "Assignment Status",
        options: ["Assigned", "Unassigned"],
    },
    {
        title: "Read Status",
        options: ["Read", "Unread"],
    },
    {
        title: "Broadcast Campaigns",
        options: ["Campaign 1", "Campaign 2", "Campaign 3"],
    },
    {
        title: "Drip Campaigns",
        options: ["Campaign A", "Campaign B", "Campaign C"],
    },
    {
        title: "Tags/Labels",
        options: ["Tag 1", "Tag 2", "Tag 3"],
    },
]

export function FilterMenu() {
    return (
        <Menubar>
            {filters.map((filter, index) => (
                <MenubarMenu key={index}>
                    <MenubarTrigger className="cursor-pointer">{filter.title}</MenubarTrigger>
                    <MenubarContent className="-top-4 absolute left-0 w-full">
                        {filter.options.map((option, idx) => (
                            <MenubarCheckboxItem key={idx}>{option}</MenubarCheckboxItem>
                        ))}
                        <MenubarSeparator />
                    </MenubarContent>
                </MenubarMenu>
            ))}
        </Menubar>
    )
}
