import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";


const baseQuery = retry(
  async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl: `/api`, // Your API base URL
    });

    return baseQuery(args, api, extraOptions);
  },
  { maxRetries: 5 } // Set max retries to 5
);

export default baseQuery;
