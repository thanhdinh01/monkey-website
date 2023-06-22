import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const fetchTotalPost = () => {
  const q = collection(db, "posts");
  return getDocs(q);
};

export const handleSearchPost = createAsyncThunk(
  "search/fetchTotalPost",
  async (searchQuery, thunkAPI) => {
    console.log("searchQuery", searchQuery);
    const res = await fetchTotalPost();
    // console.log("res", res);
    res.forEach((item) => {
      console.log("item", item.id, item.data());
    });

    // return posts;
  }
);
