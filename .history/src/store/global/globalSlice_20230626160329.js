import { createSlice } from "@reduxjs/toolkit";
import { handleFetchPost } from "./handlerGlobal";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    user: {},
    toggleLight: true,
    posts: [],
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
      .addCase(handleFetchPost.fulfilled, (state, actions) => {
        state.posts = actions.payload;
      })
      .addCase(handleFetchPost.pending, (state, actions) => {})
      .addCase(handleFetchPost.rejected, (state, actions) => {});
  },
});

export const { setPosts, setLight, setUser } = globalSlice.actions;
export default globalSlice.reducer;
