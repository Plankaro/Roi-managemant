"use client";

import { SignUpFormValues, signUpSchema } from "@/zod/auth/auth.schema";
import AuthForm from "@/components/page/auth/auth-form";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
export default function SignUpPage() {

    const [loading,setLoading] = useState(false)
    const onSubmit = (values: SignUpFormValues) => {
        if(values.password !== values.confirmPassword){
            toast.error("Passwords do not match")
            return

        }
        setLoading(true)
        const promise = axios.post("/api/auth/sign-up",values)
        toast.promise(promise, {
            loading: "Signing up...",
            success: "Signed up successfully",
            error: promise.catch((error) => error.response.data.message),
        })
        promise.finally(() => {
            setLoading(false)
        })




    }

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
            authDescription="Start your 30 day free trial. Cancel any time"
            authTitle="Account Sign In"

        />

    );
}