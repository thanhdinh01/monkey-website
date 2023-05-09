import React from "react";
import styled from "styled-components";
import PostCategory from "./component/PostCategory";
import PostImage from "./component/PostImage";
import PostMeta from "./component/PostMeta";
import PostTitle from "./component/PostTitle";
import { useNavigate } from "react-router-dom";

const PostRelatedItemStyled = styled.div``;

const PostRelatedItem = ({ data }) => {
  const navigate = useNavigate();
  console.log(data);
  return (
    <PostRelatedItemStyled>
      <PostImage
        className="mb-5 cursor-pointer"
        width="280px"
        height="200px"
        src={data?.imageURL}
        onClick={() => navigate(`${data?.slug}`)}
      ></PostImage>
      <PostCategory>{data?.category?.name}</PostCategory>
      <PostTitle size="18px" className="grey-title mt-4 mb-4">
        {data?.title}
      </PostTitle>
      <PostMeta
        className="grey-meta"
        datePost={new Date(data?.createAt?.seconds * 1000).toLocaleDateString(
          "vi-VI"
        )}
        authorPost={data?.user?.username}
        dotGrey={true}
      ></PostMeta>
    </PostRelatedItemStyled>
  );
};

export default PostRelatedItem;
