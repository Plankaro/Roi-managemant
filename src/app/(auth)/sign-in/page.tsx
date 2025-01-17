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
import { Checkbox } from "@/components/ui/checkbox";
import { SignInFormValues, signInSchema } from "@/zod/auth/auth.schema";



export default function Home() {
    const form = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    function onSubmit(values: SignInFormValues) {
        console.log(values);
    }

    return (
        <main className="min-h-screen  flex items-center justify-center p-4">
            <div className="w-full container grid lg:grid-cols-2 gap-8 items-center ">

                {/* Left side - Branding */}
                <div className="flex items-center justify-center order-1">
                    <div className="text-white space-y-6">
                        <div className="flex items-center gap-2 text-2xl font-bold">
                            <Magnet className="w-8 h-8 text-red-500" />
                            <span>ROI Magnet</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold">
                            Building your Business...
                        </h1>
                        <p className="text-gray-300 max-w-md">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
                    <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 text-white max-w-[455px] order-2">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">Account Sign In</h2>
                                <p className="text-gray-400">
                                    Start your 30 day free trial. Cancel any time
                                </p>
                            </div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
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
                                    <div className="flex items-center justify-between">
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
                                    </div>
                                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                        Sign In
                                    </Button>
                                    <div className="text-center text-sm">
                                        Already have an account?{" "}
                                        <Button variant="link" className="text-red-500 p-0">
                                            Sign Up
                                        </Button>
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