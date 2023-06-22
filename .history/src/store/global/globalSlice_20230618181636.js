import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    userId: "",
    toggleLight: false,
    posts: [],
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
