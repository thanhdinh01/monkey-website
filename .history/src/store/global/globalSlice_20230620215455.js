import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    toggleLight: true,
    posts: ["thanh", "mit"],
  },
  reducers: {
    setPosts: (state, actions) => ({
      ...state,
      posts: actions.payload,
    }),
    setLight: (state, actions) => ({
      ...state,
      toggleLight: actions.payload,
    }),
  },
});

export const { setPosts, setLight } = globalSlice.actions;
export default globalSlice.reducer;
