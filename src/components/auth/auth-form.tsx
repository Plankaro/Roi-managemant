import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import { ZodType } from 'zod'
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Checkbox } from '../ui/checkbox';

interface AuthFormProps<T extends FieldValues> {
    type: 'SIGN_IN' | 'SIGN_UP' | 'FORGOT_PASSWORD'
    onSubmit: (data: T) => Promise<{ error?: string, success?: boolean }>
    schema: ZodType<T>,
    defaultValues: T,
    authTitle?: string
    authDescription?: string

}

const AuthForm = <T extends FieldValues>({ type, defaultValues, onSubmit, schema, authTitle, authDescription }: AuthFormProps<T>) => {

    const isSignIn = type === 'SIGN_IN'
    const isForgotPassword = type === 'FORGOT_PASSWORD'
    const isSignUp = type === 'SIGN_UP'

    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>
    });


    const handleSubmit: SubmitHandler<T> = async (data) => {
        console.log("🚀 ~ consthandleSubmit:SubmitHandler<T>= ~ data:", data)
        try {
            if (!data) return;

            await onSubmit(data)
        } catch (error) {
            console.log(error)
        }

    }



    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold "> {authTitle}</h2>
                <p className="text-gray-200 text-sm">
                    {authDescription}
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">

                    {
                        Object.keys(defaultValues).filter((field) => field !== "rememberMe").map((field) => {
                            return (
                                <FormField
                                    key={field}
                                    control={form.control}
                                    name={field as Path<T>}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='capitalize'>{field.name}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={["password", "confirmPassword"].includes(field.name) ? "********" : field.name === "email" ? "user@example.com" : field.name}
                                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )
                        })
                    }

                    <div>
                        <Button type="submit" className="w-full rounded-full bg-primary-500 hover:bg-primary-600 capitalize ">
                            {isSignIn ? "Sign In" : isForgotPassword ? "send" : "Sign Up"}
                        </Button>


                        {
                            isSignIn && (
                                <div className="flex items-center justify-between pt-2">
                                    <FormField
                                        control={form.control}
                                        name={"rememberMe" as Path<T>}
                                        render={({ field }) => (
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="rememberMe"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="border-white/20 data-[state=checked]:bg-blue-600"
                                                />
                                                <label
                                                    htmlFor="rememberMe"
                                                    className="text-sm pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {" "} Remember me
                                                </label>
                                            </div>
                                        )}
                                    />
                                    <Link href={"/forgot-password"} className="text-white p-0 hover:underline  ">
                                        {" "} Forgot Password?
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                    {
                        isSignUp && (
                            <div className='text-[9px] font-normal text-gray-300'>
                                By Creating an Account, it means you agree to our Privacy Policy and Terms of Service
                            </div>
                        )
                    }

                    <div className="text-center text-sm">
                        {isSignIn ? " Don't have an account?" : `Already have an account?`}{" "}
                        <Link href={isSignIn ? "sign-up" : "/sign-in"} className="text-secondary-500 hover:text-secondary-500/90">
                            {isSignIn ? " Sign Up" : "Sign In"}
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AuthForm
