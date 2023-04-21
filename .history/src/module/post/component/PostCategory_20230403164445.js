import React from "react";
import styled from "styled-components";

const PostCategoryStyled = styled.span`
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 10px;
  color: ${(props) => props.theme.grey6B};
  background-color: ${(props) => props.theme.greyF3};
`;

const PostCategory = ({ children, className = "" }) => {
  return (
    <PostCategoryStyled className={className}>{children}</PostCategoryStyled>
  );
};

export default PostCategory;
