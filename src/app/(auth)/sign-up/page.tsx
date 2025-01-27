/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SignUpFormValues, signUpSchema } from "@/zod/auth/auth.schema";
import AuthForm from "@/components/page/auth/auth-form";
import toast from "react-hot-toast";
import { useSignupMutation,useGetTokenMutation } from "@/store/features/apislice";



export default function SignUpPage() {

    const [signup, { isLoading }] = useSignupMutation();
    const [getTokens,{isLoading:getTokensLoading}]=useGetTokenMutation()
    const onSubmit = async (values: SignUpFormValues) => {
        if (values.password !== values.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
    
        try {
            const promise =await signup(values).unwrap();
    
       
    
            const data = await promise;
    
            if (data.email) {
                await getTokens(data.email);
            }
    
            toast.success("Sign-up successful!");
        } catch (error: any) {
            // Check if the error contains a specific message from the server
      
            if (error?.data?.message) {
                toast.error(error.data.message); // Show server-side error message
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
    
            console.error("Sign-up error:", error); // Log for debugging
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
                password: "",
                confirmPassword: ""
            }}
            loading={isLoading || getTokensLoading}
            authDescription="Start your 30 day free trial. Cancel any time"
            authTitle="Account Sign In"

        />

    );
}