import { createSlice } from "@reduxjs/toolkit";
import { handleSearchPost } from "./handler";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    user: {},
    toggleLight: "",
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
  extraReducers:(builder=>{
    builder.addCase(handleSearchPost.fulfilled, (state, action)=>{
      state.posts=action.payload,
      
    })
  })
});

export const { setPosts, setLight, setUser } = globalSlice.actions;
export default globalSlice.reducer;
