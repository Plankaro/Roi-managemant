/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AuthForm from "@/components/page/auth/auth-form";
import React, { useState } from "react";
import {
  resetPasswordSchema,
  ResetPasswordFormValues,
} from "@/zod/auth/auth.schema";

import toast from "react-hot-toast";
import axios from "axios";

function ResetpasswordComponent({ id }: { id: string }) {
  const [loading, setIsLoading] = useState(false);
  async function onSubmit(values: ResetPasswordFormValues) {
    console.log(id); // Ensure `id` is properly available in the scope.

    setIsLoading(true);
    try {
      const promise = axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/${id}`,
        values
      );

      toast.promise(promise, {
        loading: "Resetting password...",
        success: "Password reset successfully!",
        error: (error: any) =>
          error?.data?.message ||
          "An error occurred while resetting the password.",
      });

      const data = await promise; // Wait for the mutation to resolve
      console.log("Password Reset Response:", data);
    } catch (error: any) {
      // This block handles unexpected issues not caught by `toast.promise`.
      toast.error(error?.data?.message || "An unexpected error occurred.");
      console.error("Error during password reset:", error);
    } finally {
      setIsLoading(false);
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
      loading={loading}
      authTitle="Reset Password"
    />
  );
}

export default ResetpasswordComponent;
