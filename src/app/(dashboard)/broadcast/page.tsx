import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";

export default function BroadcastPage() {
  return (
    <div className=" ">
      <div className=" mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Broadcast</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">
            +
            <span className="md:block hidden"> Broadcast Campaigns</span>
          </Button>
        </div>

        {/* Search */}
        <div className="relative bg-transparent border-white border-2 lg:w-1/2 rounded-lg ">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
          <Input
            placeholder="Search here..."
            className="pl-9 bg-transparent border-0 text-white "
          />
        </div>

        {/* Broadcast Grid */}
        <ScrollArea className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-[calc(100vh-270px)] no-scrollbar overflow-y-auto">
  {[...Array(8)].map((_, i) => (
    <BroadcastCard key={i} />
  ))}
</ScrollArea>
      </div>
    </div>
  );
}

function BroadcastCard() {
  return (
  <Link href={"/broadcast/1"}>
    <Card className="bg-[#19191980]  border-primary text-white md:p-4 p-2">
      <CardContent className=" md:p-4 p-2 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Title of broadcast</h3>
            <Badge variant="outline" className="border-2 border-primary text-white rounded-lg">
              Transactional
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            Content of the broadcast...
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-blue-300">Status:</span>
            <span>Completed</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-blue-200">Contacts:</span>
            <span>1234</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-blue-400">Created at</p>
            <p>12/02/2025,</p>
            <p>12:01 pm</p>
          </div>
          <div>
            <p className="text-blue-400">Scheduled at</p>
            <p>12/02/2025,</p>
            <p>12:01 pm</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4  mt-4">
          <MetricRow
            label="Delivered"
            value="201"
            percentage={80}
            color="blue"
          />
          <MetricRow label="Read" value="201" percentage={80} color="blue" />
          <MetricRow label="Skipped" value="201" percentage={23} color="red" />
          <MetricRow label="Failed" value="201" percentage={2} color="red" />
        </div>

        <Button variant="link" className="text-red-500 p-0 h-auto">
          View Details →
        </Button>
      </CardContent>
    </Card>
  </Link>
  );
}

function MetricRow({
  label,
  value,
  percentage,
  color,
}: {
  label: string;
  value: string;
  percentage: number;
  color: "blue" | "red";
}) {
  return (
    <div className="">
      <div className="flex justify-between text-sm my-2">
        <span className="text-blue-400">{label}</span>
        <span>{value}</span>
      </div>
      <Progress
        value={percentage}
        className={`h-1.5 bg-[#C5C5C5]`}
        indicatorClassName={`${color === "blue" ? "bg-blue-500" : "bg-red-500"}`}
      />
      <div className="text-xs text-right text-muted-foreground">
        {percentage}%
      </div>
    </div>
  );
}
