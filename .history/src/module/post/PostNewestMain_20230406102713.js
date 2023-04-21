import React from "react";
import styled from "styled-components";
import PostCategory from "./component/PostCategory";
import PostImage from "./component/PostImage";
import PostMeta from "./component/PostMeta";
import PostTitle from "./component/PostTitle";

const NewestMainStyled = styled.div``;

const PostNewestMain = () => {
  return (
    <NewestMainStyled>
      <PostImage
        className="newest-mainImg mb-7"
        src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80"
      ></PostImage>
      <PostCategory>Kiến thức</PostCategory>
      <PostTitle className="grey-title">
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </PostTitle>
      <PostMeta
        className="grey-meta"
        datePost="Mar 23"
        authorPost="Andiez Le"
        dotGrey={true}
      ></PostMeta>
    </NewestMainStyled>
  );
};

export default PostNewestMain;
