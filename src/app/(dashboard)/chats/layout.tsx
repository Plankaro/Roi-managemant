"use client";
import React, { ReactNode, } from "react";
import { FilterMenu } from "@/components/page/chats/filter-menu";

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
      <div className="text-lg ml-3 font-semibold text-white">Filters</div>
      <FilterMenu />
      <div className="flex h-full flex-col w-full">
        <div
          
          className="flex  gap-4 overflow-hidden h-[calc(100vh-190px)]"
        >
          {/* {children} */}
          {chatlist}
          {allchats}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
