import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const fetchTotalPost = () => {
  const q = collection(db, "posts");
  return getDocs(q);
  // onSnapshot(q, (docs) => {
  //   let results = [];
  //   docs.forEach((doc) => {
  //     results.push({
  //       idPost: doc.id,
  //       ...doc.data(),
  //     });
  //   });
  //   return results;
  // });
};

export const handleSearchPost = createAsyncThunk(
  "search/fetchTotalPost",
  async (searchQuery, thunkAPI) => {
    console.log("searchQuery", searchQuery);
    const posts = await fetchTotalPost();
    console.log("posts", posts);
    return posts;
  }
);
