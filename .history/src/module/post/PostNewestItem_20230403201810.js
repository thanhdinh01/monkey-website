import React from "react";
import styled from "styled-components";
import PostCategory from "./component/PostCategory";
import PostMeta from "./component/PostMeta";
import PostTitle from "./component/PostTitle";

const PostNewestItemStyled = styled.div`
  padding: 30px 20px;
  display: flex;
  .image-newest {
    flex-basis: 130px;
    border-radius: 16px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const PostNewestItem = () => {
  return (
    <PostNewestItemStyled>
      <div className="image-newest">
        <img
          src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80"
          alt=""
        />
      </div>
      <div className="newestitem-content">
        <PostCategory>Kiến thức</PostCategory>
        <PostTitle className="newestmain-title">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </PostTitle>
        <PostMeta
          className="newestmain-meta"
          datePost="Mar 23"
          authorPost="Andiez Le"
          dotGrey={true}
        ></PostMeta>
      </div>
    </PostNewestItemStyled>
  );
};

export default PostNewestItem;
