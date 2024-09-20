import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const NEWYORK_TIMES_API_KEY = import.meta.env.VITE_NEWYORK_TIMES_API_KEY;
const NEWYORK_TIMES_BASE_URL = import.meta.env.VITE_NEWYORK_TIMES_BASE_URL;

export const newYorkTimesApi = createApi({
  reducerPath: "newYorkTimesApi",
  baseQuery: fetchBaseQuery({ baseUrl: NEWYORK_TIMES_BASE_URL }),
  endpoints: (builder) => ({
    getAllNewYorkTimesNews: builder.query({
      query: ({ searchText, fromDate, category }) =>
        `?q=${searchText}&from=${fromDate}&fq=${category}&api-key=${NEWYORK_TIMES_API_KEY}`,
    }),
  }),
});

export const { useGetAllNewYorkTimesNewsQuery } = newYorkTimesApi;
