"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Magnet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { SignUpFormValues, signUpSchema } from "@/zod/auth/auth.schema";

export default function SignUp() {
    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    function onSubmit(values: SignUpFormValues) {
        console.log(values);
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-navy-900 via-purple-900 to-red-900 flex items-center justify-center p-4">
            <div className="w-full max-w-[1200px] grid lg:grid-cols-2 gap-8 items-center">
                {/* Left side - Branding */}
                <div className="flex items-center justify-center order-1">

                    <div className="text-white space-y-6">
                        <div className="flex items-center gap-2 text-2xl font-bold">
                            <Magnet className="w-8 h-8 text-red-500" />
                            <span>ROI Magnet</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold">
                            Join Our Community
                        </h1>
                        <p className="text-gray-300 max-w-md">
                            Create your account and start your 30-day free trial. No credit card required.
                        </p>
                        <div className="flex gap-2">
                            <div className="w-8 h-2 bg-white rounded-full" />
                            <div className="w-8 h-2 bg-white/20 rounded-full" />
                            <div className="w-8 h-2 bg-white/20 rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Right side - Form */}
                <div className="flex items-center justify-center order-2">
                    <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 text-white max-w-[455px]">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">Create Account</h2>
                                <p className="text-gray-400">
                                    Start your 30 day free trial. Cancel any time
                                </p>
                            </div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="John"
                                                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Doe"
                                                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="john@example.com"
                                                        type="email"
                                                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="••••••••"
                                                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="••••••••"
                                                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                        Create Account
                                    </Button>
                                    <div className="text-center text-sm">
                                        Already have an account?{" "}
                                        <Link href="/" className="text-blue-400 hover:text-blue-300">
                                            Sign In
                                        </Link>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}