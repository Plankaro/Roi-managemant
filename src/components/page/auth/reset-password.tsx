/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AuthForm from "@/components/page/auth/auth-form";
import React from "react";
import {
  resetPasswordSchema,
  ResetPasswordFormValues,
} from "@/zod/auth/auth.schema";
import { useResetPasswordMutation } from "@/store/features/apislice";
import toast from "react-hot-toast";

function ResetpasswordComponent({ id }: { id: string }) {
  const [resetPassword, { isLoading, }] = useResetPasswordMutation();
  async function onSubmit(values: ResetPasswordFormValues) {
    console.log(id); // Ensure `id` is properly available in the scope.

    try {
        const promise = resetPassword({ token: id, body: values }).unwrap(); // Start the resetPassword mutation promise

        toast.promise(
            promise,
            {
                loading: "Resetting password...",
                success: "Password reset successfully!",
                error: (error: any) =>
                    error?.data?.message || "An error occurred while resetting the password.",
            }
        );

        const data = await promise; // Wait for the mutation to resolve
        console.log("Password Reset Response:", data);
    } catch (error: any) {
        // This block handles unexpected issues not caught by `toast.promise`.
        toast.error(error?.data?.message || "An unexpected error occurred.");
        console.error("Error during password reset:", error);
    }
}
  return (
    <AuthForm
      type="RESET_PASSWORD"
      schema={resetPasswordSchema}
      onSubmit={onSubmit}
      defaultValues={{
        password: "",
        confirmPassword: "",
      }}
      loading={isLoading}
      authTitle="Reset Password"
    />
  );
}

export default ResetpasswordComponent;
