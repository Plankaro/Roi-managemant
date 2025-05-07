"use client";

import AuthForm from "@/components/page/auth/auth-form";
import { SignInFormValues, signInSchema } from "@/zod/auth/auth.schema";
import { handleCredentialsSignin } from "./action";
// Importing signIn from auth
import toast from "react-hot-toast";

export default function Home() {
 
    async function onSubmit(values: SignInFormValues) {
        try {
            const promise = handleCredentialsSignin(values);
            toast.promise(promise, {
                loading: "Signing in...",
                success: "Signed in successfully!",
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                error: (error: any) => error?.data?.message || "An unexpected error occurred",
            })
            const result = await handleCredentialsSignin(values);
           
            console.log(result);
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthForm
            type="SIGN_IN"
            schema={signInSchema}
            onSubmit={onSubmit}
            defaultValues={{
                email: "",
                password: "",
               
            }}
            authDescription="Start your 30 day free trial. Cancel any time"
            authTitle="Account Sign In"
        />
    );
}
