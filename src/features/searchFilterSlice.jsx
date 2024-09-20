import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
  search: "",
  date: "",
  source: "",
  author: "",
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
    clearFilters: () => initialState,
  },
});

// Selectors
export const selectCategory = (state) => state.searchFilter.category;
export const selectSearch = (state) => state.searchFilter.search;
export const selectDate = (state) => state.searchFilter.date;
export const selectSource = (state) => state.searchFilter.source;
export const selectAuthor = (state) => state.searchFilter.author;

export const {
  setCategory,
  setSearch,
  setDate,
  setSource,
  setAuthor,
  clearFilters,
} = searchFilterSlice.actions;

export default searchFilterSlice.reducer;
