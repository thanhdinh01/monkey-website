import { combineReducers } from "@reduxjs/toolkit";
import globalSlice from "./global/globalSlice";
import totalSearchSlice from "./total-search/totalSearchSlice";

export const reducers = combineReducers({
  global: globalSlice,
  search: totalSearchSlice,
});
