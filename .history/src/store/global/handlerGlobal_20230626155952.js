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
      console.log("searchQuery", searchQuery);
      searchQuery.toLowerCase();
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
      const filterPost = posts.filter((item) => {
        const unaccentedQuery = searchQuery
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const unaccentedChar = item.title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const accentedChar = item.title.toLowerCase();
        return (
          accentedChar.includes(searchQuery) ||
          unaccentedChar.includes(searchQuery) ||
          unaccentedChar.includes(unaccentedQuery)
        );
      });
      console.log("filterPost", filterPost);
      localStorage.setItem("filterPost", JSON.stringify(filterPost));
      localStorage.setItem("totalQuery", JSON.stringify(searchQuery));
      return filterPost;
    } catch (error) {
      console.log(error);
    }
  }
);
