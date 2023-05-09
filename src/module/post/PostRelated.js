import React, { useEffect, useState } from "react";
import Heading from "../../components/layout/Heading";
import PostRelatedItem from "./PostRelatedItem";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { useParams } from "react-router-dom";

const PostRelated = ({ categoryId = "" }) => {
  const { slug } = useParams();
  const [postRelatedArr, setPostRRelatedArr] = useState([]);

  // query related post
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
        if (results.length > 0) {
          const indexCurrentPost = results.findIndex(
            (item) => item.slug === slug
          );
          if (results !== -1) {
            results.splice(indexCurrentPost, 1);
          }
        }
        setPostRRelatedArr(results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRelatedPost();
  }, [categoryId, slug]);

  return (
    <div className="post-related">
      <Heading className="primary-heading">Bài viết liên quan</Heading>
      <div className="grid-related">
        {postRelatedArr.length > 0 &&
          postRelatedArr.map((related) => (
            <PostRelatedItem key={related?.id} data={related}></PostRelatedItem>
          ))}
      </div>
    </div>
  );
};

export default PostRelated;
