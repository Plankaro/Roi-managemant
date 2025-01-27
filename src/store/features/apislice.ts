// src/api/apiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./basequery";


export const apiSlice = createApi({
 
  baseQuery,
  endpoints: (builder) => ({
   getToken: builder.mutation({
    query:(body)=>({
      url:"/auth/token-link",
      method:'POST',
      body

   })
   }),

    signup: builder.mutation({
      query: (body) => ({
        url: "/auth/register", // Adjust the endpoint based on your API
        method: "POST",
        body, // Pass the signup payload (e.g., email, password, etc.)
      }),
    }),

    verifyToken: builder.query({
      query: (token) => ({
        url: `/auth/verify-token/${token}`, // Match the backend route
        method: "GET",
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, body }) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body, // Pass the resetPasswordDto (e.g., password and confirmPassword)
      }),
    }),
  }),
});

export const { useGetTokenMutation,  useSignupMutation,useVerifyTokenQuery,useResetPasswordMutation  } = apiSlice;
