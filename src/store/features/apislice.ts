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
    logout:builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
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
    getSpecficProspect: builder.query({
      query: (id) => ({
        url: `/prospects/${id}`,
        method: "GET",
      })
    }),
    updateProspect: builder.mutation({
      query: ({ id, body }) => ({
        url: `/prospects/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    changeBlockStatus:builder.mutation({
      query: ({ id }) => ({
        url: `/prospects/block/${id}`,
        method: "PATCH",
        
      }),
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
    }),
    getChats: builder.query({
      query: ({prospect_id }) => ({
        url: 'chats',
        params: {prospect_id }, // Pass parameters here
      }),
    }),
    sendText: builder.mutation({
      query: (sendChatDto) => ({
        url: '/chats/text',
        method: 'POST',
        body: sendChatDto, // Send the required parameters in the body
      }),
    }),
    
    getAllTemplates:builder.query({
      query: () => ({
        url: '/chats/template',
        method: 'GET',
      }),
    }),
    uploadFiles: builder.mutation({
      query: (formData) => ({
        url: "/cloudinary/upload-multiple",
        method: "POST",
        body: formData,
      }),
    })
    ,
    sendTemplates:builder.mutation({
      query: (formData) => ({
        url: "/chats/template",
        method: "POST",
        body: formData,
      }),
    }),
    sendMedia:builder.mutation({
      query: (formData) => ({
        url: "/chats/media",
        method: "POST",
        body: formData,
      }),
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
  useChangeBlockStatusMutation,
  useCreateProspectMutation,
  useGetProspectQuery,
  useGetSpecficProspectQuery,
  useUpdateProspectMutation,
  useGetProductsQuery,
  useCreateOrderMutation,
  useGetChatsQuery,
  useSendTextMutation,
  useGetAllTemplatesQuery,
  useUploadFilesMutation,
  useSendTemplatesMutation,
  useSendMediaMutation,

} = apiSlice;
