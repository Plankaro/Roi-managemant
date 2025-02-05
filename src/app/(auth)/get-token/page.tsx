/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AuthForm from '@/components/page/auth/auth-form';
import { forgotPasswordSchema } from '@/zod/auth/auth.schema'
import React, { useState } from 'react'

import toast from "react-hot-toast";
import axios from 'axios';
const GetTokenPage = () => {
 const [isLoading,setIsLoading] = useState(false)
    async function onSubmit(values: { email: string }) {
        setIsLoading(true);
        try {
            const response =  axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/token-link`,{email:values.email});// Unwrap the result to handle errors correctly
            toast.promise(
                response,
                {
                    loading: 'Loading...',
                    success: 'Verification link sent successfully!',
                    error: (error: any) =>
                        error?.data?.message || 'An unexpected error occurred.',
                }
            );
            console.log(await response); // Log the resolved value
        } catch (error: any) {
            // This block might not be necessary since toast.promise handles the errors
            toast.error(error?.data?.message || 'An unexpected error occurred.');
            console.error("Error:", error);
        }finally {
            setIsLoading(false);
        }
    }


    return (
        <AuthForm
            type="FORGOT_PASSWORD"
            schema={forgotPasswordSchema}
            onSubmit={onSubmit}
            defaultValues={{
                email: "",
            }}
            authDescription="Reset Email will be sent to your inbox"
            authTitle="Account Reset Password"
            loading={isLoading}

        />
    )
}

export default GetTokenPage
