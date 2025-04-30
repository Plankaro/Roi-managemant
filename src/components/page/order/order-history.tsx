/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronRight } from "lucide-react"
import { format } from 'date-fns';

export default function HistoryView({order,isLoading}:{order:any,isLoading:boolean}) {
  //console.log(order)
  if (isLoading) {
    return(
      <div className="xl:basis-3/12 w-full rounded-3xl  border border-blue-500 p-6 bg-[var(--Background-50,#19191980)] text-white">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">History</h2>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <div className="space-y-1">
              <p className="text-gray-400">Total Spent</p>
              <Skeleton className="h-7 w-24 bg-white/10" />
            </div>
            <div className="space-y-1 text-right">
              <p className="text-gray-400">Orders</p>
              <Skeleton className="h-7 w-16 bg-white/10 ml-auto" />
            </div>
          </div>

          <div className="h-0.5 w-full bg-primary my-4" />

          <div className="divide-y divide-primary no-scrollbar overflow-hidden">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="w-full flex items-center justify-between py-4">
                <div className="space-y-0.5">
                  <Skeleton className="h-4 w-16 bg-white/10" /> 
                  <Skeleton className="h-6 w-24 bg-white/10" />
                </div>
                <div className="text-right space-y-0.5">
                  <Skeleton className="h-4 w-20 bg-white/10 ml-auto" />
                  <Skeleton className="h-4 w-16 bg-white/10 ml-auto" />
                </div>
                <ChevronRight className="w-5 h-5 ml-2 text-blue-500/50" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    )
  }
  return (
    <div className="xl:basis-3/12   h-full   rounded-3xl  border border-blue-500 p-6 bg-[var(--Background-50,#19191980)] text-white ">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">History</h2>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <div className="space-y-1">
              <p className="text-gray-400">Total Spent</p>
              <p className="text-xl text-blue-500">₹ {order?.amountSpent?.amount || 0}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-gray-400">Orders</p>
              <p className="text-xl">{order?.numberOfOrders}</p>
            </div>
          </div>

          <div className="h-0.5 w-full bg-primary my-4" />

          <div className="divide-y divide-primary h-[300px] no-scrollbar overflow-y-auto ">
            {order  && order?.orders.map((order:any) => (
              <button
                key={order.id}
                className="w-full flex items-center justify-between py-4  hover:bg-white/5 transition-colors"
              >
                <div className="space-y-0.5">
                  <p className=" font-medium text-left">{order?.name}</p>
                  <p className="text-lg">₹ {Number(order?.totalPrice).toFixed(2)}</p>
                </div>
                <div className="text-right space-y-0.5">
                  <p className="text-sm">{format(order?.createdAt, 'dd/MM/yy')}</p>
                  <p className="text-sm text-blue-400">{order?.fullyPaid ?"Paid":"Pending"}</p>
                </div>
                <ChevronRight className="w-5 h-5 ml-2 text-blue-500" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

