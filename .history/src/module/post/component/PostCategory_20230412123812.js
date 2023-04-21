import React from "react";
import { Link } from "react-router-dom";
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

const PostCategory = ({ children, className = "", bgColor = "", to = "" }) => {
  return (
    <PostCategoryStyled className={className} bgColor={bgColor}>
      <Link to={`/${to}`}>{children}</Link>
    </PostCategoryStyled>
  );
};

export default PostCategory;
