"use client";

import { SignInFormValues, signInSchema } from "@/zod/auth/auth.schema";
import AuthForm from "@/components/auth/auth-form";



export default function Home() {

    async function onSubmit(values: SignInFormValues) {
        console.log(values);
    }

    return (
        <AuthForm
            type="SIGN_IN"
            schema={signInSchema}
            onSubmit={onSubmit}
            defaultValues={{
                email: "",
                password: "",
                rememberMe: false,
            }}
            authDescription="Start your 30 day free trial. Cancel any time"
            authTitle="Account Sign In"

        />
    );
}