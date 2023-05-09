import React from "react";
import Heading from "../../components/layout/Heading";
import PostRelatedItem from "./PostRelatedItem";

const postRelated = () => {
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

export default postRelated;
