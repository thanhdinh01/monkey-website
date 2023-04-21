import React from "react";
import styled from "styled-components";

const PostTitleStyled = styled.p`
  font-weight: 600;
  font-size: 22px;
  color: white;
  line-height: 1.6;
`;

const PostTitle = ({ className = "" }) => {
  return (
    <PostTitleStyled className={className}>
      Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
    </PostTitleStyled>
  );
};

export default PostTitle;
