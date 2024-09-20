import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const GUARDIAN_BASE_URL = import.meta.env.VITE_GUARDIAN_BASE_URL;

export const guardianApi = createApi({
  reducerPath: "guardianApi",
  baseQuery: fetchBaseQuery({ baseUrl: GUARDIAN_BASE_URL }),
  endpoints: (builder) => ({
    getAllGuardianNews: builder.query({
      query: ({ searchText, fromDate, category }) =>
        `search?q=${searchText}${fromDate ? `&from-date=${fromDate}` : ""}&${
          category ? `&section=${category}` : ""
        }&api-key=${GUARDIAN_API_KEY}`,
    }),
  }),
});

export const { useGetAllGuardianNewsQuery } = guardianApi;
