import React from "react";
import styled from "styled-components";
import PostCategory from "./component/PostCategory";
import PostMeta from "./component/PostMeta";
import PostTitle from "./component/PostTitle";
import slugify from "slugify";

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
      rgb(137 131 131) 36.45%,
      rgb(100 97 97 / 94%) 63.98%,
      rgb(102 92 92 / 0%) 99.8%
    );
    mix-blend-mode: multiply;
    opacity: 0.9;
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
  // console.log("data", data);
  const date = data?.createAt
    ? new Date(data?.createAt.seconds * 1000)
    : new Date();

  const formatDate = (date) => {
    return [
      date.getDate().toString().padStart(2, "0"),
      (date.getMonth() + 1).toString().padStart(2, "0"),
      date.getYear().toString().padStart(2, "0"),
    ].join("/");
  };

  const datePublished = formatDate(date);
  // const formatDate = new Date(date).toLocaleDateString("vi-VI");
  // console.log("formatDate", formatDate);
  const { category, user } = data;
  if (!data) return null;

  return (
    <FeatureItemStyled>
      <img src={data.imageURL} alt="" className="post-img" />
      <div className="overlay"></div>
      <div className="feature-content">
        <div className="post-top">
          <PostCategory to={`category/${category?.slug}`}>
            {category?.name || "Unknown"}
          </PostCategory>
          <PostMeta
            datePost={datePublished}
            authorPost={user?.username}
            to={slugify(`author/${user?.username}` || "", { lower: true })}
          ></PostMeta>
        </div>
        <PostTitle to={`post/${data?.slug}`}>{data.title}</PostTitle>
      </div>
    </FeatureItemStyled>
  );
};

export default PostFeatureItem;
