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
      .addCase(handleSearchPost.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loadingSearch = false;
      })
      .addCase(handleSearchPost.pending, (state, action) => {
        state.loadingSearch = true;
      })
      .addCase(handleSearchPost.rejected, (state, action) => {
        state.loadingSearch = false;
      });
  },
});

export const { setPosts, setQuery } = totalSearchSlice.actions;
export default totalSearchSlice.reducer;
