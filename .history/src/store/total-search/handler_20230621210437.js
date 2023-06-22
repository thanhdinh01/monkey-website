import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const fetchTotalPost = () => {
  const q = collection(db, "posts");
  return getDocs(q);
};

export const handleSearchPost = createAsyncThunk(
  "search/fetchTotalPost",
  async (searchQuery, thunkAPI) => {
    try {
      console.log("searchQuery", searchQuery);
      const res = await fetchTotalPost();
      let posts = [];
      res.forEach((item) => {
        console.log(item.data());
        posts.push({
          ...item.data(),
          // created: item.data().created.seconds * 1000,
        });
      });
      return posts;
    } catch (error) {
      console.log(error);
    }
  }
);
