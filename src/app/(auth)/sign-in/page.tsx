"use client";

import AuthForm from "@/components/page/auth/auth-form";
import { SignInFormValues, signInSchema } from "@/zod/auth/auth.schema";
import { handleCredentialsSignin } from "./action";

import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

export default function Home() {

    const res = useRouter();
    async function onSubmit(values: SignInFormValues) {
      
            const result = await handleCredentialsSignin(values);
            console.log(result);
            if(result?.message){
                toast.error(result.message);
                return;
            }else{
                toast.success("Sign-in successful");
                res.push("/chats");
            }
            console.log(result);
         
      
           
        
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
