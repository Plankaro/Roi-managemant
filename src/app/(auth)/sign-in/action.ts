"use server";
import { signIn,signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function handleCredentialsSignin({
  email,
  password,

}: {
  email: string;
  password: string;

}) {
  try {
    //console.log({ email, password });
    const res = await signIn("credentials", { email, password,redirect:false });
    console.log(res);
    return 
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials or unverified account",
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

export async function handleSignOut() {
  await signOut();
}