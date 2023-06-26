import React from "react";
import styled from "styled-components";
import PostCategory from "./component/PostCategory";
import PostImage from "./component/PostImage";
import PostMeta from "./component/PostMeta";
import PostTitle from "./component/PostTitle";
import slugify from "slugify";

const NewestMainStyled = styled.div`
  .newest-mainImg {
    @media screen and (max-width: 768px) {
      height: 300px;
    }
  }
`;

const PostNewestMain = ({ data }) => {
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
  return (
    <NewestMainStyled>
      <PostImage
        height="70%"
        className="newest-mainImg mb-7"
        src={data?.imageURL}
      ></PostImage>
      <PostCategory to={`category/${data?.category?.slug}`}>
        {data?.category?.name || "Unknown"}
      </PostCategory>
      <PostTitle className="grey-title">{data?.title}</PostTitle>
      <PostMeta
        className="grey-meta"
        datePost={datePublished}
        authorPost={data?.user?.username}
        dotGrey={true}
        to={`author/${slugify(data?.user?.username || "", { lower: true })}`}
      ></PostMeta>
    </NewestMainStyled>
  );
};

export default PostNewestMain;
