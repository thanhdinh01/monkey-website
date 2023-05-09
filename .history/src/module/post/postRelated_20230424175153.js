import React, { useEffect, useState } from "react";
import Heading from "../../components/layout/Heading";
import PostRelatedItem from "./PostRelatedItem";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const PostRelated = ({ categoryId = "" }) => {
  const [postRelated, setPostRelated] = useState([]);

  useEffect(() => {
    async function fetchRelatedPost() {
      if (!categoryId) return null;
      try {
        const q = query(
          collection(db, "posts"),
          where("category.id", "==", categoryId)
        );
        const results = [];
        const data = await getDocs(q);
        data.forEach((d) => {
          results.push({
            id: d.id,
            ...d.data(),
          });
        });
        setPostRelated(results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRelatedPost();
  }, [categoryId]);
  console.log(postRelated);
  return (
    <div className="post-related">
      <Heading className="primary-heading">Bài viết liên quan</Heading>
      <div className="grid-related">
        {postRelated.length > 0 &&
          postRelated.map((related) => (
            <PostRelatedItem key={related?.id}></PostRelatedItem>
          ))}
      </div>
    </div>
  );
};

export default PostRelated;
