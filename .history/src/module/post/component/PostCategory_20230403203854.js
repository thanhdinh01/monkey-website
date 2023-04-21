import React from "react";
import styled from "styled-components";

const PostCategoryStyled = styled.span`
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 10px;
  color: ${(props) => props.theme.grey6B};
  background-color: ${(props) => props.bgColor || props.theme.purpleF3};
`;

const PostCategory = ({ children, className = "", bgColor = "" }) => {
  return (
    <PostCategoryStyled className={className} bgColor={bgColor}>
      {children}
    </PostCategoryStyled>
  );
};

export default PostCategory;
