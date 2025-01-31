/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { Link, LinkIcon } from "lucide-react"
import { useEffect } from "react"
import { Avatar } from "@/components/ui/avatar"
import { useGetChatsQuery } from "@/store/features/apislice"
import { useSocket } from "@/app/socketProvider"
import { useDispatch, useSelector } from "react-redux"
import { setChats } from "@/store/features/chatSlice"
import type { RootState } from "@/store/store"

export type Chat = {
  id: string
  chatId: string
  senderPhoneNo: string
  receiverPhoneNo: string
  sendDate: Date
  template_used: boolean
  template_name?: string
  header_type?: HeaderType
  header_url?: string
  body_type: BodyType
  body_attachmentUrl: string[]
  body_text?: string
  footer_included: boolean
  footer_url?: string
  footer_text?: string
  createdAt: Date
  updatedAt: Date
  deleted: boolean
  Status: MessageStatus
  prospectId?: string
}

export enum MessageStatus {
  Pending = "pending",
  Sent = "sent",
  Delivered = "delivered",
  Read = "read",
}

export enum HeaderType {
  Image = "Image",
  Video = "Video",
  Document = "Document",
}

export enum BodyType {
  Image = "image",
  Text = "text",
  Document = "document",
}

function Messages({ selectedProspect }: { selectedProspect: any }) {
  const myPhoneNo = "15551365364" // Your phone number
  const { data } = useGetChatsQuery({
    client_no: myPhoneNo,
    prospect_no: selectedProspect.phoneNo,
  })

  const chats = useSelector((state: RootState) => state.chat)
  const selectedChats = chats.chats.filter(
    (chat: any) =>
      (chat.senderPhoneNo === myPhoneNo && chat.receiverPhoneNo === selectedProspect.phoneNo.slice(1)) ||
      (chat.receiverPhoneNo === myPhoneNo && chat.senderPhoneNo === selectedProspect.phoneNo.slice(1)),
  )

  const dispatch = useDispatch()

  const socket = useSocket()



  useEffect(() => {
    if (data) {
      dispatch(setChats(data))
    }
  }, [data,dispatch])

  useEffect(() => {
    console.log("Connecting socket...")
    socket.connect()

    socket.on("connect", () => {
      console.log("Socket connected!")
    })

    socket.on("message", (messageData) => {
      dispatch(setChats(messageData))
    })

    return () => {
      console.log("Disconnecting socket...")
      socket.disconnect()
    }
  }, [socket])

  return (
    <ScrollArea className="flex-1 pt-20 pb-4">
      <div className="space-y-4 p-4">
        {selectedChats.map((chat) => {
          const isMyMessage = chat.senderPhoneNo === myPhoneNo
          console.log(chat)
          return (
            <div key={chat.chatId} className={`flex flex-col max-w-[85%] ${isMyMessage ? "ml-auto" : "mr-auto"}`}>
              <div className="flex gap-3 items-start">
                {!isMyMessage && (
                  <Avatar className="h-8 w-8 shrink-0">
                    <Image
                      fill
                      src={selectedProspect.image || "/placeholder.svg"}
                      alt={selectedProspect.name}
                      className="object-cover"
                    />
                  </Avatar>
                )}
                <div className={`flex-1 flex flex-col gap-1 ${isMyMessage ? "items-end" : "items-start"}`}>
                  <div
                    className={`p-4 rounded-2xl ${
                      isMyMessage
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-[#ECF0F7] text-gray-800 rounded-tl-none"
                    }`}
                  >
                    {chat.body_attachmentUrl.length > 0 && (
                      <div className="mb-2 -mt-1 -mx-1">
                        <Image
                          src={chat.body_attachmentUrl[0] || "/placeholder.svg"}
                          alt="Chat image"
                          width={300}
                          height={200}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    )}
                    <p className="text-sm">{chat.body_text}</p>
                    {chat.footer_included && chat.footer_url && chat.footer_text && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <Link href={chat.footer_url} target="_blank">
                          <Button
                            variant="outline"
                            size="sm"
                            className={`text-xs mt-2 ${
                              isMyMessage
                                ? "bg-white/10 text-white hover:bg-white/20 border-white/20"
                                : "bg-white text-blue-600 hover:bg-gray-50"
                            }`}
                          >
                            <LinkIcon className="h-3 w-3 mr-1" />
                            {chat.footer_text}
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                {isMyMessage && (
                  <Avatar className="h-8 w-8 shrink-0">
                    <Image fill src={"/placeholder.svg"} alt="Me" className="object-cover" />
                  </Avatar>
                )}
              </div>
              <span className={`text-xs text-gray-400 mt-1 ${isMyMessage ? "ml-auto" : "mr-auto"}`}>
                {new Date(chat.sendDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}

export default Messages

