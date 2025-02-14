/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PlusCircle,
  Hourglass,
  EllipsisVertical,
  BotIcon,
  User,
  Mail,
  Phone,
  X,
  Shield,
  Trash2,
  ChevronLeft,
  LayoutGrid,
  FileText,
  Pencil,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { UserRound } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { clearSelectedProspects } from "@/store/features/prospect";
import { getLastOnlineStatus } from "@/lib/last_online";

import { MdOutlineVideoLibrary } from "react-icons/md";
import Messages from "@/components/page/chats/message";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import TemplateBuilder from "@/components/page/chats/templatedialog";
import { setChats } from "@/store/features/chatSlice";

import {
  useSendMediaMutation,
  useUploadFilesMutation,
  useGetSpecficProspectQuery,
  useGetChatsQuery,
  useSendTextMutation,
  useUpdateProspectMutation
} from "@/store/features/apislice";
import toast from "react-hot-toast";
type FileType = "image" | "video" | "document";

interface FileUploadProps {
  onFileSelect: (file: File, type: FileType) => void;
}

const AllChats = () => {
  const [fileType, setFileType] = useState<FileType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const selectedProspect = useSelector(
    (state: RootState) => state.Prospect?.selectedProspect
  );
  const { data: chats, isLoading: isChatsLoading } = useGetChatsQuery({
    prospectId: selectedProspect?.id ?? "",
  });
  console.log("chats", chats);
  useEffect(() => {
    if (chats) {
      dispatch(setChats(chats));
    }
  });

  const [message, setMessage] = useState("");
  const [sendText, { isLoading }] = useSendTextMutation();
  const [priview,setPreview] = useState("");
  const [uploadFiles, { isLoading: isuploadingfile }] =
    useUploadFilesMutation();
  const [sendMedia, { isLoading: isSendingMedia }] = useSendMediaMutation();
  const [updateProspect, { isLoading: isUpdatingProspect }] = useUpdateProspectMutation();
  const { data } = useGetSpecficProspectQuery({});

  console.log(selectedProspect);
  const [takeOver, settakeOver] = useState(false);
  const [show, setShow] = useState(false);
  const [dialog, setDialog] = useState(false);
  console.log(dialog);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const lastOnlineStatus = getLastOnlineStatus(
    selectedProspect?.last_Online as Date
  );
  const dispatch = useDispatch();

  const handleSendMessage = async () => {
    try {
      const response = await sendText({
        recipientNo: selectedProspect?.phoneNo,
        message: message,
        prospect_id: selectedProspect?.id,
      }).unwrap();
      setMessage("");

      dispatch(setChats([response]));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Determine file type synchronously
    let determinedType: FileType;
    if (file.type.startsWith("image/")) {
      determinedType = "image";
    } else if (file.type.startsWith("video/")) {
      determinedType = "video";
    } else {
      determinedType = "document";
    }

    // Update state (optional if you need to display it)
    setFileType(determinedType);

    // Check file size (limit 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    // Prepare file for upload
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadPromise = uploadFiles(formData).unwrap();
      toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "File uploaded successfully!",
        error: (error: any) =>
          error?.data?.message || "An unexpected error occurred.",
      });
      const data = await uploadPromise;
      const link = data[0].link;

      // Use the locally determined type rather than relying on state
      const sendMediaPromise = sendMedia({
        recipientNo: selectedProspect?.phoneNo.slice(1),
        mediaUrl: link,
        type: determinedType,
      }).unwrap();

      toast.promise(sendMediaPromise, {
        loading: "Sending...",
        success: "File sent successfully!",
        error: (error: any) =>
          error?.data?.message || "An unexpected error occurred.",
      });

      console.log(await sendMediaPromise);
      // dispatch(setChats([await sendMediaPromise]));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDocumentUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = ".pdf,.doc,.docx,.txt";
      fileInputRef.current.click();
    }
  };

  const openprofile = () => {
    if (profileInputRef.current) {
      profileInputRef.current.accept = "image/*";
      profileInputRef.current.click();
    }
  }
  const handleProfileImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    // Prepare file for upload
    const formData = new FormData();
    formData.append("file", file);

    const uploadPromise = uploadFiles(formData).unwrap();
    toast.promise(uploadPromise, {
      loading: "Uploading...",
      success: "File uploaded successfully!",
      error: (error: any) =>
        error?.data?.message || "An unexpected error occurred.",
    });
    const data = await uploadPromise;
    const link = data[0].link; 
    console.log(link);
    
  
  
  };

  const handleMediaUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = "image/*,video/*";
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    setShow(false);
  }, [selectedProspect]);

  return (
    <>
      {selectedProspect ? (
        <div
          className={`md:flex ${
            selectedProspect ? "flex" : "hidden"
          } flex-1 rounded-[20px] overflow-hidden relative border border-primary`}
        >
          <div
            className={`flex flex-col ${
              show ? "lg:w-[75%] w-full" : "w-full"
            } relative transition-all duration-300 ease-in-out backdrop-blur-3xl`}
          >
            {/* Header */}
            <div className="p-4 w-full   absolute top-0 z-10 bg-primary/50 glass">
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center gap-4"
                  onClick={() => setShow(!show)}
                >
                  <div className="relative flex items-center  gap-5">
                    <button
                      className=" md:hidden flex"
                      onClick={() => dispatch(clearSelectedProspects())}
                    >
                      <ChevronLeft className="text-white" />
                    </button>
                    <Avatar className="sm:h-10 sm:w-10 h-8 w-8">
                      <Image
                        fill
                        src={selectedProspect?.image || "/placeholder.svg"}
                        alt={selectedProspect?.name ?? ""}
                        className="object-cover"
                      />
                    </Avatar>
                  </div>
                  <div className="relative flex items-center md:gap-10 gap-5 bg">
                    <h3 className="sm:text-lg text-sm font-semibold text-white">
                      {selectedProspect?.name}
                    </h3>

                    <div className="flex gap-3  px-3 py-2 rounded-3xl items-center bg-[#A7B8D9]">
                      <Hourglass className="sm:w-4 sm:h-4 w-3 h-3" />
                      <span className="sm:text-sm text-xs">
                        {/* {timeUntil24Hours(prospectLastMessageTiming)} */}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-white/90 hover:bg-white/10"
                      >
                        <EllipsisVertical className="h-10 w-10" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-blue-500 border-0 py-2 text-white ove"
                    >
                      <DropdownMenuItem>
                        <Link
                          href={`/orders/${selectedProspect.shopify_id}`}
                          className="flex  pr-14 gap-5"
                        >
                          <Image
                            src="/icons/shopify.png"
                            alt="shopify"
                            width={21}
                            height={21}
                          />
                          <span>Create Order</span>
                        </Link>
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem className="mt-6 "> */}
                      <div className="flex mt-6 pr-14 gap-5">
                        <UserRound className="pl-2" />
                        <span>Assign To</span>
                      </div>
                      {/* </DropdownMenuItem> */}
                      <DropdownMenuItem className="ml-3 my-3">
                        Agent 1
                      </DropdownMenuItem>
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
            <Messages isLoading={isChatsLoading} />

            {/* Input */}
            {!takeOver ? (
              <div className="p-4 border-t border-primary bg-[#4064AC80] ">
                <div className="flex items-center gap-2 text-white justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <BotIcon /> <p>This conversation is assigned to a Bot</p>
                  </div>

                  <Button
                    onClick={() => settakeOver(true)}
                    className="bg-blue-600 hover:bg-blue-700 capitalize"
                  >
                    Take Over
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-4 border-t border-primary bg-primary rounded-b-[20px]">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept={
                    fileType === "document"
                      ? ".pdf,.doc,.docx,.txt"
                      : "image/*,video/*"
                  }
                />
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-white/90  hover:bg-white/10 aspect-square"
                  >
                    <DropdownMenu
                      open={dropdownOpen}
                      onOpenChange={setDropdownOpen}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className="bg-transparent hover:bg-transparent hover:text-white"
                        >
                          {" "}
                          <PlusCircle />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-blue-500 text-white border-0">
                        <DropdownMenuItem
                          className="flex gap-2"
                          onClick={() => {
                            setDialog(true);
                            setDropdownOpen(false);
                          }}
                        >
                          <LayoutGrid />
                          Templates
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="flex gap-2"
                          onClick={handleDocumentUpload}
                        >
                          <FileText />
                          Documents
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="flex gap-2"
                          onClick={handleMediaUpload}
                        >
                          <MdOutlineVideoLibrary />
                          Photos & Videos
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <TemplateBuilder open={dialog} setOpen={setDialog} />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-white/5 border-none hover:right-0 focus-visible:ring-0  text-white placeholder:text-gray-400"
                  />
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 capitalize"
                    onClick={handleSendMessage}
                    disabled={message.length === 0}
                  >
                    Send
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div
            className={`absolute xl:relative top-0 right-0 h-full  backdrop-blur-3xl transition-all duration-300 ease-in-out transform ${
              show
                ? "translate-x-0 lg:w-[320px] w-[80%] md:w-[320px] opacity-100"
                : "translate-x-full w-0 opacity-0"
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
                  <div className="relative inline-block">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={selectedProspect?.image ?? ""}
                        alt="Profile"
                      />
                      <AvatarFallback>
                        {selectedProspect?.name ?? ""}
                      </AvatarFallback>
                    </Avatar>
                    <input
                      type="file"
                      ref={profileInputRef}
                      onChange={handleProfileImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                    size={"icon"}
                     
                      className="absolute bg-primary/70 -bottom-2 -right-3 rounded-full" onClick={openprofile}
                    >
                      <Pencil className="h-2 w-2 text-white" />
                    </Button>
                  </div>
                  <div className="text-center">
                    <h2 className="text-white text-lg font-medium">
                      {selectedProspect?.name ?? ""}
                    </h2>
                    <p className="text-red-500 text-sm">{lastOnlineStatus}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  {[
                    { icon: Mail, text: selectedProspect?.email ?? "" },
                    { icon: Phone, text: selectedProspect?.phoneNo ?? "" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-white"
                    >
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
                          <SelectItem value="new-customer">
                            New Customer
                          </SelectItem>
                          <SelectItem value="high-priority">
                            High Priority
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-blue-500/20 text-white hover:bg-blue-500/30"
                      >
                        New Customer
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-blue-500/20 text-white hover:bg-blue-500/30"
                      >
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

          {show && (
            <div
              className="fixed inset-0 bg-black/50 lg:hidden z-40"
              onClick={() => setShow(false)}
            />
          )}
        </div>
      ) : (
        <div
          className={`${
            selectedProspect ? "flex" : "hidden"
          } md:flex flex-1 justify-center items-center rounded-[20px] text-white overflow-hidden relative border border-primary`}
        >
          <div className="text-center">
            <p className="text-xl">Please select a chat</p>
            <p className="text-sm">
              Kindly select a chat to begin the conversation.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AllChats;
