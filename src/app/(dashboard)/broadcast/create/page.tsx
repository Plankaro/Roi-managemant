"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SelectTemplate from "@/components/page/broadcast/select-template";
import { ArrowUpRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import RecipientContents from "@/components/page/broadcast/recepient-contents";
import Schedule from "@/components/page/broadcast/schedule";
import Settings from "@/components/page/broadcast/settings";

interface Step {
  id: number;
  title: string;
}

const steps: Step[] = [
  { id: 1, title: "Select Template" },
  { id: 2, title: "Recipients & Contents" },
  { id: 3, title: "Settings" },
  { id: 4, title: "Schedule" },
];

export default function BroadcastHeader() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepClick = (stepId: number) => {
    if (
      stepId < currentStep ||
      completedSteps.includes(stepId - 1) ||
      stepId === 1
    ) {
      setCurrentStep(stepId);
    }
  };

  const handleProceed = () => {
    if (currentStep < steps.length) {
      setCompletedSteps((prev) => [...prev, currentStep]);
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="w-full  py-3 flex items-center justify-between ">
        <h1 className=" font-semibold text-2xl text-white">
          Create Broadcast Campaign
        </h1>

        <div className="flex items-center gap-2 flex-1 mx-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => handleStepClick(step.id)}
                disabled={
                  !completedSteps.includes(step.id - 1) &&
                  step.id !== 1 &&
                  step.id > currentStep
                }
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full",
                  currentStep === step.id && "bg-blue-200",
                  "hover:bg-[#1C1D36]/50 transition-colors",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                <span
                  className={cn(
                    "text-sm",
                    currentStep === step.id ? "text-white" : "text-gray-400"
                  )}
                >
                  {step.title}
                </span>
                <div
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center text-xs",
                    currentStep === step.id || completedSteps.includes(step.id)
                      ? "bg-blue-600 text-white"
                      : "border-2 border-gray-600 text-gray-600"
                  )}
                >
                  {currentStep === step.id ||
                  completedSteps.includes(step.id) ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6667 3.5L5.25 9.91667L2.33333 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
              </button>
              {index < steps.length - 1 && (
                <div className="h-[2px] w-4 bg-gray-700 mx-2" />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-[#1C1D36] text-white border-none hover:bg-[#2C2D46]"
          >
            Exit
          </Button>
          <Button
            onClick={handleProceed}
            disabled={currentStep === steps.length}
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed
          </Button>
        </div>
      </div>
      <div className="flex gap-6 p-6  min-h-screen">
        <div className="flex-1 flex gap-6 rounded-3xl h-[calc(100vh-4rem)]">
          {currentStep === 1 && <SelectTemplate />}
          {currentStep === 2 && <RecipientContents />}
          {currentStep === 3 && <Settings />}
          {currentStep === 4 && <Schedule />}
          </div>
          <div className="w-[400px]">
            <div className="sticky top-6">
              <h2 className="text-xl font-semibold text-white mb-4">Preview</h2>
              <div className="bg-[#1E2A47] rounded-2xl p-4 w-full">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-white text-lg font-semibold">
                    Exclusive Offer On Product
                  </h2>
                  <ArrowUpRight className="text-white w-4 h-4" />
                </div>

                <ScrollArea className="bg-white rounded-lg p-3 h-[400px]">
                  <img
                    src="https://images.unsplash.com/photo-1737223450924-5e1a0d5ab85f"
                    alt="Product"
                    className="aspect-square w-full max-h-60 object-cover rounded-lg mb-3"
                  />

                  <h3 className="text-gray-800 text-base font-medium mb-2">
                    Exclusive Offer on [Product Name]!
                  </h3>

                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <span className="text-orange-500">🔥</span>
                      <span className="font-medium">
                        Grab It Before It&apos;s Gone!
                      </span>
                    </p>

                    <p className="text-gray-700">
                      Looking for [Product Name]? We&apos;ve got the best deal
                      for you!
                    </p>

                    <p className="flex items-center gap-2">
                      <span>⭐</span>
                      <span>Discounted Price: [Price]</span>
                      <span>📦</span>
                      <span>Free Delivery</span>
                    </p>

                    <p className="text-gray-700">
                      🛒 Order Now on [E-Commerce Website Name]!
                    </p>

                    <p className="text-gray-700">
                      Message us on WhatsApp to get link to claim your offer.
                    </p>

                    <p className="flex items-center gap-2 text-gray-700">
                      <span>📱</span>
                      <span className="text-blue-600 underline cursor-pointer">
                        Click Here to Chat Now [Insert WhatsApp Link]
                      </span>
                    </p>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
   
    </>
  );
}
