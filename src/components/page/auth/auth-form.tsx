import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";
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
import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";

interface AuthFormProps<T extends FieldValues> {
  type: "SIGN_IN" | "SIGN_UP" | "FORGOT_PASSWORD" | "RESET_PASSWORD";
  onSubmit: (data: T) => void;
  schema: ZodType<T>;
  defaultValues: T;
  authTitle?: string;
  authDescription?: string;
  loading?: boolean;
}

const AuthForm = <T extends FieldValues>({
  type,
  defaultValues,
  onSubmit,
  schema,
  authTitle,
  authDescription,
  loading,
}: AuthFormProps<T>) => {
  const isSignIn = type === "SIGN_IN";
  const isForgotPassword = type === "FORGOT_PASSWORD";
  const isSignUp = type === "SIGN_UP";
  const isResetPassword = type === "RESET_PASSWORD";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  // State to track whether to show password fields as plain text.
  const [showPasswords, setShowPasswords] = useState<{
    [key: string]: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    console.log("🚀 ~ handleSubmit ~ data:", data);
    try {
      if (!data) return;
      await onSubmit(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">{authTitle}</h2>
        <p className="text-gray-200 text-sm">{authDescription}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {Object.keys(defaultValues)
            .filter((field) => field !== "rememberMe")
            .map((field) => {
              return (
                <FormField
                  key={field}
                  control={form.control}
                  name={field as Path<T>}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel className="capitalize">
                        {formField.name}
                      </FormLabel>
                      <FormControl>
                        {["password", "confirmPassword"].includes(
                          formField.name
                        ) ? (
                          <div className="relative">
                            <Input
                              // Set type based on whether the field should be visible or hidden.
                              type={
                                showPasswords[formField.name]
                                  ? "text"
                                  : "password"
                              }
                              placeholder="********"
                              className={cn(
                                "bg-white/10 border-white/20 text-white placeholder:text-gray-400 leading-none",
                                {
                                  "pt-2": true,
                                }
                              )}
                              {...formField}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowPasswords((prev) => ({
                                  ...prev,
                                  [formField.name]: !prev[formField.name],
                                }))
                              }
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-300"
                            >
                              {showPasswords[formField.name] ? <Eye /> : <EyeClosed />}
                            </button>
                          </div>
                        ) : (
                          <Input
                            type={formField.name === "email" ? "email" : "text"}
                            placeholder={
                              formField.name === "email"
                                ? "user@example.com"
                                : formField.name
                            }
                            className={cn(
                              "bg-white/10 border-white/20 text-white placeholder:text-gray-400 leading-none",
                              {
                                "pt-2": false,
                              }
                            )}
                            {...formField}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary-500 hover:bg-primary-600 capitalize"
            >
              {isSignIn
                ? "Sign In"
                : isForgotPassword
                ? "Send"
                : isResetPassword
                ? "Reset Password"
                : "Sign Up"}
            </Button>
          </div>

          {/* Forgot Password Link for Sign In Page */}
          {isSignIn && (
            <div className="text-center mt-2">
              <Link
                href="/get-token"
                className="text-secondary-500 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>
          )}

          {isSignUp && (
            <div className="text-[9px] font-normal text-gray-300">
              By Creating an Account, it means you agree to our Privacy Policy
              and Terms of Service
            </div>
          )}
          <div className="text-center text-sm">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              href={isSignIn ? "sign-up" : "/sign-in"}
              className="text-secondary-500 hover:text-secondary-500/90"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
