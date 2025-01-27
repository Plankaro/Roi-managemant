// src/api/baseQuery.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { auth } from "@/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`, // Replace with your API base URL
  // prepareHeaders: async (headers) => {
  //   const session = await  auth();;

  //   if ( session?.accessToken ) {
  //     headers.set("authorization", `Bearer ${session.accessToken}`);
  //   }

  //   return headers;
  // },
});

export default baseQuery;
