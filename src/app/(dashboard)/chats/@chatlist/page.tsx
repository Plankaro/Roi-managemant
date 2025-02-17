/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
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
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import { getStatusIcon } from "@/components/page/chats/getchatstatus";



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
  const session:any = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const {data,isLoading} = useGetProspectQuery({})
  const [searchQuery, setSearchQuery] = useState("");
  const user = session?.data?.user?.user
  const {selectedProspect,prospects} = useSelector((state: RootState) => state.Prospect);
  console.log(prospects)

  
  useEffect(() => {
    if (data) {
      dispatch(addProspect(data));
      console.log("added");
    }
  }, [data, dispatch]);

  const filteredProspects = prospects.filter((contact: any) => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    return (
      (contact.name && contact.name.toLowerCase().includes(lowerQuery)) ||
      (contact.email && contact.email.toLowerCase().includes(lowerQuery)) ||
      (contact.phoneNo && contact.phoneNo.toLowerCase().includes(lowerQuery))
    );
  });

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white/5 border-gray-700 text-white placeholder:text-gray-400 w-full md:max-w-[18.75rem]"
          />
        </div>
      </div>
      {isLoading ? <ChatListSkeleton />:  <ScrollArea className="w-full no-scrollbar">
        <div className="space-y-2 p-1 w-full">
          {filteredProspects  && filteredProspects.map((contact: any) => {
           console.log(user?.buisness?.whatsapp_mobile ,contact.chats[0]?.receiverPhoneNo)
         
            return(
              <button
              key={contact.id}
              className={cn(
                " p-3 rounded-md text-left transition-colors w-full overflow-y-auto",
                selectedProspect?.id==contact.id ? "bg-primary text-white":"hover:bg-gray-900 hover:text-white"
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
                      alt="/placeholder.svg"
                      className="object-cover lg:h-14 lg:w-14 h-10 w-10"
                     
                    />
                   <AvatarFallback   className="object-contain flex bg-gray-500 lg:h-14 lg:w-14 justify-center items-center"
                     >
                        {contact?.name?.slice(0, 2).toUpperCase()??"cn" }
                      </AvatarFallback>
                    
                  </Avatar>

                </div>
                <div className="flex-1 w-full h-14 py-[2px] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white truncate">
                      {contact.name || contact.phoneNo}
                    </p>
                    <span className="text-xs text-gray-400">
                    {contact?.chats?.[0]?.createdAt && format(new Date(contact.chats[0].createdAt), 'hh:mm a')}
                    </span>
                  </div>
                  <div className="flex lg:gap-4 gap-2 items-center justify-between w-full">
                    <p className={`text-sm flex gap-3 items-center   mt-auto basis-3/4`}>
                      
                    <span className={`${user?.buisness?.whatsapp_mobile===contact.chats[0]?.receiverPhoneNo && "hidden"} text-white`}> {getStatusIcon(contact.chats?.[0]?.Status)} </span>
                    <span className={`line-clamp-1 ${user?.buisness?.whatsapp_mobile===contact.chats[0]?.receiverPhoneNo && contact.chats?.[0]?.Status=="delivered" ? "font-black text-white":"text-gray-400"}`}>{contact.chats?.[0]?.body_text??"Send your first message"}</span>
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
