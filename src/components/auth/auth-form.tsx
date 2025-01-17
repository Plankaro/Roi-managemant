import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { DefaultValues, FieldValues, Path, useForm, UseFormReturn } from 'react-hook-form'
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

interface AuthFormProps<T extends FieldValues> {
    type: 'SIGN_IN' | 'SIGN_UP'
    onSubmit: (data: T) => Promise<{ error?: string, success?: boolean }>
    schema: ZodType<T>,
    defaultValues: T
}

const AuthForm = <T extends FieldValues>({ type, defaultValues, onSubmit, schema }: AuthFormProps<T>) => {

    const isSignIn = type === 'SIGN_IN'

    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>
    });




    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Account Sign In</h2>
                <p className="text-gray-400">
                    Start your 30 day free trial. Cancel any time
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    {
                        Object.keys(defaultValues).map((field) => {
                            return (
                                <FormField
                                    key={field}
                                    control={form.control}
                                    name={field as Path<T>}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{field.name}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="john@example.com"
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

                    {/* <div className="flex items-center justify-between">
                        <FormField
                            control={form.control}
                            name="rememberMe"
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
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Remember me
                                    </label>
                                </div>
                            )}
                        />
                        <Button variant="link" className="text-blue-400 p-0">
                            Forgot Password?
                        </Button>
                    </div> */}
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        {isSignIn ? "Sign In" : "Sign Up"}
                    </Button>

                    <div className="text-center text-sm">
                        {isSignIn ? " Don't have an account?{' '}" : `Already have an account?{" "}`}
                        <Link href={isSignIn ? "sign-up" : "/sign-in"} className="text-blue-400 hover:text-blue-300">
                            {isSignIn ? " Sign Up" : "Sign In"}
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AuthForm
