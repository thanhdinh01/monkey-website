import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostCategory from "./component/PostCategory";
import PostMeta from "./component/PostMeta";
import PostTitle from "./component/PostTitle";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const FeatureItemStyled = styled.div`
  position: relative;
  border-radius: 16px;
  height: 260px;
  overflow: hidden;

  .post-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      179.77deg,
      #6b6b6b 36.45%,
      rgba(163, 163, 163, 0.622265) 63.98%,
      rgba(255, 255, 255, 0) 99.8%
    );
    mix-blend-mode: multiply;
    opacity: 0.6;
  }

  .feature-content {
    position: absolute;
    inset: 0;
    padding: 20px;
    .post-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
  }
`;

const PostFeatureItem = ({ data }) => {
  console.log("data", data);
  const [categoryName, setCategoryName] = useState("");

  // query and get value of  category/ author
  useEffect(() => {
    async function fetchCategory() {
      const category = await getDoc(doc(db, "categories", data.categoryId));
      setCategoryName(category.data());
    }
    fetchCategory();
  }, []);

  return (
    <FeatureItemStyled>
      <img src={data.imageURL} alt="" className="post-img" />
      <div className="overlay"></div>
      <div className="feature-content">
        <div className="post-top">
          <PostCategory>Kiến thức</PostCategory>
          <PostMeta datePost="Mar 23" authorPost="Andiez Le"></PostMeta>
        </div>
        <PostTitle>{data.title}</PostTitle>
      </div>
    </FeatureItemStyled>
  );
};

export default PostFeatureItem;
