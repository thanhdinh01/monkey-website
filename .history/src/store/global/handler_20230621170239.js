import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, onSnapshot, query } from "firebase/firestore";
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
    console.log(results);
    setPostList(results);
  });
};

const handleSearchPost = createAsyncThunk(
  "global/fetchTotalPost",
  async () => {}
);
