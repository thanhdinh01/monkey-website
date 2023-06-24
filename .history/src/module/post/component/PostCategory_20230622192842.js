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
  background-color: ${(props) => props.theme.bgColor || props.theme.purpleF3};

  @media screen and (max-width: 1024px) {
    max-width: 110px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const PostCategory = ({ children, className = "", bgColor = "", to = "" }) => {
  return (
    <PostCategoryStyled className={className} bgColor={bgColor}>
      <Link to={`/${to}`}>{children}</Link>
    </PostCategoryStyled>
  );
};

export default PostCategory;
