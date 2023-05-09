import React, { useEffect, useState } from "react";
import Heading from "../../components/layout/Heading";
import PostRelatedItem from "./PostRelatedItem";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const PostRelated = ({ categoryId = "" }) => {
    const {slug} =useParams()
  const [postRelatedArr, setPostRRelatedArr] = useState([]);

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
        setPostRRelatedArr(results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRelatedPost();
  }, [categoryId]);
  postRelatedArr.findIndex(item=>item.slug===)
  console.log(postRelatedArr);
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
