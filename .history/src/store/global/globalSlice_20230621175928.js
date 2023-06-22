import { createSlice } from "@reduxjs/toolkit";
import { handleSearchPost } from "../total-search/handler";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    user: {},
    toggleLight: "",
    posts: [],
    loadingSearch: false,
  },
  reducers: {
    setUser: (state, actions) => ({
      ...state,
      user: actions.payload,
    }),
    setPosts: (state, actions) => ({
      ...state,
      posts: actions.payload,
    }),
    setLight: (state, actions) => ({
      ...state,
      toggleLight: actions.payload,
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

export const { setPosts, setLight, setUser } = globalSlice.actions;
export default globalSlice.reducer;
