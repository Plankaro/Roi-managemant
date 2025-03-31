/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Mail,
  Pencil,
  CircleEllipsis,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useGetTeamQuery,useDeleteTeamMutation } from "@/store/features/apislice";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { data } = useGetTeamQuery({});
  console.log(data);
  const [deleteTeam] = useDeleteTeamMutation();

  

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      const promise = deleteTeam({ id });
      toast.promise(promise, {
        loading: "Deleting...",
        success: "Team deleted successfully!",
        error: (error: any) =>
          error?.data?.message || "An unexpected error occurred.",
      });
    }
  };

  return (
    <div className="">
      <div className=" ">
        <header className="mb-6 flex justify-between">
          <h1 className="text-2xl font-semibold mb-4 text-white">Team</h1>
          <div className="flex flex-col-reverse sm:flex-row gap-3  items-start sm:items-center">
            <div className="relative w-full md:block hidden md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                className="pl-10 bg-[#1e1e3f]  border-none rounded-full text-sm h-9 text-white"
                placeholder="Search here..."

              />
            </div>
            <Link href={"/teams/create"}>
              <Button className="bg-blue-500  hover:bg-blue-600 text-white rounded-full flex items-center gap-1 px-4 py-2 h-9">
                <Plus className="h-4 w-4" />
                <span className="text-sm">New Agents</span>
              </Button>
            </Link>
          </div>
        </header>
        <div className="relative w-full block my-6 md:hidden md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            className="pl-10 bg-[#1e1e3f]  border-none rounded-full text-sm h-9 text-white"
            placeholder="Search here..."
          />
        </div>

        <div className=" no-scrollbar overflow-y-scroll h-[calc(100vh-200px)] ">
          <div className="md:grid hidden  xl:grid-col-4 lg:grid-cols-3 md:grid-cols-2  gap-5">
            {data && data?.admin && <AgentCard data={data.admin} handleDelete={handleDelete}/>}
            {data &&
              data?.agents.map((data:any, index:any) => (
                <AgentCard key={index} data={data} handleDelete={handleDelete}/>
              ))}
          </div>

          <div className=" md:hidden grid-cols-1 space-y-2">
            {data && data?.admin && <AgentListItem data={data.admin} handleDelete={handleDelete}/>}
            {data &&
              data?.agents.map((data:any, index:any) => (
                <AgentListItem key={index} data={data} handleDelete={handleDelete}/>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentCard({ data,handleDelete }: { data: any,handleDelete:any }) {
  return (
    <div className={`${data?.role === "ADMIN" ? "bg-gradient-to-b from-[rgba(203,28,101,0.3)] to-[rgba(30,30,128,0.3)]":"bg-backgroundColor"}  border  border-primary rounded-xl p-6 relative`}>
      <div className="absolute top-4 right-4 flex flex-col gap-3">
        <Link href={`/teams/${data?.id}`}>
        <button className="text-gray-400  rounded-full p-2 hover:bg-primary hover:text-white">
          <Edit2 className="h-4 w-4" />
        </button>
        </Link>
        <button className="text-red-500 hover:text-red-400 rounded-full p-2" onClick={() => handleDelete(data?.id)}>
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative mb-4 w-20 h-20">
          <Image
            src={
              data?.image ||
              "https://businessreflex.se/wp-content/uploads/2019/03/placeholder-person-300x300.png"
            }
            alt="Agent profile"
            fill
            className="rounded-full  object-cover border-2 border-[#4C2A87]"
          />
        </div>

        <h3 className="text-xl font-semibold text-white mb-1">{data?.name}</h3>
        <span className="px-4 py-1 bg-black/30 rounded-full text-xs text-gray-300 mb-4">
          {data?.role}
        </span>

        <div className="w-full space-y-3 flex items-center justify-center">
          {/* <div className="flex items-center text-sm text-gray-300">
            <Phone className="h-4 w-4 mr-2 text-gray-400" />
            <span>+919876543210</span>
          </div> */}
          
            <div className="flex items-center text-sm text-gray-300">
              <Mail className="h-4 w-4 mr-2 text-gray-400" />
              <span>{data?.email}</span>
           
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentListItem({ data,handleDelete }: { data: any,handleDelete:any }) {
  return (
    <div className="bg-[#0A0A1B] rounded-lg py-4 px-5 border border-primary relative overflow-hidden">
      <span className="absolute top-0  right-2 bg-blue-600 text-white text-sm px-3 py-1 rounded-lg">
        {data?.role}
      </span>

      <div className="flex items-center mt-4 gap-3 mb-4">
        <div className="flex items-center gap-4">
          <Image
            src={
              data?.image ||
              "https://businessreflex.se/wp-content/uploads/2019/03/placeholder-person-300x300.png"
            }
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full aspect-square"
          />
          <h2 className="md:text-base text-sm  font-semibold text-white">
            {data?.name}
          </h2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-gray-400 hover:text-white focus:outline-none">
              <CircleEllipsis className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-blue-50 border-0 ">
            <DropdownMenuItem className="cursor-pointer">
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-red-500" onClick={()=>handleDelete(data?.id)}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="">
        <div className="flex items-center gap-2 text-gray-400">
          <Mail size={18} />
          <span>{data?.email}</span>
        </div>
      </div>
      {/* <div className="flex items-center gap-2 text-gray-400">
          <Phone size={18} />
          <span>+919876543210</span>
        </div> */}
    </div>
  );
}
