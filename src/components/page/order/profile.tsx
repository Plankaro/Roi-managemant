"use client"
import { useState } from 'react';

import { Avatar } from '@/components/ui/avatar';

import { Hourglass, } from 'lucide-react';
import React from 'react'
import Image from 'next/image';
const contacts = [
    {
      id: 1,
      name: "Grace Miller",
      phone: "+91 9873535637",
      message: "Lorem ipsum dolor sit amet, consectetur adipisc...",
      time: "2:46 pm",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      online: true,
    },
    {
      id: 2,
      name: "Jacob Math",
      phone: "+91 8765498768",
      message: "Lorem ipsum dolor sit amet, consectetur adip...",
      time: "2:46 pm",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      online: false,
    },
    // Add more contacts as needed
  ];

function Profile() {
    const [selectedContact] = useState(contacts[0]);
   
  return (
    <div className="flex items-center justify-between p-4 border-primary border rounded-lg w-full">
    <div className="flex items-center gap-4">
      <div className="relative">
        <Avatar className="h-10 w-10">
          <Image
            fill
            src={selectedContact?.avatar}
            alt={selectedContact?.name}
            className="object-cover"
          />
        </Avatar>
      </div>
      <div className="relative flex items-center gap-16 bg">
        <h3 className="text-lg font-semibold text-white">
          {selectedContact?.name}
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