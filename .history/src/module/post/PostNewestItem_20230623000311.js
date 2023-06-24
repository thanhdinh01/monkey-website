import React from "react";
import styled from "styled-components";
import PostCategory from "./component/PostCategory";
import PostImage from "./component/PostImage";
import PostMeta from "./component/PostMeta";
import PostTitle from "./component/PostTitle";

const PostNewestItemStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 28px 0;
  border-bottom: 1px solid ${(props) => props.theme.borderNewest};
  @media screen and (max-width: 414px) {
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
    @media screen and (max-width: 414px) {
      padding: 0;
      margin-top: 20px;
    }
  }
`;

const PostNewestItem = () => {
  return (
    <PostNewestItemStyled>
      <PostImage
        className="imageNewestItem"
        width="180px"
        height="130px"
        src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80"
      ></PostImage>
      <div className="newestitem-content">
        <PostCategory bgColor="white">Kiến thức</PostCategory>
        <PostTitle size="18px" className="grey-title">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </PostTitle>
        <PostMeta
          className="grey-meta"
          datePost="Mar 23"
          authorPost="Andiez Le"
          dotGrey={true}
        ></PostMeta>
      </div>
    </PostNewestItemStyled>
  );
};

export default PostNewestItem;
