import { createSlice } from "@reduxjs/toolkit";

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
});

export const { setPosts, setLight, setUser } = globalSlice.actions;
export default globalSlice.reducer;
