// src/api/apiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./basequery";

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Prospect","shopifyCustomer"], // Define tags for invalidation
  endpoints: (builder) => ({
    getToken: builder.mutation({
      query: (body) => ({
        url: "/auth/token-link",
        method: "POST",
        body,
      }),
    }),

    signup: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    verifyToken: builder.query({
      query: (token) => ({
        url: `/auth/verify-token/${token}`,
        method: "GET",
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ token, body }) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body,
      }),
    }),

    getAllShopifyContacts: builder.query({
      query: () => ({
        url: "/customers",
        method: "GET",
      }),
    }),

    getSpecificShopifyContacts: builder.query({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "GET",
      }),
      providesTags: ["shopifyCustomer"], // Provide the 'Prospect' tag
    }),


    createProspect: builder.mutation({
      query: (body) => ({
        url: "/prospects",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Prospect"], // Invalidate the 'Prospect' tag after creating
    }),

    getProspect: builder.query({
      query: () => ({
        url: "/prospects",
        method: "GET",
      }),
      providesTags: ["Prospect"], // Provide the 'Prospect' tag
    }),
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    createOrder:builder.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["shopifyCustomer"], // Invalidate the 'Prospect' tag after creating
    })
  }),
});

export const {
  useGetTokenMutation,
  useSignupMutation,
  useVerifyTokenQuery,
  useResetPasswordMutation,
  useGetAllShopifyContactsQuery,
  useGetSpecificShopifyContactsQuery,
  useCreateProspectMutation,
  useGetProspectQuery,
  useGetProductsQuery,
  useCreateOrderMutation
} = apiSlice;
