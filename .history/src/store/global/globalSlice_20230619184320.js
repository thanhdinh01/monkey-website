import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    toggleLight: false,
    posts: ["thanh", "mit"],
  },
  reducers: {
    setPosts: (state, actions) => ({
      ...state,
      posts: actions.payload,
    }),
  },
});

export const { setPosts } = globalSlice.actions;
export default globalSlice.reducer;
