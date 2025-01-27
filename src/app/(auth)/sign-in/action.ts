"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function handleCredentialsSignin({
  email,
  password,
  rememberMe
}: {
  email: string;
  password: string;
  rememberMe: boolean;
}) {
  try {
    console.log({ email, password, rememberMe });
    await signIn("credentials", { email, password,rememberMe, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
          };
        default:
          return {
            message: "Something went wrong.",
          };
      }
    }
    throw error;
  }
}
