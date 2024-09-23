import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_BASE_URL = import.meta.env.VITE_NEWS_BASE_URL;

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: NEWS_BASE_URL }),
  endpoints: (builder) => ({
    getAllNews: builder.query({
      query: ({ searchText, fromDate, source, page, limit }) =>
        `everything?q=${searchText}&from=${fromDate}${
          source !== "all" && source !== "" ? `&sources=${source}` : ""
        }&page=${page}&pageSize=${limit}&apiKey=${NEWS_API_KEY}`,
    }),
  }),
});

export const { useGetAllNewsQuery } = newsApi;
