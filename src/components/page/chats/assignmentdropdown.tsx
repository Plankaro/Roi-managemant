/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  EllipsisVertical,
  Search,
  User,
  UserRound,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  useGetTeamQuery,
  useAsignChatMutation,
} from "@/store/features/apislice";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addProspect } from "@/store/features/prospect";

// Mock data for agents with assignment status

function AssignmentDropdown() {
  const session: any = useSession();
  //console.log(session)
  const dispatch = useDispatch();

  const user = session?.data?.user?.user;
  const [searchQuery, setSearchQuery] = useState("");
  const { data: Teams } = useGetTeamQuery({});
  const [assignChat] = useAsignChatMutation();

  const [assignedAgent, setAssignedAgent] = useState<string | null>(null);
  const { selectedProspect } = useSelector(
    (state: RootState) => state.Prospect
  );

  console.log(selectedProspect);

  const agents = Teams?.agents;

  const assignedToMe = selectedProspect?.assignedToId === user.id;
  const filteredAgents = agents
    ? agents.filter(
        (agent: any) =>
          agent.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          agent.id !== selectedProspect?.assignedToId // or selectedProspect?.assignedTo?.id if it's an object
      )
    : [];

  //   const filteredAgents = agents
  //     .filter((agent) =>
  //       agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //     .filter((agent) => {
  //       if (filter === "assigned") return agent.assigned;
  //       if (filter === "unassigned") return !agent.assigned;
  //       return true;
  //     });

  

  const handleAssignToAgent = async (agentid: string) => {
    const promise = assignChat({
      prospectId: selectedProspect?.id,
      agentId: agentid,
    }).unwrap();
    try {
      toast.promise(promise, {
        loading: "Assigning...",
        success: "Chat assigned successfully!",
        error: (error: any) =>
          error?.data?.message || "An unexpected error occurred.",
      });
      const prospect = await promise;
// console.log(prospect)

         dispatch(addProspect([prospect]));

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className=" text-white hover:bg-primary-700 transition-colors"
        >
          <EllipsisVertical className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-72 bg-[#1B2A48] border border-primary-700 rounded-lg shadow-xl"
      >
        <DropdownMenuItem className="focus:bg-primary-700 transition-colors p-4">
          <a
            href="/orders/123"
            className="flex items-center gap-3 w-full text-white"
          >
            <Image
              src="/icons/shopify.png"
              alt="shopify"
              width={21}
              height={21}
            />
            <span className="font-medium">Create Order</span>
          </a>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-primary-700" />

        <div className="px-3 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-300" />
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-sm bg-primary-800 border-primary-600 text-white placeholder:text-primary-400 focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start gap-2 rounded-none text-white hover:bg-primary-700 transition-colors px-3 py-2"
          onClick={()=>handleAssignToAgent(user.id)}
          disabled={assignedToMe}
        >
          <User className="h-4 w-4" />
          <span className="text-sm">Assign to me</span>
        </Button>

        <DropdownMenuSeparator className="bg-primary-700" />

        <div className="max-h-48 overflow-y-auto no-scrollbar scrollbar-thumb-primary-600 scrollbar-track-primary-800">
          {filteredAgents.map((agent: any) => (
            <DropdownMenuItem
              key={agent.id}
              className="focus:bg-primary-700 transition-colors px-3 py-2"
              onClick={() => handleAssignToAgent(agent.id)}
            >
              <div className="flex items-center justify-between w-full text-white">
                <span className="text-sm">{agent.name}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator className="bg-primary-700" />

        <div className="flex items-center gap-2 px-4 py-2.5  text-white rounded-b-lg">
          <User className="h-4 w-4" />
          <span className="text-sm font-medium">
            {selectedProspect?.assignedToId !== null
              ? `Assigned to ${
                  assignedToMe
                    ? "Current User"
                    : selectedProspect?.assignedTo?.name
                }`
              : "Unassigned"}
          </span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AssignmentDropdown;
