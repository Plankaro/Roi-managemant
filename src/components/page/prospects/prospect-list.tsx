"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { type Prospect, getProspectsByPage } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";
import { SiShopify,  } from "react-icons/si";
import { IoLogoWhatsapp } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoSyncCircleOutline } from "react-icons/io5";

const ITEMS_PER_PAGE = 12;

export default function ProspectList() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [starredProspects, setStarredProspects] = useState<Set<string>>(
    new Set()
  );
  const isMobile = useIsMobile();
  const { ref, inView } = useInView();

  const fetchProspects = async (pageNum: number, append = false) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const {
        prospects: newProspects,
        totalPages: total,
        hasMore: more,
      } = getProspectsByPage(pageNum, ITEMS_PER_PAGE);

      if (append) {
        setProspects((prev) => [...prev, ...newProspects]);
      } else {
        setProspects(newProspects);
      }

      setTotalPages(total);
      setHasMore(more);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProspects(1);
  }, []); // Removed fetchProspects from dependencies

  useEffect(() => {
    if (isMobile && inView && hasMore && !isLoading) {
      fetchProspects(page + 1, true);
      setPage((p) => p + 1);
    }
  }, [inView, isMobile, hasMore, isLoading, page]); // Removed fetchProspects from dependencies

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchProspects(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getStatusColor = (status: Prospect["status"]) => {
    const colors = {
      Lead: "bg-blue-500",
      Customer: "bg-green-500",
      "Qualified Lead": "bg-purple-500",
      Negotiation: "bg-yellow-500",
      Lost: "bg-red-500",
      Others: "bg-gray-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const toggleStar = (id: string) => {
    setStarredProspects((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        {prospects.map((prospect) => (
          <Card
            key={prospect.id}
            className="border-primary border text-white bg-[#0D0D0D4D] h-fit"
          >
            <div className="p-4 flex items-start gap-3">
              <div className="relative">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src="https://plus.unsplash.com/premium_photo-1733514432878-6b37d15df62a?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt={prospect.initial}
                  />
                  <AvatarFallback>{prospect.initial}</AvatarFallback>
                </Avatar>
                <IoLogoWhatsapp fill={"#10F600"} className="absolute bottom-0 right-0"/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium truncate">
                    {prospect.email}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 text-gray-400 "
                    onClick={() => toggleStar(prospect.id)}
                  >
                    <Star
                      className="h-4 w-4"
                      fill={
                        starredProspects.has(prospect.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </Button>
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1 bg-[#4166AE24] py-2 px-2">
                    <span
                      className=""
                    />
                    <IoSyncCircleOutline/>
                    {prospect.status}
                  </div>
                  <span className="bg-[#4166AE24] py-2 px-2">{prospect.timestamp}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isMobile ? (
        hasMore && (
          <div ref={ref} className="flex justify-center p-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        )
      ) : (
        <div className="mt-6 flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="h-8 w-8 !rounded-none bg-[#0D0D0D4D] border border-primary"
        >
          {"<"}
        </Button>
      
        {[1, 2, 3].map((pageNum) => (
          <Button
            key={pageNum}
            variant={page === pageNum ? "default" : "outline"}
            onClick={() => handlePageChange(pageNum)}
            className="h-8 w-8 !rounded-none bg-[#0D0D0D4D] border border-primary"
          >
            {pageNum}
          </Button>
        ))}
      
        <Button
          variant="outline"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="h-8 w-8 !rounded-none bg-[#0D0D0D4D] border border-primary"
        >
          {">"}
        </Button>
      </div>
      )}
    </div>
  );
}
