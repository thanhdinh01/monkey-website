import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    postId: "",
    toggleLight: false,
    posts: ["thanh", "mit"],
  },
  reducers: {
    setPostId: (state, actions) => ({
      ...state,
      posts: actions.payload,
    }),
    setPosts: (state, actions) => ({
      ...state,
      posts: actions.payload,
    }),
  },
});

export const { setPosts } = globalSlice.actions;
export default globalSlice.reducer;
