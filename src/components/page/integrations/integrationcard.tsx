/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import toast from "react-hot-toast";

interface IntegrationCardProps {
  integration: {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
  };
  onConnect: () => void;
  isConnected: boolean;
  disconnect: () => any;
  
}

export function IntegrationCard({
  integration,
  onConnect,
  isConnected,
  disconnect
}: IntegrationCardProps) {
  console.log(isConnected);
  const handleDisconnect = () => {
    const promise = disconnect().unwrap();
    toast.promise(promise, {
      loading: "Disconnecting...",
      success: "Disconnected successfully!",
      error: (error: any) => error?.data?.message || "An unexpected error occurred",
    })
  }
  return (
    <Card className="bg-transparent border-primary text-white overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-start gap-4">
          <div className={` flex items-center gap-4`}>
            {integration.name === "Razorpay" ? (
              <Image
                src={integration.icon}
                alt={integration.name}
                width={156.8}
                height={30}
              />
            ) : (
              <>
                <Image
                  src={integration.icon}
                  alt={integration.name}
                  width={40}
                  height={40}
                />
                <h3 className="font-medium text-lg">{integration.name}</h3>
              </>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-300 mt-1">
              {integration.description}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 flex justify-end">
        {isConnected ? (
          <Button
            onClick={handleDisconnect}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Disconnect
          </Button>
        ) : (
          <Button
            onClick={onConnect}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Connect
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
