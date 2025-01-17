"use client";
import AuthForm from '@/components/auth/auth-form'
import { forgotPasswordSchema } from '@/zod/auth/auth.schema'
import React from 'react'

const ForgotPasswordPage = () => {

    function onSubmit(values: { email: string }) {
        console.log(values)
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

        />
    )
}

export default ForgotPasswordPage
