import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  search: "",
  date: "",
  source: [],
  author: [],
  count: 0,
};

const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setSource: (state, action) => {
      state.source = action.payload;
    },
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    clearFilters: () => initialState,
  },
});

// Selectors
export const selectCategory = (state) => state.searchFilter.category;
export const selectSearch = (state) => state.searchFilter.search;
export const selectDate = (state) => state.searchFilter.date;
export const selectSource = (state) => state.searchFilter.source;
export const selectAuthor = (state) => state.searchFilter.author;
export const selectCount = (state) => state.searchFilter.count;

export const {
  setCategory,
  setSearch,
  setDate,
  setSource,
  setAuthor,
  setCount,
  clearFilters,
} = searchFilterSlice.actions;

export default searchFilterSlice.reducer;
