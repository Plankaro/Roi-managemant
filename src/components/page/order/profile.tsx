"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function ProfileSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 border-blue-500 bg-[var(--Background-50,#19191980)] border rounded-lg w-full">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Skeleton className="h-10 w-10 rounded-full bg-white/10" />
        </div>
        <div className="relative flex items-center gap-16">
          <Skeleton className="h-6 w-32 bg-white/10" />
        </div>
      </div>
    </div>
  )
}



// Update the Profile component to include the skeleton
function Profile({ image, name, isLoading }: { image: string; name: string; isLoading: boolean }) {
  if (isLoading) {
    return <ProfileSkeleton />
  }

  return (
    <div className="flex items-center justify-between p-4 border-blue-500 bg-[var(--Background-50,#19191980)] border rounded-lg w-full">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={image || "/placeholder.svg"} alt={name} className="object-cover" height={40} width={40}/>
            
            <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        <div className="relative flex items-center gap-16 bg">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
        </div>
      </div>
    </div>
  )
}

export default Profile

