/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { type Prospect, getProspectsByPage } from "@/lib/data";
import { IoLogoWhatsapp } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoSyncCircleOutline } from "react-icons/io5";
import type { CustomerProspect, CustomerProspectList } from "@/zod/types";

import Link from "next/link";
import ShopifyLogo from "@/components/icons/shopify";
import { useCreateStarredCustomerMutation } from "@/store/features/apislice";
import toast from "react-hot-toast";

export default function ProspectList({
  prospects,
  onSave,
}: {
  prospects: CustomerProspect[];
  onSave: () => void;
}) {
  const [createStarredCustomer] = useCreateStarredCustomerMutation()
  // const [prospects, setProspects] = useState<Prospect[]>([])

  // const [hasMore, setHasMore] = useState(true)
  // const [isLoading, setIsLoading] = useState(true)
  // const [starredProspects, setStarredProspects] = useState<Set<string>>(new Set())

  // // Set up the intersection observer for infinite scrolling
  // const { ref, inView } = useInView({
  //   threshold: 0.1,
  //   rootMargin: "100px",
  // })

  // const fetchProspects = useCallback(async (pageNum: number, append = false) => {
  //   setIsLoading(true)
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 500))
  //     const { prospects: newProspects, totalPages: total, hasMore: more } = getProspectsByPage(pageNum, ITEMS_PER_PAGE)

  //     if (append) {
  //       setProspects((prev) => [...prev, ...newProspects])
  //     } else {
  //       setProspects(newProspects)
  //     }

  //     setHasMore(more)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }, [])

  // // Initial data fetch
  // useEffect(() => {
  //   fetchProspects(1)
  // }, [fetchProspects])

  // // Infinite scroll effect for both mobile and desktop
  // useEffect(() => {
  //   if (inView && hasMore && !isLoading) {
  //     fetchProspects(page + 1, true)
  //     setPage((p) => p + 1)
  //   }
  // }, [inView, hasMore, isLoading, page, fetchProspects])

  // const getStatusColor = (status: Prospect["status"]) => {
  //   const colors = {
  //     Lead: "bg-blue-500",
  //     Customer: "bg-green-500",
  //     "Qualified Lead": "bg-purple-500",
  //     Negotiation: "bg-yellow-500",
  //     Lost: "bg-red-500",
  //     Others: "bg-gray-500",
  //   }
  //   return colors[status] || "bg-gray-500"
  // }

  // const toggleStar = (id: string) => {
  //   setStarredProspects((prev) => {
  //     const newSet = new Set(prev)
  //     if (newSet.has(id)) {
  //       newSet.delete(id)
  //     } else {
  //       newSet.add(id)
  //     }
  //     return newSet
  //   })
  // }
  const toogleStar = async(prospect_id:string,event:any)=>{
    try {
      event.preventDefault()
      event.stopPropagation()
  
      const promise = createStarredCustomer({ customerId: prospect_id })
      toast.promise(promise,{
        loading: "updating...",
        success: "Starred updated successfully!",
        error: (error: any) =>
          error?.data?.message || "An unexpected error occurred.",
      })
      //console.log("starred")
      onSave()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {prospects &&
          prospects.map((prospect: CustomerProspect) => (
            <Link
              href={`/prospects/${prospect?.shopifyCustomer?.shopify_id}`}
              key={prospect?.shopifyCustomer?.shopify_id}
            >
              <Card className="border-primary border text-white bg-[#0D0D0D4D] h-fit">
                <div className="p-4 flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="h-16 w-16 ">
                      <AvatarImage
                        src={prospect?.prospectData?.image ?? ""}
                        alt={
                          prospect?.prospectData?.name ||
                          prospect?.shopifyCustomer?.name ||
                          ""
                        }
                      />
                      <AvatarFallback className="bg-primary">
                        {prospect?.prospectData?.name
                          .slice(0, 2)
                          .toUpperCase() ||
                          prospect?.shopifyCustomer?.name
                            .slice(0, 2)
                            .toUpperCase() ||
                          ""}
                      </AvatarFallback>
                    </Avatar>
                   <ShopifyLogo className="absolute bottom-0 right-0 h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium truncate">
                        {prospect?.prospectData?.name ||
                          prospect?.shopifyCustomer?.name ||
                          prospect?.shopifyCustomer?.phone ||
                          prospect.prospectData?.phoneNo ||
                          ""}
                      </p>
                      <button className="h-5 w-5 text-gray-400" onClick={(e)=>toogleStar(prospect?.shopifyCustomer?.shopify_id,e)}>
                      
                        <Star className={`h-4 w-4 hover:fill-gray-400 ${prospect?.starredContact ? "fill-gray-400" : ""}`} />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1 bg-[#4166AE24] py-2 px-2">
                        <IoSyncCircleOutline />
                        {prospect?.prospectData?.lead || "no lead found"}
                      </div>
                      <span className="bg-[#4166AE24] py-2 px-2">
                       
                        {prospect?.prospectData?.last_Online &&
                        new Date(
                          prospect.prospectData.last_Online
                        ).toString() !== "Invalid Date"
                          ? new Date(
                              prospect.prospectData.last_Online
                            ).toLocaleString()
                          : "no online status found"}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
      </div>

      {/* Loading indicator for infinite scroll - shown for both mobile and desktop */}
      {/* {hasMore && (
        <div ref={ref} className="flex justify-center p-4 mt-4">
          {isLoading ? (
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <div className="h-8 invisible">Load more</div>
          )}
        </div>
      )} */}
    </div>
  );
}
