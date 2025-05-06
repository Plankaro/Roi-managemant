/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { useCreateOrUpdateBotMutation } from "@/store/features/apislice"
import toast from "react-hot-toast"


interface BotCardProps {
  title: string
  icon: React.ReactNode
  isActive: boolean
  hasAdditionalFeatures?: boolean
  onAdditionalFeaturesClick?: () => void
  type:string
  
}

export default function BotCard({
  title,
  icon,
  isActive = false,
  hasAdditionalFeatures = false,
  onAdditionalFeaturesClick,
  type
  
}: BotCardProps) {
  const [active, setActive] = useState(isActive)
  const [botMutation] = useCreateOrUpdateBotMutation()
  
  

  useEffect(() => {
    setActive(isActive)
  }, [isActive])

  const handleCheckChange=async(check:boolean)=>{
    
    const payload = {
      type:type,
      is_active:check
    }
    console.log(payload)
    const promise = botMutation(payload).unwrap()
    toast.promise(promise,{
      loading:"updating status",
      success:"updated succesfully",
      error:(error:any) => error?.data?.message || "An unexpected error occurred.",
    })
    const data = await promise 
    console.log(data)
  }
  


  return (
    <div className="rounded-lg bg-backgroundColor border-primary border p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          {icon}
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <Switch checked={active} onCheckedChange={(check:boolean)=>handleCheckChange(check)} className="data-[state=checked]:bg-blue-600"/>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-white/70">Status: {active ? "Activate" : "Inactive"}</div>
        {hasAdditionalFeatures && onAdditionalFeaturesClick && (
          <button
            className="flex items-center gap-1 rounded-md bg-blue-600/20 px-3 py-1.5 text-sm text-white hover:bg-blue-600/30"
            onClick={onAdditionalFeaturesClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
            <span>Additional Features</span>
          </button>
        )}
      </div>
    </div>
  )
}
