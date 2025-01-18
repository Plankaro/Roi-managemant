"use client";

import AuthForm from "@/components/page/auth/auth-form";
import { SignInFormValues, signInSchema } from "@/zod/auth/auth.schema";




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