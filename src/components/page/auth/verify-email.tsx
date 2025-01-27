"use client"

import React, { useEffect } from "react"
import { useVerifyTokenQuery } from "@/store/features/apislice"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"


interface VerifyEmailProps {
  id: string
}

function VerifyEmail({ id }: VerifyEmailProps) {
  const { data, isLoading, isError, error } = useVerifyTokenQuery(id)

  const router = useRouter()

  useEffect(() => {
    if (isError) {
      toast.error("Failed to verify email. Please try again.")
    }
    if (data) {
      toast.success("Email verified successfully!")
      router.push("/sign-up")
    }
  }, [isError, data])
  console.log(error)

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="mt-4 text-lg">Verifying your email...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Verification Failed</h1>
        <p className="text-gray-600 mb-4">{error instanceof Error ? error.message : "An unknown error occurred"}</p>
       
      </div>
    )
  }

  if (data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Email Verified</h1>
        <p className="text-gray-600 mb-4">Your email has been successfully verified.</p>
        
      </div>
    )
  }

  return null
}

export default VerifyEmail

