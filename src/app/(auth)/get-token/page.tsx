/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AuthForm from '@/components/page/auth/auth-form';
import { forgotPasswordSchema } from '@/zod/auth/auth.schema'
import React from 'react'
import { useGetTokenMutation } from '@/store/features/apislice';
import toast from "react-hot-toast";
const GetTokenPage = () => {
    const [getTokens,{isLoading}]=useGetTokenMutation()
    async function onSubmit(values: { email: string }) {
        try {
            const promise = getTokens({email:values.email}).unwrap(); // Unwrap the result to handle errors correctly
            toast.promise(
                promise,
                {
                    loading: 'Loading...',
                    success: 'Verification link sent successfully!',
                    error: (error: any) =>
                        error?.data?.message || 'An unexpected error occurred.',
                }
            );
            console.log(await promise); // Log the resolved value
        } catch (error: any) {
            // This block might not be necessary since toast.promise handles the errors
            toast.error(error?.data?.message || 'An unexpected error occurred.');
            console.error("Error:", error);
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
