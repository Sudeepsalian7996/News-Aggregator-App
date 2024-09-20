import { configureStore } from "@reduxjs/toolkit";
import searchFilterReducer from "../features/searchFilterSlice";
import { newsApi } from "../services/newsApi";
import { guardianApi } from "../services/guardianApi";
import { newYorkTimesApi } from "../services/newYorkTimesApi";

const store = configureStore({
  reducer: {
    searchFilter: searchFilterReducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [guardianApi.reducerPath]: guardianApi.reducer,
    [newYorkTimesApi.reducerPath]: newYorkTimesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      newsApi.middleware,
      guardianApi.middleware,
      newYorkTimesApi.middleware
    ),
});

export default store;
