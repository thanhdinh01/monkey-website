import React from "react";
import styled from "styled-components";
import PostCategory from "./component/PostCategory";
import PostImage from "./component/PostImage";
import PostMeta from "./component/PostMeta";
import PostTitle from "./component/PostTitle";
import slugify from "slugify";

const PostNewestItemStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 28px 0;
  border-bottom: 1px solid ${(props) => props.theme.borderNewest};
  @media screen and (max-width: 426px) {
    flex-direction: column;
    .imageNewestItem {
      width: 100%;
      height: 180px;
    }
    .newestitem-content {
      padding: 0;
      margin-top: 20px;
    }
  }
  &:first-child {
    /* padding-top: 0; */
  }
  &:last-child {
    /* padding-bottom: 0; */
    border-bottom: none;
  }

  .newestitem-content {
    padding: 0 20px;
    @media screen and (max-width: 426px) {
      padding: 0;
      margin-top: 20px;
    }
  }
`;

const PostNewestItem = ({ data }) => {
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
    <PostNewestItemStyled>
      <PostImage
        className="imageNewestItem"
        width="180px"
        height="130px"
        src={data?.imageURL}
      ></PostImage>
      <div className="newestitem-content">
        <PostCategory to={`category/${data?.category?.slug}`} bgColor="white">
          {data?.category?.name || "Unknown"}
        </PostCategory>
        <PostTitle size="18px" className="grey-title" to={`post/${data?.slug}`}>
          {data?.title}
        </PostTitle>
        <PostMeta
          className="grey-meta"
          datePost={datePublished}
          authorPost={data?.user?.username}
          dotGrey={true}
          to={`author/${slugify(data?.user?.username || "", { lower: true })}`}
        ></PostMeta>
      </div>
    </PostNewestItemStyled>
  );
};

export default PostNewestItem;
