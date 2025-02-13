/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Person from "@/components/icons/person";
import PersonAlert from "@/components/icons/person-alert";
import ScrollableContactDialog from "@/components/page/chats/contacts";
import { useGetProspectQuery } from "@/store/features/apislice";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useSelector, useDispatch } from "react-redux";
import { RootState,AppDispatch } from "@/store/store";
import { selectProspect } from "@/store/features/prospect";
import FilterDropdown from "@/components/page/chats/filter-dropdown";
import { Skeleton } from "@/components/ui/skeleton";
import { addProspect } from "@/store/features/prospect";
import { useEffect } from "react";


export function ChatListSkeleton() {
  return (
    <div className="space-y-2 p-2 w-full animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="p-3 rounded-lg w-full bg-white/5 backdrop-blur-lg">
          <div className="flex items-center gap-5">
            <Skeleton className="h-14 w-14 rounded-full bg-white/10" />
            <div className="flex-1 w-full h-14 py-[2px] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24 bg-white/10" />
                <Skeleton className="h-3 w-12 bg-white/10" />
              </div>
              <div className="flex gap-10 items-center justify-between w-full">
                <Skeleton className="h-3 w-40 bg-white/10" />
                <Skeleton className="h-4 w-4 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const ChatLists = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {data,isLoading} = useGetProspectQuery({})
 
  const {selectedProspect,prospects} = useSelector((state: RootState) => state.Prospect);
  console.log(prospects)

  
  useEffect(() => {
    if (data) {
      dispatch(addProspect(data));
      console.log("added");
    }
  }, [data, dispatch]);

  console.log(selectedProspect)
  return (
    <div className={`md:max-w-md md:flex   ${selectedProspect ? "hidden" : "flex"} w-full border rounded-[20px] xl:basis-2/5 md:basis-4/12 border-primary backdrop-blur-xl flex-col h-full overflow-hidden  `}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">All Chats</h2>
          {/* <ScrollableContactDialog>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-blue-900 border-none rounded-[10px] text-white"
           
          >
       

            <BookOpen className="h-4 w-4" /> contacts
          </Button>
          </ScrollableContactDialog> */}
        </div>
        <div className="w-full flex my-5 md:hidden justify-between">
        <FilterDropdown>
         <span className="text-lg">Filters</span> 
          </FilterDropdown>
          <span className="text-red-500">clear all</span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search here..."
            className="pl-9 bg-white/5 border-gray-700 text-white placeholder:text-gray-400 w-full md:max-w-[18.75rem]"
          />
        </div>
      </div>
      {isLoading ? <ChatListSkeleton />:  <ScrollArea className="w-full no-scrollbar">
        <div className="space-y-2 p-2 w-full">
          {prospects && prospects.map((contact: any) => {
         
            return(
              <button
              key={contact.id}
              className={cn(
                " p-3 rounded-lg text-left transition-colors w-full ",
                selectedProspect?.id==contact.id ? "bg-primary text-white":"hover:bg-primary hover:text-white"
              )}
              onClick={() => {
                dispatch(selectProspect(contact));
              }}

            >
              <div className="flex items-center gap-5">
                <div className="relative">
                  <Avatar className="lg:h-14 lg:w-14">
                    <AvatarImage
                      src={contact.image}
                      alt="@shadcn"
                      className="object-contain lg:h-14 lg:w-14 h-10 w-10"
                     
                    />
                   <AvatarFallback   className="object-contain flex bg-gray-500 lg:h-14 lg:w-14 justify-center items-center"
                     >
                        {contact?.name?.slice(0, 2).toUpperCase()??""}
                      </AvatarFallback>
                    
                  </Avatar>

                </div>
                <div className="flex-1 w-full h-14 py-[2px] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white truncate">
                      {contact.name}
                    </p>
                    <span className="text-xs text-gray-400">
                      {contact.message?.[0].created_at??""}
                    </span>
                  </div>
                  <div className="flex lg:gap-4 gap-2 items-center justify-between w-full">
                    <p className="text-sm text-gray-400 line-clamp-1 mt-auto max-w-56">
                      {contact.chats?.[0]?.body_text??"Send your first message"}
                    </p>

                  {contact.assignedTo ? <Person /> : <PersonAlert />}
                  </div>
                </div>
              </div>
            </button>
            )
         
          })}
        </div>
      </ScrollArea>}
    
    </div>
  );
};

export default ChatLists;
