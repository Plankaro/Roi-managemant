/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Link, LinkIcon } from "lucide-react";
import { useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useGetChatsQuery } from "@/store/features/apislice";
import { useSocket } from "@/app/socketProvider";
import { useDispatch, useSelector } from "react-redux";
import { Chat, setChats } from "@/store/features/chatSlice";
import type { RootState } from "@/store/store";
import { Skeleton } from "@/components/ui/skeleton";
import { IoIosDocument } from "react-icons/io";
import { orderBy } from "lodash";
import { Clock, Send, Check, CheckCircle2, AlertCircle } from "lucide-react";
import { updateLastChat } from "@/store/features/prospect";
import { getStatusIcon } from "./getchatstatus";
import { createSelector } from "@reduxjs/toolkit";
import { getChatsForProspect } from "../broadcast/getchats";
import { useSession } from "next-auth/react";


function MessagesSkeleton() {
  return (
    <ScrollArea className="flex-1 pt-20 pb-4">
      <div className="space-y-4 p-4">
        {[...Array(5)].map((_, i) => {
          const isMyMessage = i % 2 === 0; // Alternate between sent and received messages

          return (
            <div
              key={i}
              className={`flex flex-col max-w-[85%] ${
                isMyMessage ? "ml-auto" : "mr-auto"
              }`}
            >
              <div className="flex gap-3 items-start">
                {!isMyMessage && (
                  <Skeleton className="h-8 w-8 rounded-full bg-white/10" />
                )}
                <div
                  className={`flex-1 flex flex-col gap-1 ${
                    isMyMessage ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`p-4 rounded-2xl ${
                      isMyMessage
                        ? "bg-blue-600/30 rounded-tr-none"
                        : "bg-[#ECF0F7]/20 rounded-tl-none"
                    }`}
                  >
                    {/* Randomly show image skeleton */}
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
                {isMyMessage && (
                  <Skeleton className="h-8 w-8 rounded-full bg-white/10" />
                )}
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
function Messages({ isLoading }: { isLoading: boolean }) {

  const session:any = useSession();
  const user = session?.data?.user?.user 
  const myPhoneNo= user?.buisness?.whatsapp_mobile??"";// Your phone number

  const selectedProspect = useSelector(
    (state: RootState) => state.Prospect.selectedProspect
  );


  // Use the selector you defined outside the component
  const selectedChats = useSelector(getChatsForProspect);

  return (
    <>
      {isLoading ? (
        <MessagesSkeleton />
      ) : (
        <ScrollArea className="flex-1  pt-20 pb-4 bg-backgroundColor">
          <div className="space-y-4 p-4 w-full h-full flex-1">
            {selectedChats && selectedChats.length > 0 ? (
              selectedChats.map((chat: any) => {
                const isMyMessage = chat.senderPhoneNo === myPhoneNo;
                return (
                  <div
                    key={chat.chatId}
                    className={`flex flex-col xl:max-w-[40%] lg:max-w-[50%] md:max-w-[70%] sm:max-w-[85%] ${
                      isMyMessage ? "ml-auto" : "mr-auto" 
                    }`}
                  >
                    <div className="flex gap-3 items-start">
                      {!isMyMessage && (
                        <Avatar className="h-8 w-8 shrink-0">
                          <Image
                            fill
                            src={
                              selectedProspect?.image ||
                              "https://github.com/shadcn.png"
                            }
                            alt={selectedProspect?.name ?? ""}
                            className="object-cover"
                          />
                        </Avatar>
                      )}
                      <div
                        className={`flex-1 flex flex-col gap-1 ${
                          isMyMessage ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`p-4 rounded-2xl ${
                            isMyMessage
                              ? "bg-blue-600 text-white rounded-tr-none"
                              : "bg-[#ECF0F7] text-gray-800 rounded-tl-none"
                          }`}
                        >
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
                              <video
                                src={chat.header_value}
                                controls
                                className="w-full rounded-lg"
                              />
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
                          <p className="sm:text-sm text-xs">
                            {chat.body_text}
                          </p>
                          {chat.footer_included &&
                            chat?.footer_text &&
                            chat?.footer_text.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-gray-200 sm:text-sm text-xs text-gray-400">
                                {chat.footer_text}
                              </div>
                            )}
                          <div className="flex flex-col gap-2 mt-2">
                            {chat?.Buttons &&
                              chat.Buttons.length > 0 &&
                              chat.Buttons.map((button: any, index: any) => {
                                if (button.type === "URL") {
                                  return (
                                    <Button
                                      key={index}
                                      className="bg-primary-100 w-full text-black hover:bg-primary hover:text-white"
                                    >
                                      <a
                                        href={button.value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {button.text}
                                      </a>
                                    </Button>
                                  );
                                } else {
                                  return (
                                    <Button
                                      key={index}
                                      className="bg-primary-100 w-full text-black hover:bg-primary hover:text-white"
                                    >
                                      {button.text}
                                    </Button>
                                  );
                                }
                              })}
                          </div>
                          <div
                            className={`mt-2 w-full ${
                              isMyMessage ? "flex" : "hidden"
                            } justify-end text-[10px] items-center gap-2`}
                          >
                            {getStatusIcon(chat.Status)}
                            {chat.Status}
                          </div>
                        </div>
                      </div>
                      {isMyMessage && (
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarImage
                            src={"https://github.com/shadcn.png"}
                            alt="Me"
                            className="object-cover"
                          />
                        </Avatar>
                      )}
                    </div>
                    <span
                      className={`text-xs text-gray-400 mt-1 ${
                        isMyMessage ? "ml-auto" : "mr-auto"
                      }`}
                    >
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

export default Messages;



