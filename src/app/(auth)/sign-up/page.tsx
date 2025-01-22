"use client";

import { SignUpFormValues, signUpSchema } from "@/zod/auth/auth.schema";
import AuthForm from "@/components/page/auth/auth-form";

export default function SignUp() {


    const onSubmit = (values: SignUpFormValues) => {
        console.log(values);
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