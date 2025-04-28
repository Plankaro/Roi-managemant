import { Button } from "@/components/ui/button"
import { Search, UserPlus } from "lucide-react"

export default function NoProspectFound() {
  return (
    <div className="h-[calc(100vh-100px)] bg-backgroundColor flex flex-col items-center justify-center text-center">
   
        <div className="w-20 h-20 bg-slate-700 rounded-full mx-auto mb-6 flex items-center justify-center">
          <Search className="h-10 w-10 text-slate-400" />
        </div>

        <h2 className="text-2xl font-bold mb-3 text-white">No Prospect Found</h2>

        <p className="text-slate-400 mb-6">
          We couldn&apos;t find any prospect from shopify matching this id
        </p>

        {/* <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" className="border-slate-700">
            <Search className="mr-2 h-4 w-4" />
            Search Again
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="mr-2 h-4 w-4" />
            Create New Prospect
          </Button>
        </div> */}
    
    </div>
  )
}
