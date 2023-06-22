import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const fetchTotalPost = () => {
  const q = collection(db, "posts");
  let posts = [];
  onSnapshot(q, (docs) => {
    let results = [];
    docs.forEach((doc) => {
      results.push({
        idPost: doc.id,
        ...doc.data(),
      });
    });
    console.log("redux:", results);
    posts = results;
  });
  return posts;
};

export const handleSearchPost = createAsyncThunk(
  "search/fetchTotalPost",
  async (searchQuery, thunkAPI) => {
    console.log("searchQuery", searchQuery);
    const posts = fetchTotalPost();
    console.log("posts", posts);
    return posts;
  }
);
