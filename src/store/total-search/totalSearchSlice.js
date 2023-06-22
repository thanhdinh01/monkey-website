import { createSlice } from "@reduxjs/toolkit";
import { handleSearchPost } from "./handler";

export const totalSearchSlice = createSlice({
  name: "search",
  initialState: {
    posts: [],
    loadingSearch: false,
    query: "",
  },
  reducers: {
    setPosts: (state, actions) => ({
      ...state,
      posts: actions.payload,
    }),
    setQuery: (state, actions) => ({
      ...state,
      query: actions.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleSearchPost.fulfilled, (state, actions) => {
        state.posts = actions.payload;
        state.loadingSearch = false;
      })
      .addCase(handleSearchPost.pending, (state, actions) => {
        state.loadingSearch = true;
      })
      .addCase(handleSearchPost.rejected, (state, actions) => {
        state.loadingSearch = false;
      });
  },
});

export const { setPosts, setQuery } = totalSearchSlice.actions;
export default totalSearchSlice.reducer;
