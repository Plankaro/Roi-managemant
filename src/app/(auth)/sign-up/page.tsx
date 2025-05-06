/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SignUpFormValues, signUpSchema } from "@/zod/auth/auth.schema";
import AuthForm from "@/components/page/auth/auth-form";
import toast from "react-hot-toast";

import axios from "axios";
import { useState } from "react";



export default function SignUpPage() {

  const [loading ,setLoading] = useState(false)
    
    const onSubmit = async (values: SignUpFormValues) => {
        if (values.password !== values.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
      
        try {
          setLoading(true)
          // Send the sign-up data via axios POST request.
          const promise =await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, values);
          
          
          const { data } = promise;
    
          if (data.email) {
           await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/token-link`,{email:data.email});
   
          }
         
          
          toast.success("Sign-up successful sent verification mail");
          
        } catch (error: any) {
          // Check if the error response contains a specific message from the server.
          if (error.response?.data?.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("An unexpected error occurred. Please try again.");
          }
          console.error("Sign-up error:", error);
        }finally{
          setLoading(false)
        }
      };
    

    return (
        <AuthForm
            type="SIGN_UP"
            schema={signUpSchema}
            onSubmit={onSubmit}
            defaultValues={{
                firstName: "",
                lastName: "",
                email: "",
                buisnessname: "", 
                password: "",
                confirmPassword: "",
                
            }}
            loading={loading}
            authDescription="Join ROI MAGNET"
            authTitle="Account Sign Up"

        />

    );
}