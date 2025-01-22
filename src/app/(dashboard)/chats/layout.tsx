"use client";
import React, { ReactNode } from "react";
import { FilterMenu } from "@/components/page/chats/filter-menu";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// const filters = [
//   { label: "Conversation Status", icon: ChevronDown },
//   { label: "Channels", icon: ChevronDown },
//   { label: "Agents", icon: ChevronDown },
//   { label: "Assigned Status", icon: ChevronDown },
//   { label: "Read Status", icon: ChevronDown },
//   { label: "Broadcast Campaigns", icon: ChevronDown },
//   { label: "Drip Campaigns", icon: ChevronDown },
//   { label: "Tags", icon: ChevronDown },
//   { label: "Tags", icon: ChevronDown },
//   { label: "Tags", icon: ChevronDown },
//   { label: "Tags", icon: ChevronDown },
//   { label: "Tags", icon: ChevronDown },
// ];

const DashboardLayout = ({
  // children,
  allchats,
  chatlist,
}: {
  children: ReactNode;
  allchats: ReactNode;
  chatlist: ReactNode;
}) => {
  // const filterRef = useRef<HTMLDivElement>(null);
  // const [ setAvailableHeight] = useState(0);

  // useEffect(() => {
  //   const headerHeight = 300; // Fixed header height

  //   // Function to calculate available height
  //   const calculateHeight = () => {
  //     const filterHeight = filterRef.current
  //       ? filterRef.current.offsetHeight
  //       : 0;
  //     const viewportHeight = window.innerHeight;
  //     const newAvailableHeight = viewportHeight - headerHeight - filterHeight;
  //     setAvailableHeight(newAvailableHeight);
  //   };

  //   // Create the ResizeObserver instance
  //   const resizeObserver = new ResizeObserver(() => {
  //     calculateHeight(); // Recalculate height on resize
  //   });

  //   // Observe the window resize event
  //   resizeObserver.observe(document.body); // Observe body to capture window resize

  //   // Initial calculation
  //   calculateHeight();

  //   // Cleanup observer on component unmount
  //   return () => {
  //     resizeObserver.disconnect();
  //   };
  // }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="text-lg ml-3 font-semibold text-white">Filters</div>
          <div className="flex gap-8 items-center">
            <p className="text-base ml-3  text-white cursor-pointer">
              Sort By: All{" "}
            </p>
            <p className="text-lg ml-3  text-red-500 underline cursor-pointer">
              View Report{" "}
            </p>
            <Button className="bg-blue-500 hover:bg-blue-400">
              <Plus className="h-4 w-4" />
              <span className="ml-2 text-b">Broadcast Campaign</span>
            </Button>
          </div>
        </div>
        <FilterMenu />
      </div>
      <div className="flex h-full flex-col w-full">
        <div className="flex  gap-4 overflow-hidden h-[calc(100vh-190px)]">
          {/* {children} */}
          {chatlist}
          {allchats}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
