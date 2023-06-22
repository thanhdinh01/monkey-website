import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const fetchTotalPost = () => {
  const q = collection(db, "posts");
  onSnapshot(q, (docs) => {
    let results = [];
    docs.forEach((doc) => {
      results.push({
        idPost: doc.id,
        ...doc.data(),
      });
    });
    console.log("redux:", results);
    return results;
  });
};

export const handleSearchPost = createAsyncThunk(
  "global/fetchTotalPost",
  async (searchQuery, thunkAPI) => {
    console.log(searchQuery);
    const posts = fetchTotalPost();
    return posts;
  }
);
