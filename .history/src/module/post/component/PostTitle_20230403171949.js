import React from "react";
import styled from "styled-components";

const PostTitleStyled = styled.p`
  font-weight: 600;
  font-size: 22px;
  color: white;
  line-height: 1.6;
`;

const PostTitle = ({ className = "", children }) => {
  return <PostTitleStyled className={className}>{children}</PostTitleStyled>;
};

export default PostTitle;
