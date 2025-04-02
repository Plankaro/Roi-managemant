// src/api/apiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./basequery";

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [
    "Prospect",
    "shopifyCustomer",
    "getbroadcastbyid",
    "getchatsById",
    "flashresponse",
    "getbroadcastbyid",
    
  ], // Define tags for invalidation
  endpoints: (builder) => ({
    getToken: builder.mutation({
      query: (body) => ({
        url: "/auth/token-link",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
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

    getStarredCustomers: builder.query({
      query: () => ({
        url: "/customers/starred",
        method: "GET",
      }),
    }),
    createStarredCustomer: builder.mutation({
      query: (body) => ({
        url: "/customers/starred",
        method: "POST",
        body,
      }),
      invalidatesTags: ["shopifyCustomer"], // Invalidate the 'shopifyCustomer' tag after creating
    }),
    getShopifyOrders: builder.query({
      query: (id) => ({
        url: `/orders/customer/${id}`,
        method: "GET",
      }),
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
      }),
    }),
    updateProspect: builder.mutation({
      query: ({ id, body }) => ({
        url: `/prospects/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    changeBlockStatus: builder.mutation({
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
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["shopifyCustomer"], // Invalidate the 'Prospect' tag after creating
    }),
    getChats: builder.query({
      query: ({ prospect_id }) => ({
        url: "chats",
        params: { prospect_id }, // Pass parameters here
      }),
      providesTags: ["getchatsById"],
    }),
    deleteChats: builder.mutation<void, { prospect_id: string }>({
      query: ({ prospect_id }) => ({
        url: `chats`,
        method: "DELETE",
        params: { prospect_id }, // Pass parameters correctly
      }),
      invalidatesTags: ["getchatsById"],
    }),
    markasread: builder.mutation({
      query: ({ prospectId, body }) => ({
        url: `/chats/${prospectId}`,
        method: "PATCH",
        body,
      }),
    }),

    sendText: builder.mutation({
      query: (sendChatDto) => ({
        url: "/chats/text",
        method: "POST",
        body: sendChatDto, // Send the required parameters in the body
      }),
    }),

    getAllTemplates: builder.query({
      query: () => ({
        url: "/chats/template",
        method: "GET",
      }),
    }),
    getSpecifTemplates: builder.query({
      query: (name) => ({
        url: `/chats/specific-template`,
        method: "GET",
        query: { name },
      }),
    }),
    uploadFiles: builder.mutation({
      query: (formData) => ({
        url: "/cloudinary/upload-multiple",
        method: "POST",
        body: formData,
      }),
    }),
    sendTemplates: builder.mutation({
      query: (formData) => ({
        url: "/chats/template",
        method: "POST",
        body: formData,
      }),
    }),
    sendMedia: builder.mutation({
      query: (formData) => ({
        url: "/chats/media",
        method: "POST",
        body: formData,
      }),
    }),
    getSegments: builder.query({
      query: () => ({
        url: "/customers/segments",
        method: "GET",
      }),
    }),
    createBroadcast: builder.mutation({
      query: (body) => ({
        url: "/broadcast",
        method: "POST",
        body,
      }),
    }),
    sendTestMessage: builder.mutation({
      query: (body) => ({
        url: "/broadcast/test",
        method: "POST",
        body,
      }),
    }),
    getAllBroadcasts: builder.query({
      query: () => ({
        url: "/broadcast",
        method: "GET",
      }),
    }),
    getBroadcastById: builder.query({
      query: (id) => ({
        url: `/broadcast/${id}`,
        method: "GET",
      }),
      providesTags: ["getbroadcastbyid"],
    }),
    createBroadcastRetry: builder.mutation({
      query: (body) => ({
        url: `/broadcast/retry`,
        method: "Post",
        body,
      }),
      invalidatesTags: ["getbroadcastbyid"], // Invalidate the 'getbroadcastbyid' tag after creating
    }),
    getRetryBroadcast: builder.query({
      query: (id) => ({
        url: `/broadcast/retry/${id}`,
        method: "GET",
      }),
    }),
    getFlashResponse: builder.query({
      query: () => ({
        url: `/flashresponse`,
        method: "GET",
      }),
      providesTags: ["flashresponse"], // Provide the 'flashresponse' tag
    }),
    createFlashResponse: builder.mutation({
      query: (body) => ({
        url: "/flashresponse",
        method: "POST",
        body,
      }),
      invalidatesTags: ["flashresponse"], // Invalidate the 'flashresponse' tag after creating
    }),
    updateFlashResponse: builder.mutation({
      query: ({ id, body }) => ({
        url: `/flashresponse/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["flashresponse"], // Invalidate the 'flashresponse' tag after updating
    }),
    deleteFlashResponse: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/flashresponse/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["flashresponse"],
    }),
    createTeam: builder.mutation({
      query: (body) => ({
        url: "/agents",
        method: "POST",
        body,
      }),
    }),
    getTeam: builder.query({
      query: () => ({
        url: "/agents",
        method: "GET",
      }),
    }),
    getSpecificTeam: builder.query({
      query: (id) => ({
        url: `/agents/${id}`,
        method: "GET",
      }),
    }),
    updateTeam: builder.mutation({
      query: ({ id, body }) => ({
        url: `/agents/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteTeam: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/agents/${id}`,
        method: "DELETE",
      }),
    }),
    createCampaign: builder.mutation({
      query: (body) => ({
        url: "/campaign",
        method: "POST",
        body,
      }),
    }),
    getCampaign:builder.query({
      query: () => ({
        url: "/campaign",
        method: "GET",
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
  useMarkasreadMutation,
  useDeleteChatsMutation,
  useSendTextMutation,
  useGetAllTemplatesQuery,
  useGetSpecifTemplatesQuery,
  useUploadFilesMutation,
  useSendTemplatesMutation,
  useSendMediaMutation,
  useGetSegmentsQuery,
  useCreateBroadcastMutation,
  useSendTestMessageMutation,
  useGetAllBroadcastsQuery,
  useGetBroadcastByIdQuery,
  useCreateBroadcastRetryMutation,
  useGetRetryBroadcastQuery,
  useGetShopifyOrdersQuery,
  useGetStarredCustomersQuery,
  useCreateStarredCustomerMutation,
  useCreateFlashResponseMutation,
  useGetFlashResponseQuery,
  useUpdateFlashResponseMutation,
  useDeleteFlashResponseMutation,
  useCreateTeamMutation,
  useGetTeamQuery,
  useDeleteTeamMutation,
  useUpdateTeamMutation,
  useGetSpecificTeamQuery,
  useCreateCampaignMutation,
  useGetCampaignQuery
} = apiSlice;
