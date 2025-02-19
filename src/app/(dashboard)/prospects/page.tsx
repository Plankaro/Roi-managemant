import { Suspense } from "react";

import ProspectList from "@/components/page/prospects/prospect-list";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <div className="h-[calc(100vh-100px)] overflow-auto no-scrollbar">
      <header className="mb-6  space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-white">Prospects</h1>
        </div>
        {/* <Search /> */}
        <div className="flex justify-between items-center">
        <Tabs defaultValue="all" className="w-auto">
  <TabsList className="border-primary border-2 py-2 rounded-none bg-transparent flex">
    <TabsTrigger 
      value="all" 
      className="min-w-[100px] text-center border-transparent data-[state=active]:border-primary 
      data-[state=active]:bg-[#0D0D0D4D] data-[state=active]:text-white 
      data-[state=active]:border py-1 px-4 data-[state=active]:rounded-none 
      transition-all duration-200"
    >
      All
    </TabsTrigger>
    <TabsTrigger 
      value="starred" 
      className="min-w-[100px] text-center border-transparent data-[state=active]:border-primary 
      data-[state=active]:bg-[#0D0D0D4D] data-[state=active]:text-white 
      data-[state=active]:border py-1 px-4 data-[state=active]:rounded-none 
      transition-all duration-200"
    >
      Starred
    </TabsTrigger>
  </TabsList>
</Tabs>
          <div className="text-white text-sm hidden md:block">
            Total: <span className="font-semibold">50</span> Contacts
          </div>
        </div>
      </header>
      <Suspense fallback={<ProspectListSkeleton />}>
        <ProspectList />
      </Suspense>
    </div>
  );
}

function ProspectListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-[116px] animate-pulse rounded-lg bg-navy-800/50"
        />
      ))}
    </div>
  );
}
