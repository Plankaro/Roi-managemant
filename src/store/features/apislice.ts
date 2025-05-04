// src/api/apiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./basequery";
import { Filters } from "./prospect";

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [
    "Prospect",
    "shopifyCustomer",
    "getbroadcastbyid",
    "getchatsById",
    "flashresponse",
    "getbroadcastbyid",
    "bots",
    "teams",
    "tags",
    "integrations",
    "profile"
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
      query: (filters: Filters) => {
        const queryParams = new URLSearchParams();

        Object.entries(filters).forEach(([key, values]) => {
          values.forEach((value: string) => {
            queryParams.append(key, value);
          });
        });

        return {
          url: `/prospects?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Prospect"],
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
      invalidatesTags: ["teams"],
    }),
    asignChat: builder.mutation({
      query: (body) => ({
        url: "/agents/assign-chat",
        method: "POST",
        body,
      }),
    }),
    getTeam: builder.query({
      query: () => ({
        url: "/agents",
        method: "GET",
      }),
      providesTags: ["teams"],
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
      invalidatesTags: ["teams"],
    }),
    deleteTeam: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/agents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["teams"],
    }),
    createCampaign: builder.mutation({
      query: (body) => ({
        url: "/campaign",
        method: "POST",
        body,
      }),
    }),
    updateCampaign: builder.mutation({
      query: ({ id, body }) => ({
        url: `campaign/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    changeCampaignStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `campaign/status/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    getCampaign: builder.query({
      query: () => ({
        url: "/campaign",
        method: "GET",
      }),
    }),
    getSpecificCampaign: builder.query({
      query: (id) => ({
        url: `/campaign/${id}`,
        method: "GET",
      }),
    }),
    getEcommerceAnalytics: builder.query({
      query: ({ startDate, endDate }) => ({
        url: "/analytics/ecommerce",
        params: { startDate, endDate },
      }),
    }),
    getEngagementAnalytics: builder.query({
      query: ({ startDate, endDate }) => ({
        url: "/analytics/engagement",
        params: { startDate, endDate },
      }),
    }),
    getChatAnalytics: builder.query({
      query: ({ startDate, endDate }) => ({
        url: "/analytics/chat",
        params: { startDate, endDate },
      }),
    }),
    createTemplate: builder.mutation({
      query: (body) => ({
        url: "/template",
        method: "POST",
        body,
      }),
    }),
    sendWhatsappMedia: builder.mutation({
      query: (body) => ({
        url: "/template/upload-media",
        method: "POST",
        body,
      }),
    }),
    getAllTemplatesIncludingPending: builder.query({
      query: () => ({
        url: "/template",
        method: "GET",
      }),
    }),
    deleteTemplate: builder.mutation({
      query: (name: string) => ({
        url: `/template`,
        method: "DELETE",
        params: { name }, // sends ?name=template-name
      }),
    }),
    findBots: builder.query({
      query: () => ({
        url: "/bot",
        method: "GET",
      }),
      providesTags: ["bots"],
    }),
    createOrUpdateBot: builder.mutation({
      query: (body) => ({
        url: "/bot",
        method: "POST",
        body, // 👈 include the body here
      }),
      invalidatesTags: ["bots"],
    }),
    markMessagesAsRead: builder.mutation<void, { prospectId: string }>({
      query: ({ prospectId }) => ({
        url: "/chats",
        method: "PATCH",
        params: { prospect_id: prospectId }, // Query parameter
        // Request body
      }),
    }),
    getTags: builder.query({
      query: () => ({
        url: "/tags",
        method: "GET",
      }),
      providesTags: ["tags"],
    }),
    createTags: builder.mutation({
      query: (body) => ({
        url: "/tags",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tags"],
    }),
    deleteTag: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/tags/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tags"],
    }),
    getTagforProspect: builder.query({
      query: (prospectId) => ({
        url: `/tags/prospect/${prospectId}`,
        method: "GET",
      }),
      providesTags: ["tags"],
    }),
    createTagforProspect: builder.mutation({
      query: (body) => ({
        url: "/tags/prospect",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tags"],
    }),
    deleteTagForProspect: builder.mutation<
      void,
      { id: string; ProspectId: string }
    >({
      query: ({ id, ProspectId }) => ({
        url: `/tags/prospect/${ProspectId}`,
        method: "DELETE",
        params: { tag_id: id },
      }),
      invalidatesTags: ["tags"],
    }),
    getNotifications: builder.query({
      query: (id) => ({
        url: `/buisness/notifications/${id}`,
        method: "GET",
      }),
    }),
    postGoogleAnalytics: builder.mutation({
      query: (body) => ({
        url: "buisness/google_analytics",
        method: "POST",
        body,
      }),
      invalidatesTags: ["integrations"],
    }),
    deleteGoogleAnalytics: builder.mutation({
      query: () => ({
        url: "buisness/google_analytics",
        method: "DELETE",
      }),
      invalidatesTags: ["integrations"],
    }),
    postRazorPay: builder.mutation({
      query: (body) => ({
        url: "buisness/razorpay",
        method: "POST",
        body,
      }),
      invalidatesTags: ["integrations"],
    }),
    deleteRazorPay: builder.mutation({
      query: () => ({
        url: "buisness/razorpay",
        method: "DELETE",
      }),
      invalidatesTags: ["integrations"],
    }),
    postmetapixel: builder.mutation({
      query: (body) => ({
        url: "buisness/meta_pixel",
        method: "POST",
        body,
      }),
      invalidatesTags: ["integrations"],
    }),
    deletemetapixel: builder.mutation({
      query: () => ({
        url: "buisness/meta_pixel",
        method: "DELETE",
      }),
      invalidatesTags: ["integrations"],
    }),

    postWhatsapp: builder.mutation({
      query: (body) => ({
        url: "buisness/whatsapp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["integrations"],
    }),

    deleteWhatsapp: builder.mutation({
      query: () => ({
        url: "buisness/whatsapp",
        method: "DELETE",
      }),
      invalidatesTags: ["integrations"],
    }),
    getIntegrations: builder.query({
      query: () => ({
        url: "buisness/integrations",
        method: "GET",
      }),
      providesTags: ["integrations"],
     
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "auth/update",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["profile"],
    }),
    getProfile: builder.query({
      query: () => ({
        url: "auth",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    uninstallShopify: builder.mutation({
      query: () => ({
        url: "auth/shopify/uninstall",
        method: "POST",
      }),
      invalidatesTags: ["integrations"],
    }),
    installShopify: builder.mutation({
      query: (body) => ({
        url: 'auth/shopify/install',
        method: 'POST',
        body,
      }),
    }),

    
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
  useGetCampaignQuery,
  useAsignChatMutation,
  useGetEcommerceAnalyticsQuery,
  useGetEngagementAnalyticsQuery,
  useGetChatAnalyticsQuery,
  useCreateTemplateMutation,
  useSendWhatsappMediaMutation,
  useGetAllTemplatesIncludingPendingQuery,
  useDeleteTemplateMutation,
  useFindBotsQuery,
  useCreateOrUpdateBotMutation,
  useMarkMessagesAsReadMutation,
  useGetTagsQuery,
  useCreateTagsMutation,
  useDeleteTagMutation,
  useGetTagforProspectQuery,
  useCreateTagforProspectMutation,
  useDeleteTagForProspectMutation,
  useGetNotificationsQuery,
  usePostGoogleAnalyticsMutation,
  useDeleteGoogleAnalyticsMutation,
  usePostRazorPayMutation,
  useDeleteRazorPayMutation,
  usePostmetapixelMutation,
  useDeletemetapixelMutation,
  usePostWhatsappMutation,
  useDeleteWhatsappMutation,
  useGetIntegrationsQuery,
  useUpdateProfileMutation,
  useGetProfileQuery,
  useUninstallShopifyMutation,
  useInstallShopifyMutation,
  useGetSpecificCampaignQuery,
  useUpdateCampaignMutation,
  useChangeCampaignStatusMutation
} = apiSlice;
