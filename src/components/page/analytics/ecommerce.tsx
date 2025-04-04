import React from "react";
import ConversionsAnalytics from "./conversion-ctr";
import { BentoGrid, BentoGridItem } from "@/components/ui/bentogrid";
import RevenueAnalytics from "./revenue";
import RecoveredCartAnalytics from "./recovered-cart-analytics";
import CodToCheckoutAnalytics from "./checkout-cod-analytics";

function EcommerceAnalytics() {
  const metrics = [
    { label: "Total Sales", value: "$1,200,000" },
    { label: "Total Orders", value: "10" },
    { label: "Cod to Checkout", value: "12,000" },
    { label: "Abondned Cart Recovered", value: "75%" },
  ];
  const gridComponents = [
    <RevenueAnalytics key="revenue" />,
    <ConversionsAnalytics key="conversion" />,
    <RecoveredCartAnalytics key="analytics" />,
    <CodToCheckoutAnalytics key="codanalytics" />,
  ];
  return (
    <div className="overflow-scroll no-scrollbar h-[calc(100vh-250px)]">
      <div className="grid grid-cols-2  md:grid-cols-4 gap-4 mb-6 ">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="border-primary  border bg-backgroundColor rounded-md"
          >
            <div className="p-4">
              <p className="text-sm text-gray-400">{metric.label}</p>
              <p className="text-lg font-semibold mt-1 text-white">
                {metric.value}
              </p>
            </div>
          </div>
        ))}
      </div>
      <BentoGrid className="gap-3 grid-cols-2 md:px-3 ">
        {gridComponents.map((gridComponent, i) => (
          <BentoGridItem
            key={i}
            className={`
                  ${
                    i === 0
                      ? "col-span-2"
                      : ""
                  }
        ${
          i === 1
            ? "col-span-2"
            : ""
        }


          ${
          i === 2
            ? "md:col-span-1 col-span-2"
            : ""
        }
        ${
            i === 3
              ? "md:col-span-1 col-span-2"
              : ""
          }

             `}

          >
            {gridComponent}
          </BentoGridItem>
        ))}
      </BentoGrid>
    </div>
  );
}

export default EcommerceAnalytics;
