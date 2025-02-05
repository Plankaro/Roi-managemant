/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { Loader2 } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface VerifyEmailProps {
  id: string;
}

function VerifyEmail({ id }: VerifyEmailProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);



  useEffect(() => {
    if (!id) return; // Only run if id is defined

    const verifyEmail = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token/${id}`
        );
        console.log("Verification response:", response.data);
        setData(response.data);
        toast.success("Email verified successfully!");
        
      } catch (err: any) {
        console.error("Error verifying email:", err);
        setError(err.response?.data?.message || "Error verifying email. Please try again.");
        setIsError(true);
        toast.error("Error verifying email. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="mt-4 text-lg">Verifying your email...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Verification Failed</h1>
        <p className="text-gray-600 mb-4">
          {error ? error : "An unknown error occurred."}
        </p>
      </div>
    );
  }

  if (data) {
    return (
      <div className="flex  items-center flex-col justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Email Verified</h1>
        <p className="text-gray-600 space-y-8 flex flex-col items-center justify-center gap-6">
          Your email has been successfully verified.

          <Link href={"/sign-in"} className=""><Button>Go to Sign In Page</Button></Link>
        </p>
      </div>
    );
  }

  return null;
}

export default VerifyEmail;
