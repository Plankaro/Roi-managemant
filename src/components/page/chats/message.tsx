/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { IoIosDocument } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FaRobot } from "react-icons/fa6";
import { Avatar, AvatarImage,AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import type { RootState } from '@/store/store';
import { getStatusIcon } from './getchatstatus';
import { getChatsForProspect } from '../broadcast/getchats';
import { markLastChatAsRead } from '@/store/features/prospect';
import { useGetChatsQuery, useMarkMessagesAsReadMutation } from '@/store/features/apislice';
import { setChats } from '@/store/features/chatSlice';

function MessagesSkeleton() {
  return (
    <ScrollArea className="flex-1 pt-20 pb-4">
      <div className="space-y-4 p-4">
        {[...Array(5)].map((_, i) => {
          const isMyMessage = i % 2 === 0;
          return (
            <div key={i} className={`flex flex-col max-w-[85%] ${isMyMessage ? "ml-auto" : "mr-auto"}`}>
              <div className="flex gap-3 items-start">
                {!isMyMessage && <Skeleton className="h-8 w-8 rounded-full bg-white/10" />}
                <div className={`flex-1 flex flex-col gap-1 ${isMyMessage ? "items-end" : "items-start"}`}>
                  <div className={`p-4 rounded-2xl ${isMyMessage ? "bg-blue-600/30 rounded-tr-none" : "bg-[#ECF0F7]/20 rounded-tl-none"}`}>
                    {i % 3 === 0 && (
                      <div className="mb-2 -mt-1 -mx-1">
                        <Skeleton className="w-full h-[200px] rounded-lg bg-white/10" />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-48 bg-white/10" />
                      <Skeleton className="h-4 w-32 bg-white/10" />
                    </div>
                  </div>
                </div>
                {isMyMessage && <Skeleton className="h-8 w-8 rounded-full bg-white/10" />}
              </div>
              <div className={`mt-1 ${isMyMessage ? "ml-auto" : "mr-auto"}`}>
                <Skeleton className="h-3 w-12 bg-white/10" />
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}

function Messages() {

  const [markMessagesAsRead] = useMarkMessagesAsReadMutation();
  const dispatch = useDispatch();
  
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const selectedProspect = useSelector((state: RootState) => state.Prospect.selectedProspect);
  const selectedChats = useSelector(getChatsForProspect);
 
  const { data: chats, isLoading: isChatsLoading } = useGetChatsQuery({
    prospectId: selectedProspect?.id ?? "",
  });

  console.log(chats);


  useEffect(() => {
    if (chats) {
      dispatch(setChats(chats));

    }
  },[chats]);
  // Handle marking messages as read
  useEffect(() => {
    if (selectedChats && selectedChats.length > 0 && (selectedProspect?.phoneNo !== selectedChats?.[0]?.receiverPhoneNo || selectedProspect?.chats?.[0]?.Status !== "read")) {
      dispatch(markLastChatAsRead());
      markMessagesAsRead({ prospectId: selectedProspect?.id ?? "" });
    }
  }, [selectedChats, selectedProspect, dispatch, markMessagesAsRead]);

  // Scroll to bottom whenever messages change or component mounts
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollContainerRef.current) {
        const scrollElement = scrollContainerRef.current;
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    };

    // Scroll immediately
    scrollToBottom();

    // Also scroll after a short delay to handle dynamic content loading
    const timeoutId = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(timeoutId);
  }, [selectedChats]); // Dependency on selectedChats ensures we scroll when messages change


  return (
    <>
      {isChatsLoading ? (
        <MessagesSkeleton />
      ) : (
        <ScrollArea className="flex-1 pt-20 pb-4  bg-backgroundColor overscroll-y-auto no-scrollbar">
          <div 
            className="space-y-4 p-4 w-full h-full flex-1 " 
           
          >
            {selectedChats && selectedChats.length > 0 ? (
              selectedChats.map((chat: any) => {
                const isMyMessage = chat.receiverPhoneNo === selectedProspect?.phoneNo;
                return (
                  <div
                    key={chat.chatId}
                    className={`flex flex-col xl:max-w-[40%] lg:max-w-[50%] md:max-w-[70%] sm:max-w-[85%] ${isMyMessage ? "ml-auto" : "mr-auto"}`}
                  >
                    {/* For medium to large screens - horizontal layout */}
                    <div className={`hidden md:flex gap-3 items-start`}>
                      {!isMyMessage && (
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarImage
                            
                            src={selectedProspect?.image ?? ""}
                            alt={selectedProspect?.name ?? ""}
                            className="object-cover"
                          />
                          <AvatarFallback>{selectedProspect?.name?.charAt(0).toUpperCase()}</AvatarFallback>

                        </Avatar>
                      )}
                      <div className={`flex-1 flex flex-col gap-1 ${isMyMessage ? "items-end" : "items-start"}`}>
                        <div
                          className={`p-4 rounded-2xl max-w-72 whitespace-normal break-words overflow-hidden ${
                            isMyMessage
                              ? "bg-blue-600 text-white rounded-tr-none"
                              : "bg-[#ECF0F7] text-gray-800 rounded-tl-none"
                          }`}
                        >
                          {renderMessageContent(chat, isMyMessage)}
                        </div>
                      </div>
                      <MessageAvatar isMyMessage={isMyMessage} chat={chat} />
                    </div>

                    {/* For smaller screens - vertical layout */}
                    <div className={`block md:hidden`}>
                      <div className={`w-full flex ${isMyMessage ? "justify-end" : "justify-start"} mb-2`}>
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={
                              isMyMessage
                                ? "https://github.com/shadcn.png"
                                : selectedProspect?.image || "https://github.com/shadcn.png" || "/placeholder.svg"
                            }
                            alt={isMyMessage ? "Me" : (selectedProspect?.name ?? "")}
                            className="object-cover"
                          />
                        </Avatar>
                      </div>
                      <div className={`w-full flex ${isMyMessage ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`p-4 rounded-2xl max-w-full whitespace-normal break-words overflow-hidden ${
                            isMyMessage
                              ? "bg-blue-600 text-white rounded-tr-none"
                              : "bg-[#ECF0F7] text-gray-800 rounded-tl-none"
                          }`}
                        >
                          {renderMessageContent(chat, isMyMessage)}
                        </div>
                      </div>
                    </div>

                    <span className={`text-xs text-gray-400 mt-1 ${isMyMessage ? "ml-auto" : "mr-auto"}`}>
                      {new Date(chat.sendDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="text-center h-full w-full flex-1 justify-center items-center text-white">
                No chats found
              </div>
            )}
          </div>
        </ScrollArea>
      )}
    </>
  );
}

// Helper function to render message content
function renderMessageContent(chat: any, isMyMessage: boolean) {
  return (
    <>
      {chat.header_type === "IMAGE" && (
        <div className="mb-2 -mt-1 -mx-1">
          <Image
            src={chat.header_value || "/placeholder.svg"}
            alt="Chat image"
            width={300}
            height={200}
            className="w-full aspect-video h-auto rounded-lg"
          />
        </div>
      )}
      {chat.header_type === "TEXT" && (
        <div className="mb-2 -mt-1 -mx-1">
          <p className="text-sm">{chat.header_value}</p>
        </div>
      )}
      {chat.header_type === "VIDEO" && (
        <div className="mb-2 -mt-1 -mx-1">
          <video src={chat.header_value} controls className="w-full rounded-lg" />
        </div>
      )}
      {chat.header_type === "DOCUMENT" && (
        <div className="mb-2 -mt-1 -mx-1">
          <p className="text-sm">
            <a href={chat.header_value}>
              <IoIosDocument />
            </a>
          </p>
        </div>
      )}
      <p className="sm:text-sm text-xs break-all whitespace-pre-line">{chat.body_text}</p>
      {chat.footer_included && chat?.footer_text && chat?.footer_text.length > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-200 sm:text-sm text-xs text-gray-400 break-all">
          {chat.footer_text}
        </div>
      )}
      <div className="flex flex-col gap-2 mt-2 ">
        {chat?.Buttons &&
          chat.Buttons.length > 0 &&
          chat.Buttons.map((button: any, index: any) => {
            if (button.type === "URL") {
              return (
                <Button key={index} className="bg-primary-100 lg:text-base sm:text-sm text-xs  w-full text-black hover:bg-primary hover:text-white">
                  <a href={button.value} target="_blank" rel="noopener noreferrer">
                    {button.text}
                  </a>
                </Button>
              );
            } else {
              return (
                <Button key={index} className="bg-primary-100 lg:text-base sm:text-sm text-xs w-full text-black hover:bg-primary hover:text-white">
                  {button.text}
                </Button>
              );
            }
          })}
      </div>
      <div className={`mt-2 w-full ${isMyMessage ? "flex" : "hidden"} justify-end text-[10px] items-center gap-2`}>
        {getStatusIcon(chat.Status)}
        {chat.Status}
      </div>
    </>
  );
}



interface Chat {
  sender?: {
    image?: string;
    name?: string;
  };
  // …other chat fields
}

interface Props {
  isMyMessage: boolean;
  chat: Chat;
}

 function MessageAvatar({ isMyMessage, chat }: Props) {
  if (!isMyMessage) return null;

  return chat.sender ? (
    <Avatar className="h-8 w-8 shrink-0">
      <AvatarImage
        src={chat.sender.image || "/placeholder.svg"}
        alt={chat.sender.name ?? "User"}
        className="object-cover"
      />
      <AvatarFallback>
        {chat.sender.name
          ? chat.sender.name.charAt(0).toUpperCase()
          : "U"}
      </AvatarFallback>
    </Avatar>
  ) : (
    <div className='h-8 w-8 rounded-full flex items-center justify-center shrink-0 bg-white'>
    <FaRobot className="h-6 w-6 text-zinc-400 shrink-0" aria-label="Bot" />
    </div>
  );
}

export default Messages;