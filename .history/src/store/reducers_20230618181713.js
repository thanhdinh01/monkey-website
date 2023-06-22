import { combineReducers } from "@reduxjs/toolkit";
import globalSlice from "./global/globalSlice";

export const reducers = combineReducers({
  global: globalSlice,
});
