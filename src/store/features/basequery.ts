// src/api/baseQuery.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL, // Replace with your API base URL
  prepareHeaders: async (headers) => {
    const session = await getSession();

    if ( session?.accessToken) {
      headers.set("authorization", `Bearer ${session.accessToken}`);
    }

    return headers;
  },
});

export default baseQuery;
