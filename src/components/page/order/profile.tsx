"use client"


import { Avatar } from '@/components/ui/avatar';

import { Hourglass, } from 'lucide-react';
import React from 'react'
import Image from 'next/image';


function Profile({image,name}:{image:string,name:string}) {
  
   
  return (
    <div className="flex items-center justify-between p-4 border-primary border rounded-lg w-full">
    <div className="flex items-center gap-4">
      <div className="relative">
        <Avatar className="h-10 w-10">
          <Image
            fill
            src={image}
            alt={name}
            className="object-cover"
          />
        </Avatar>
      </div>
      <div className="relative flex items-center gap-16 bg">
        <h3 className="text-lg font-semibold text-white">
          {name}
        </h3>

        <div className="flex gap-3   px-3 py-1 rounded-3xl bg-[#A7B8D9]">
          <Hourglass width={18} height={18} />
          <span className="text-sm">23h 40m</span>
        </div>
      </div>
    </div>

   
  </div>

  )
}

export default Profile