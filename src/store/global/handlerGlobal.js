import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const fetchTotalPost = () => {
  const q = query(collection(db, "posts"), where("status", "==", 1));
  return getDocs(q);
};

export const handleFetchPost = createAsyncThunk(
  "global/fetchTotalPost",
  async (searchQuery, thunkAPI) => {
    try {
      const res = await fetchTotalPost();
      let posts = [];
      res.forEach((item) => {
        posts.push({
          ...item.data(),
          postId: item.id,
          createAt: { seconds: item.data().createAt.seconds },
          category: {
            ...item.data().category,
            createAt: { seconds: item.data().category.createAt.seconds },
          },
          user: {
            ...item.data().user,
            createAt: { seconds: item.data().user.createAt.seconds },
          },
        });
      });
      const sortPublished = posts.sort(
        (a, b) => -a?.createAt?.seconds + b.createAt?.seconds
      );
      return sortPublished;
    } catch (error) {
      console.log(error);
    }
  }
);
