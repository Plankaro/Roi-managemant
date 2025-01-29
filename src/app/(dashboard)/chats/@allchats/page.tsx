"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AirplayIcon as Broadcast,
  Layout,
  LineChart,
  MessageSquare,
  PlusCircle,
  Hourglass,
  Users,
  Bot,
  Database,
  EllipsisVertical,
  BotIcon,
  User,
  LinkIcon,
  Mail,
  Phone,
  X,
  Shield,
  Trash2,
  ChevronLeft,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { UserRound } from "lucide-react"
import Link from "next/link"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDispatch } from "react-redux"
import { clearProspect } from "@/store/features/prospectslice"




type Chat = {
  id: string
  chatId: string
  receiverId: string
  sendDate: Date
  template_used: boolean
  template_name: string
  header_type?: string
  header_url?: string
  body_attachment_included: boolean
  body_attachmentUrl: string[]
  body_text?: string
  footer_included: boolean
  footer_url?: string
  footer_text?: string
  createdAt: Date
  updatedAt: Date
  deleted: boolean
  Status: string
}

const chats: Chat[] = [
  {
    id: "3",
    chatId: "chat1",
    receiverId: "user1",
    sendDate: new Date("2023-05-10T10:10:00"),
    template_used: false,
    template_name: "",
    body_attachment_included: true,
    body_attachmentUrl: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"],
    body_text: "I'm good too! By the way, have you seen our latest product?",
    footer_included: true,
    footer_url: "https://example.com/product",
    footer_text: "View Product",
    createdAt: new Date("2023-05-10T10:10:00"),
    updatedAt: new Date("2023-05-10T10:10:00"),
    deleted: false,
    Status: "SENT",
  },
  {
    id: "2",
    chatId: "chat1",
    receiverId: "me",
    sendDate: new Date("2023-05-10T10:05:00"),
    template_used: false,
    template_name: "",
    body_attachment_included: false,
    body_attachmentUrl: [],
    body_text: "Hi! I'm doing great, thanks for asking. How about you?",
    footer_included: false,
    createdAt: new Date("2023-05-10T10:05:00"),
    updatedAt: new Date("2023-05-10T10:05:00"),
    deleted: false,
    Status: "SENT",
  },
  {
    id: "3",
    chatId: "chat1",
    receiverId: "user1",
    sendDate: new Date("2023-05-10T10:10:00"),
    template_used: false,
    template_name: "",
    body_attachment_included: true,
    body_attachmentUrl: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"],
    body_text: "I'm good too! By the way, have you seen our latest product?",
    footer_included: true,
    footer_url: "https://example.com/product",
    footer_text: "View Product",
    createdAt: new Date("2023-05-10T10:10:00"),
    updatedAt: new Date("2023-05-10T10:10:00"),
    deleted: false,
    Status: "SENT",
  },
  {
    id: "3",
    chatId: "chat1",
    receiverId: "user1",
    sendDate: new Date("2023-05-10T10:10:00"),
    template_used: false,
    template_name: "",
    body_attachment_included: true,
    body_attachmentUrl: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"],
    body_text: "I'm good too! By the way, have you seen our latest product?",
    footer_included: true,
    footer_url: "https://example.com/product",
    footer_text: "View Product",
    createdAt: new Date("2023-05-10T10:10:00"),
    updatedAt: new Date("2023-05-10T10:10:00"),
    deleted: false,
    Status: "SENT",
  },
]

export const contacts = [
  {
    id: 1,
    name: "Grace Miller",
    phone: "+91 9873535637",
    message: "Lorem ipsum dolor sit amet, consectetur adipisc...",
    time: "2:46 pm",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    online: true,
  },
  {
    id: 2,
    name: "Jacob Math",
    phone: "+91 8765498768",
    message: "Lorem ipsum dolor sit amet, consectetur adip...",
    time: "2:46 pm",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
    online: false,
  },
]

export const sidebarItems = [
  { icon: Layout, label: "Overview" },
  { icon: MessageSquare, label: "Chats", active: true },
  { icon: Broadcast, label: "Broadcast" },
  { icon: Bot, label: "AI Builder" },
  { icon: LineChart, label: "Analytics" },
  { icon: Database, label: "Data Integration" },
  { icon: Users, label: "Agents" },
]

const AllChats = () => {
  const selectedProspect = useSelector((state: RootState) => state.selectedProspect?.selectedProspect)
  console.log(selectedProspect)
  const [takeOver, settakeOver] = useState(false)
  const [show, setShow] = useState(false)
  const [selectedContact] = useState(contacts[0])
  console.log(selectedProspect)
  const dispatch = useDispatch()

  useEffect(() => {
    setShow(false)
  },[selectedProspect])

  return (
    <>
      {selectedProspect ? (
        <div className={`md:flex ${selectedProspect ? "flex" : "hidden"} flex-1 rounded-[20px] overflow-hidden relative border border-primary`}>
          <div
            className={`flex flex-col ${show ? "lg:w-[75%] w-full" : "w-full"} relative transition-all duration-300 ease-in-out backdrop-blur-3xl`}
          >
            {/* Header */}
            <div className="p-4 w-full   absolute top-0 z-10 bg-primary/50 glass">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4" onClick={() => setShow(!show)}>
                  <div className="relative flex items-center  gap-5">
                    <button className=" md:hidden flex" onClick={()=>dispatch(clearProspect())}>
                  <ChevronLeft className="text-white" />
                  </button>
                    <Avatar className="sm:h-10 sm:w-10 h-8 w-8">
                      <Image
                        fill
                        src={selectedContact?.avatar || "/placeholder.svg"}
                        alt={selectedContact?.name}
                        className="object-cover"
                      />
                    </Avatar>
                  </div>
                  <div className="relative flex items-center md:gap-10 gap-5 bg">
                    <h3 className="sm:text-lg text-sm font-semibold text-white">{selectedContact?.name}</h3>

                    <div className="flex gap-3  px-3 py-2 rounded-3xl items-center bg-[#A7B8D9]">
                      <Hourglass className="sm:w-4 sm:h-4 w-3 h-3" />
                      <span className="sm:text-sm text-xs">23h 40m</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-white hover:text-white/90 hover:bg-white/10">
                        <EllipsisVertical className="h-10 w-10" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-blue-500 border-0 py-2 text-white ove">
                      <DropdownMenuItem>
                        <Link href={`/orders/${selectedProspect.shopify_id}`} className="flex  pr-14 gap-5">
                          <Image src="/icons/shopify.png" alt="shopify" width={21} height={21} />
                          <span>Create Order</span>
                        </Link>
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem className="mt-6 "> */}
                      <div className="flex mt-6 pr-14 gap-5">
                        <UserRound className="pl-2" />
                        <span>Assign To</span>
                      </div>
                      {/* </DropdownMenuItem> */}
                      <DropdownMenuItem className="ml-3 my-3">Agent 1</DropdownMenuItem>
                      <div className="flex absolute bottom-0 right-0  left-0 items-center  gap-2 px-4 py-3 text-white bg-[#1E2A47] cursor-pointer">
                        <User className="h-4 w-4" />
                        <span>Assigned</span>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 " >
              <div className="space-y-4 p-4">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex flex-col max-w-[80%] ${chat.receiverId === "me" ? "ml-auto items-end" : ""};`}
                  >
                    <div className="flex  gap-2">
                      {chat.receiverId !== "me" && (
                        <Avatar className="h-8 w-8 shrink-0">
                          <Image
                            fill
                            src={contacts[0].avatar || "/placeholder.svg"}
                            alt={contacts[0].name}
                            className="object-cover"
                          />
                        </Avatar>
                      )}
                      <div className={`flex-1 items-center ${chat.receiverId === "me" ? "" : ""};`}>
                        <div
                          className={`p-3 lg:m-6 rounded-lg text-left ${
                            chat.receiverId === "me" ? "bg-blue-600 text-white" : "bg-[#ECF0F7] text-gray-800"
                          };`}
                        >
                          {chat.body_attachment_included && chat.body_attachmentUrl.length > 0 && (
                            <div className="m-5">
                              <Image
                                src={chat.body_attachmentUrl[0] || "/placeholder.svg"}
                                alt="Chat image"
                                width={1300}
                                height={1200}
                                className="w-full h-auto object-cover rounded-lg"
                              />
                            </div>
                          )}
                          <p className="text-sm">{chat.body_text}</p>
                          {chat.footer_included && chat.footer_url && chat.footer_text && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <Link href={chat.footer_url} target="_blank" rel="noopener noreferrer">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className={`text-xs ${
                                    chat.receiverId === "me"
                                      ? "bg-white text-blue-600 hover:bg-gray-100"
                                      : "bg-blue-600 text-white hover:bg-blue-700"
                                  };`}
                                >
                                  <LinkIcon className="h-3 w-3 mr-1" />
                                  {chat.footer_text}
                                </Button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                      {chat.receiverId === "me" && (
                        <Avatar className="h-8 w-8 shrink-0">
                          <Image
                            fill
                            src={contacts[1].avatar || "/placeholder.svg"}
                            alt="Me"
                            className="object-cover"
                          />
                        </Avatar>
                      )}
                    </div>
                    <span
                      className={`text-xs text-gray-400 mt-1 ${chat.receiverId === "me" ? "text-right" : "text-left"};`}
                    >
                      {chat.sendDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            {!takeOver ? (
              <div className="p-4 border-t border-primary bg-[#4064AC80] ">
                <div className="flex items-center gap-2 text-white justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <BotIcon /> <p>This conversation is assigned to a Bot</p>
                  </div>

                  <Button onClick={() => settakeOver(true)} className="bg-blue-600 hover:bg-blue-700 capitalize">
                    Take Over
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-4 border-t border-primary bg-primary rounded-b-[20px]">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-white/90  hover:bg-white/10 aspect-square"
                  >
                    <PlusCircle />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    className="bg-white/5 border-none hover:right-0 focus-visible:ring-0  text-white placeholder:text-gray-400"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700 capitalize">Send</Button>
                </div>
              </div>
            )}
          </div>
          <div
            className={`absolute xl:relative top-0 right-0 h-full  backdrop-blur-3xl transition-all duration-300 ease-in-out transform ${
              show ? "translate-x-0 lg:w-[320px] w-[80%] md:w-[320px] opacity-100" : "translate-x-full w-0 opacity-0"
            } z-50 bg-primary/50`}
            style={{
              visibility: show ? "visible" : "hidden",
              overflow: "hidden",
            }}
          >
            <div className="h-full overflow-y-auto no-scrollbar">
              <div className="p-6 space-y-8">
                {/* Close Button */}
                <button
                  onClick={() => setShow(false)}
                  className=" float-right text-gray-400 hover:text-white z-10"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Profile Section */}
                <div className="flex flex-col justify-center items-center space-y-3 pt-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"
                      alt="Profile"
                    />
                    <AvatarFallback>GM</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-white text-lg font-medium">Grace Miller</h2>
                    <p className="text-red-500 text-sm">Last seen: 2 min ago</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  {[
                    { icon: Mail, text: "Gracemiller@mail.com" },
                    { icon: Phone, text: "+91 9876554321" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-white">
                      <item.icon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}

                  {/* Role Select */}
                  <div className="flex items-center  gap-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <Select>
                      <SelectTrigger className=" bg-transparent border-gray-800 text-white">
                        <SelectValue placeholder="Lead" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lead">Lead</SelectItem>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="prospect">Prospect</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tags Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3">
                      <Select>
                        <SelectTrigger className="w-[140px] bg-blue-600 text-white border-0">
                          <SelectValue placeholder="Tags" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new-customer">New Customer</SelectItem>
                          <SelectItem value="high-priority">High Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="secondary" size="sm" className="bg-blue-500/20 text-white hover:bg-blue-500/30">
                        New Customer
                      </Button>
                      <Button variant="secondary" size="sm" className="bg-blue-500/20 text-white hover:bg-blue-500/30">
                        High Priority
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Shield className="h-5 w-5 mr-2" />
                    Block
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-5 w-5 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {show && <div className="fixed inset-0 bg-black/50 lg:hidden z-40" onClick={() => setShow(false)} />}
        </div>
      ) : (
        <div className={`${selectedProspect ? "flex" : "hidden"} md:flex flex-1 justify-center items-center rounded-[20px] text-white overflow-hidden relative border border-primary`}>
          <div className="text-center">
            <p className="text-xl">Please select a chat</p>
            <p className="text-sm">Kindly select a chat to begin the conversation.</p>
          </div>
        </div>
      )}
    </>
  )
}

export default AllChats

