import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const baseQuery = fetchBaseQuery({
  baseUrl: `/api`, // Your API base URL

  
      // Get the session from NextAuth
   
});

export default baseQuery;
