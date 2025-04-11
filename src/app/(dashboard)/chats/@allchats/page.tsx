/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { z } from "zod";
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
  ShieldX,
  Trash2,
  ChevronLeft,
  LayoutGrid,
  FileText,
  Pencil,
  ShieldCheck,
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
import FlashResponsePopup from "@/components/page/chats/flashresponse";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import {
  addProspect,
  clearlastChat,
  clearSelectedProspects,
} from "@/store/features/prospect";
import { getLastOnlineStatus } from "@/lib/last_online";

import { MdOutlineVideoLibrary } from "react-icons/md";
import Messages from "@/components/page/chats/message";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import TemplateBuilder from "@/components/page/chats/templatedialog";
import { clearChats, setChats } from "@/store/features/chatSlice";
import { updateProspectSchema } from "@/zod/chats/chat";
import {
  useSendMediaMutation,
  useUploadFilesMutation,
  useGetSpecficProspectQuery,
  useGetChatsQuery,
  useSendTextMutation,
  useUpdateProspectMutation,
  useGetProspectQuery,
  useDeleteChatsMutation,
} from "@/store/features/apislice";
import toast from "react-hot-toast";
import EditableField from "@/components/page/chats/editablediv";
type FileType = "image" | "video" | "document";
import { useChangeBlockStatusMutation } from "@/store/features/apislice";
import { getTimeDifference } from "@/lib/timetill";

import { getChatsForProspect } from "@/components/page/broadcast/getchats";
import { useGetFlashResponseQuery } from "@/store/features/apislice";
import AssignmentDropdown from "@/components/page/chats/assignmentdropdown";

import { useSession } from "next-auth/react";
import TagsSelect from "@/components/page/chats/tag-section";

interface FileUploadProps {
  onFileSelect: (file: File, type: FileType) => void;
}

const AllChats = () => {
  const [fileType, setFileType] = useState<FileType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const { data: flashResponse } = useGetFlashResponseQuery({});
  const session:any = useSession();
  const user = session?.data?.user?.user;

  const { selectedProspect } = useSelector(
    (state: RootState) => state.Prospect
  );

  const { data: chats, isLoading: isChatsLoading } = useGetChatsQuery({
    prospectId: selectedProspect?.id ?? "",
  });

  useEffect(() => {
    if (chats) {
      dispatch(setChats(chats));
    }
  });

  const [message, setMessage] = useState("");
  const [showFlashPopup, setShowFlashPopup] = useState(false);
  const [sendText, { isLoading }] = useSendTextMutation();

  const [uploadFiles, { isLoading: isuploadingfile }] =
    useUploadFilesMutation();
  const [sendMedia, { isLoading: isSendingMedia }] = useSendMediaMutation();
  const [updateProspect, { isLoading: isUpdatingProspect }] =
    useUpdateProspectMutation();
  const [changeBlockStatus, { isLoading: isChangingBlockStatus }] =
    useChangeBlockStatusMutation();

  const [deleteChats] = useDeleteChatsMutation();

  //console.log(selectedProspect);
  const [takeOver, settakeOver] = useState(false);
  const [show, setShow] = useState(false);
  const [dialog, setDialog] = useState(false);
  //console.log(dialog);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  //console.log("select", selectedProspect);
  const lastOnlineStatus = getLastOnlineStatus(
    selectedProspect?.last_Online as Date
  );

  const getDifference = getTimeDifference(
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

      //console.log(await sendMediaPromise);
      // dispatch(setChats([await sendMediaPromise]));
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    if (message.startsWith("/")) {
      setShowFlashPopup(true);
    } else {
      setShowFlashPopup(false);
    }
  }, [message]);

  const handleSelectResponse = (response: any) => {
    //console.log("response",response)
    setMessage(response.message);
    setShowFlashPopup(false);
  };
  //console.log(flashResponse)

  const handleBlockStatusChange = async (id: string) => {
    try {
      const changeBlockpromise = changeBlockStatus({ id: id });
      toast.promise(changeBlockpromise, {
        loading: `${selectedProspect?.is_blocked ? "Unblocking" : "Blocking"} `,
        success: `${
          selectedProspect?.is_blocked ? "Unblocked" : "Blocked"
        } successfully!`,
        error: (error: any) =>
          error?.data?.message || "An unexpected error occurred.",
      });
      const data = await changeBlockpromise;
      dispatch(addProspect([data.data]));
    } catch (error) {}
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
  };
  const handleProfileImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) {
        //console.log("No file selected");
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
      const update: any = await updateProspect({
        id: selectedProspect?.id,
        body: { image: link },
      });

      dispatch(addProspect([update.data]));
    } catch (error) {
      //console.log(error);
    }
  };

  const handleeditDetails = async (body: any) => {
    try {
      const santized = updateProspectSchema.safeParse(body);
      if (!santized.success) {
        toast.error("Invalid field value");
        return;
      }
      const promise = updateProspect({ id: selectedProspect?.id, body });
      toast.promise(promise, {
        loading: "Updating...",
        success: "Details updated successfully!",
        error: (error: any) =>
          error?.data?.message || "An unexpected error occurred.",
      });
      const prospect: any = await promise;
      //console.log(data);
      dispatch(addProspect([prospect.data]));
      return prospect;
    } catch (error) {
      //console.log(error);
    }
  };

  const handleMediaUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = "image/*,video/*";
      fileInputRef.current.click();
    }
  };

  const handleDeleteChats = async (id: string) => {
    try {
      const promise = deleteChats({ prospect_id: id });
      toast.promise(promise, {
        loading: "Deleting...",
        success: "Chats deleted successfully!",
        error: (error: any) =>
          error?.data?.message || "An unexpected error occurred.",
      });

      const data = await promise;

      dispatch(clearChats(id));
      dispatch(clearlastChat(id));
    } catch (error) {
      //console.log(error);
    }
  };

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
            <div className="sm:p-4 px-2 py-4 w-full   absolute top-0 z-10 bg-primary/50 glass">
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center gap-4"
                  onClick={() => setShow(!show)}
                >
                  <div className="relative flex items-center sm:gap-5 gap-1">
                    <button
                      className=" md:hidden flex"
                      onClick={() => dispatch(clearSelectedProspects())}
                    >
                      <ChevronLeft className="text-white" />
                    </button>
                    <Avatar className="sm:h-14 sm:w-14 h-8 w-8">
                      <AvatarImage
                        src={selectedProspect?.image || "/placeholder.svg"}
                        alt={selectedProspect?.name ?? ""}
                        className="object-cover"
                      />
                      <AvatarFallback className="object-contain flex bg-gray-500 lg:h-14 lg:w-14 justify-center items-center">
                        {selectedProspect?.name?.slice(0, 2).toUpperCase() ??
                          ""}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="relative flex items-center md:gap-10 sm:gap-5 gap-3 bg">
                    <h3 className="sm:text-lg text-sm font-semibold text-white">
                      {selectedProspect?.name || selectedProspect?.phoneNo}
                    </h3>

                    <div
                      className={`flex gap-3  px-3 py-2 rounded-3xl items-center bg-[#A7B8D9] ${
                        !getDifference && "hidden"
                      }`}
                    >
                      <Hourglass className="sm:w-4 sm:h-4 w-3 h-3" />
                      <span className="sm:text-sm text-[8px]">
                        {getDifference}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <AssignmentDropdown />
                </div>
              </div>
            </div>

            {/* Messages */}
            <Messages isLoading={isChatsLoading} />

            {/* Input */}
            {selectedProspect?.assignedToId === user?.id ? (
              selectedProspect?.is_blocked ? (
                <div className="p-4 border-t border-primary bg-[#4064AC80]">
                  <div className="flex items-center gap-2 text-white justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <ShieldCheck className="h-6 w-6" />
                      <p>The user is blocked</p>
                    </div>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 capitalize"
                      onClick={() =>
                        handleBlockStatusChange(selectedProspect?.id)
                      }
                    >
                      Unblock
                    </Button>
                  </div>
                </div>
              ) : getDifference ? (
                <div className="p-4 border-t border-primary bg-primary rounded-b-[20px] relative">
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
                      className="text-white hover:text-white/90 hover:bg-white/10 aspect-square"
                    >
                      <DropdownMenu
                        open={dropdownOpen}
                        onOpenChange={setDropdownOpen}
                      >
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="bg-transparent hover:bg-transparent hover:text-white"
                          >
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
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-white/5 border-none hover:right-0 focus-visible:ring-0 text-white placeholder:text-gray-400"
                    />
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 capitalize"
                      onClick={handleSendMessage}
                      disabled={message.length === 0}
                    >
                      Send
                    </Button>
                    <FlashResponsePopup
                      responses={flashResponse}
                      open={showFlashPopup}
                      onClose={() => setShowFlashPopup(false)}
                      onSelect={handleSelectResponse}
                      searchTerm={message}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 border-t border-primary bg-[#4064AC80]">
                  <div className="flex items-center gap-2 text-white justify-between">
                    <div className="flex items-center gap-2 md:text-sm text-[8px]">
                      You can&apos;t message this user as WhatsApp blocks
                      business messages after 24 hours of no reply.
                    </div>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 capitalize"
                      onClick={() => setDialog(true)}
                    >
                      Send Templates
                    </Button>
                  </div>
                </div>
              )
            ) : (
              <div className="p-4 border-t border-primary text-white bg-[#4064AC80]">
                This chat is not assigned to your account
              </div>
            )}
          </div>
          <TemplateBuilder open={dialog} setOpen={setDialog} />
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
                        className="h-16 w-16"
                      />
                      <AvatarFallback className="object-contain flex bg-gray-500 lg:h-14 lg:w-14 justify-center items-center">
                        {selectedProspect?.name?.slice(0, 2).toUpperCase() ??
                          ""}
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
                      disabled={isUpdatingProspect}
                      className="absolute bg-primary/70 -bottom-2 -right-3 rounded-full"
                      onClick={openprofile}
                    >
                      <Pencil className="h-2 w-2 text-white" />
                    </Button>
                  </div>
                  <div className="text-center">
                    <h2 className="text-white text-lg font-medium flex justify-center items-center">
                      <EditableField
                        initialValue={selectedProspect?.name ?? ""}
                        onSave={(name) => handleeditDetails({ name: name })}
                        placeholder="enter the name"
                      />
                    </h2>
                    <p className="text-red-500 text-sm mt-2">
                      {lastOnlineStatus}
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 ">
                  <div className="flex items-center gap-3 text-white">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <EditableField
                      initialValue={selectedProspect?.email ?? ""}
                      onSave={(email) => handleeditDetails({ email: email })}
                      inputClassName="text-sm"
                      textClassName="text-sm min-w-[160px]"
                      placeholder="enter the email"
                    />
                  </div>
                  <div className="flex items-center gap-3 text-white ">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="text-sm">
                      {selectedProspect?.phoneNo ?? ""}
                    </span>
                  </div>
                  {/* ))} */}

                  {/* Role Select */}
                  <div className="flex items-center  gap-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <Select
                      value={selectedProspect?.lead}
                      onValueChange={(lead) =>
                        handleeditDetails({ lead: lead })
                      }
                    >
                      <SelectTrigger className=" bg-transparent border-gray-800 text-white">
                        <SelectValue placeholder={selectedProspect?.lead} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LEAD">Lead</SelectItem>
                        <SelectItem value="LOST">Lost</SelectItem>
                        <SelectItem value=" NEGOTIATION">
                          Negotiation
                        </SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tags Section */}
                  <div className="flex items-center justify-center gap-3">
                    <TagsSelect />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10"
                    onClick={() => {
                      handleBlockStatusChange(selectedProspect?.id);
                    }}
                  >
                    {selectedProspect?.is_blocked ? (
                      <ShieldCheck className="h-5 w-5 mr-2" />
                    ) : (
                      <ShieldX className="h-5 w-5 mr-2" />
                    )}
                    {selectedProspect?.is_blocked ? "Unblock" : "Block"}
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10"
                    onClick={() => handleDeleteChats(selectedProspect?.id)}
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
