import { useState } from 'react';
import { EllipsisVertical, Search, User, UserRound, CheckCircle2, XCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


// Mock data for agents with assignment status
const agents = [
  { id: 1, name: 'Agent Smith', assigned: true },
  { id: 2, name: 'Agent Johnson', assigned: false },
  { id: 3, name: 'Agent Brown', assigned: true },
  { id: 4, name: 'Agent Jones', assigned: false },
  { id: 5, name: 'Agent Davis', assigned: true },
  { id: 6, name: 'Agent Wilson', assigned: false },
  { id: 7, name: 'Agent Taylor', assigned: true },
  { id: 8, name: 'Agent Anderson', assigned: false },
];

function AssignmentDropdown() {
  const [searchQuery, setSearchQuery] = useState('');
  const [assignedAgent, setAssignedAgent] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'assigned' | 'unassigned'>('all');

  const filteredAgents = agents
    .filter(agent =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(agent => {
      if (filter === 'assigned') return agent.assigned;
      if (filter === 'unassigned') return !agent.assigned;
      return true;
    });

  const handleAssignToMe = () => {
    setAssignedAgent('Current User');
  };

  const handleAssignToAgent = (agentName: string) => {
    setAssignedAgent(agentName);
  };

  return (
   
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
            >
              <EllipsisVertical className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-64 bg-blue-500 text-white"
          >
            <DropdownMenuItem className="focus:bg-blue-50">
              <a
                href="/orders/123"
                className="flex items-center gap-3 w-full text-gray-700"
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/0533/2089/files/Shopify_icon.png"
                  alt="shopify"
                  className="w-5 h-5"
                />
                <span>Create Order</span>
              </a>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <div className="px-2 py-1.5">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <UserRound className="h-4 w-4" />
                <span>Assign To</span>
              </div>
            </div>
            
            <div className="p-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 text-sm"
                />
              </div>
            </div>

            <Button
              variant="ghost"
              className="w-full justify-start gap-2 rounded-none hover:bg-blue-50"
              onClick={handleAssignToMe}
            >
              <User className="h-4 w-4" />
              <span>Assign to me</span>
            </Button>
            
            <DropdownMenuSeparator />
            
            <div className="h-40 overflow-y-auto">
              {filteredAgents.map((agent) => (
                <DropdownMenuItem
                  key={agent.id}
                  className="focus:bg-blue-50"
                  onClick={() => handleAssignToAgent(agent.name)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="pl-2">{agent.name}</span>
                    {agent.assigned ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </div>

            <DropdownMenuSeparator />

            <div className="p-2 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className={`flex-1 text-xs ${
                  filter === 'all'
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-blue-50'
                }`}
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`flex-1 text-xs ${
                  filter === 'assigned'
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-blue-50'
                }`}
                onClick={() => setFilter('assigned')}
              >
                Assigned
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`flex-1 text-xs ${
                  filter === 'unassigned'
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-blue-50'
                }`}
                onClick={() => setFilter('unassigned')}
              >
                Unassigned
              </Button>
            </div>

            {assignedAgent && (
              <div className="absolute bottom-0 right-0 left-0 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white">
                <User className="h-4 w-4" />
                <span>Assigned to {assignedAgent}</span>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

  );
}

export default AssignmentDropdown;