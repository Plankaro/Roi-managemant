"use client";
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from "lucide-react";
import { FilterMenu } from '@/components/page/chats/filter-menu';

const filters = [
    { label: "Conversation Status", icon: ChevronDown },
    { label: "Channels", icon: ChevronDown },
    { label: "Agents", icon: ChevronDown },
    { label: "Assigned Status", icon: ChevronDown },
    { label: "Read Status", icon: ChevronDown },
    { label: "Broadcast Campaigns", icon: ChevronDown },
    { label: "Drip Campaigns", icon: ChevronDown },
    { label: "Tags", icon: ChevronDown },
    { label: "Tags", icon: ChevronDown },
    { label: "Tags", icon: ChevronDown },
    { label: "Tags", icon: ChevronDown },
    { label: "Tags", icon: ChevronDown },
];

const DashboardLayout = ({ children, allchats, chatlist }: { children: ReactNode, allchats: ReactNode, chatlist: ReactNode }) => {
    const filterRef = useRef<HTMLDivElement>(null);
    const [availableHeight, setAvailableHeight] = useState(0);

    useEffect(() => {
        const headerHeight = 120; // Fixed header height

        // Function to calculate available height
        const calculateHeight = () => {
            const filterHeight = filterRef.current ? filterRef.current.offsetHeight : 0;
            const viewportHeight = window.innerHeight;
            const newAvailableHeight = viewportHeight - headerHeight - filterHeight;
            setAvailableHeight(newAvailableHeight);
        };

        // Create the ResizeObserver instance
        const resizeObserver = new ResizeObserver(() => {
            calculateHeight(); // Recalculate height on resize
        });

        // Observe the window resize event
        resizeObserver.observe(document.body); // Observe body to capture window resize

        // Initial calculation
        calculateHeight();

        // Cleanup observer on component unmount
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div className='flex h-full flex-col '>
            {/* <div className="mt-4" ref={filterRef}>
                <div>
                    <div className="flex gap-2 pb-2">
                        {filters.map((filter) => (
                            <Button
                                key={filter.label}
                                variant="outline"
                                size="sm"
                                className="gap-2 whitespace-nowrap bg-transparent text-white hover:text-white/90 border-none hover:bg-transparent"
                            >
                                {filter.label}
                                <filter.icon className="h-4 w-4" />
                            </Button>
                        ))}
                    </div>
                </div>
            </div> */}
            {/* <FilterMenu /> */}
            {
                availableHeight > 0 && (
                    <div
                        // style={{ height: availableHeight }}
                        className="flex  gap-4 overflow-hidden"
                    >
                        {/* {children} */}
                        {chatlist}
                        {allchats}
                    </div>
                )
            }
        </div>
    );
};

export default DashboardLayout;
