// src/api/apiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./basequery";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    getProtectedData: builder.query({
      query: () => "/protected", // Example endpoint
    }),
    postSomeData: builder.mutation({
      query: (body) => ({
        url: "/some-endpoint",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetProtectedDataQuery, usePostSomeDataMutation } = apiSlice;
