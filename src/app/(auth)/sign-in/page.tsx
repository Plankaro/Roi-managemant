"use client";

import AuthForm from "@/components/page/auth/auth-form";
import { SignInFormValues, signInSchema } from "@/zod/auth/auth.schema";
import { handleCredentialsSignin } from "./action";
import { useSession } from "next-auth/react";// Importing signIn from auth
import toast from "react-hot-toast";

export default function Home() {
    const {update} = useSession()
    async function onSubmit(values: SignInFormValues) {
        try {
            const result = await handleCredentialsSignin(values);
            if(result?.message=="Invalid credentials or unverified account"){
                toast.error("Invalid credentials or unverified account");
                return;
            }
            //console.log(result);
            update();
        } catch (error) {
            //console.log(error);
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
