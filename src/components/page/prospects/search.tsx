import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Search() {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 lg: top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        placeholder="Search here"
        className="bg-navy-800/50 border-navy-700 pl-9 text-white placeholder:text-gray-400"
      />
    </div>
  )
}

