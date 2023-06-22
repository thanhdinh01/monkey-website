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
      searchQuery.toLowerCase();
      const res = await fetchTotalPost();
      let posts = [];
      res.forEach((item) => {
        posts.push({
          ...item.data(),
          createAt: item.data().createAt.seconds * 1000,
          category: {
            ...item.data().category,
            createAt: item.data().category.createAt.seconds * 1000,
          },
          user: {
            ...item.data().user,
            createAt: item.data().user.createAt.seconds * 1000,
          },
        });
      });
      const filterPost = posts.filter((item) => {
        const unaccentedChar = item.title
          .toLowerCase()
          .normalize("NFD")
          .replace("");
        console.log(unaccentedChar);
        const accentedChar = item.title.toLowerCase();
        return (
          accentedChar.includes(searchQuery) ||
          unaccentedChar.includes(searchQuery)
        );
      });
      console.log("filterPost", filterPost);
      return posts;
    } catch (error) {
      console.log(error);
    }
  }
);
