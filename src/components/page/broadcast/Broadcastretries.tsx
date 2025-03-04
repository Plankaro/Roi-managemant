/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCreateBroadcastRetryMutation, useGetBroadcastByIdQuery } from "@/store/features/apislice";
import toast from "react-hot-toast";
import { useGetRetryBroadcastQuery } from "@/store/features/apislice";
import { format } from "date-fns";
import { BroadcastDetailResult } from "@/zod/broadcast/broadcast";

export default function BroadcastAndRetries({
  selectedBroadcast,
  BroadCastrefetch
}: {
  selectedBroadcast: BroadcastDetailResult | undefined;
  BroadCastrefetch:()=>void
}) {
  const [createBroadcastRetry] = useCreateBroadcastRetryMutation();
  const { data,refetch } = useGetRetryBroadcastQuery(selectedBroadcast?.id);

  console.log(data);

  const handleCreateBroadcastRetry = async () => {
    try {
      const promise = createBroadcastRetry({
        id: selectedBroadcast?.id ?? "",
      }).unwrap();
      toast.promise(promise, {
        loading: "Creating retry for broadcast...",
        success: "Retry created successfully",
        error: (error: any) =>
          error?.data?.message || "An unexpected error occurred",
      });
      refetch()
      BroadCastrefetch()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full h-fit bg-transparent border-primary text-white p-6">
      <div className="flex items-center justify-between my-5 ">
        <h2 className="text-xl font-semibold mb-4">Broadcast status</h2>
        <Button className="bg-blue-500 px-5 py-2" onClick={handleCreateBroadcastRetry}>Add retries</Button>
      </div>
      <ScrollArea className="w-full whitespace-nowrap border-primary border p-4 rounded-sm">
        <div className="space-y-4 ">
          {data &&
            data.map((retry: any, index: number) => {
              // Format the date with fallback
             
                const date = retry?.createdAt
                  ? new Date(retry.createdAt)
                  : new Date();
                const formattedDate = format(date, "MM/dd/yy hh:mm aa");
             

              return (
                <div
                  key={index}
                  className="border-b last:border-b-0 pb-4 last:pb-0"
                >
                  {/* Desktop Layout */}
                  <div className="hidden xl:grid md:grid-cols-5 md:gap-4 min-w-[800px]">
                    <div>Retry {index + 1}</div>
                    <div>
                      <div className="text-sm text-gray-400">Scheduled on</div>
                      {formattedDate }
                    </div>
                    <div className="text-blue-500">{retry?.status ?? ""}</div>
                    <div>
                      <div className="text-sm text-gray-400">Delivered</div>
                      {retry?.deliveredCount ?? ""}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Failed</div>
                      {retry?.failedCount ?? ""}
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="xl:hidden space-y-2">
                    <div className="flex justify-between items-start">
                      <div>Retry {index + 1}</div>
                      <div className="text-blue-500">{retry?.status ?? ""}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Scheduled on</div>
                      <div>{formattedDate}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <div className="text-sm text-gray-400">Delivered</div>
                        <div>{retry?.deliveredCount ?? ""}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Failed</div>
                        <div>{retry?.failedCount ?? ""}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <ScrollBar orientation="horizontal" className="mt-10 no-scollbar" />
      </ScrollArea>
    </Card>
  );
}
