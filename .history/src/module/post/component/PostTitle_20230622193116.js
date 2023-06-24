import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const PostTitleStyled = styled.p`
  font-weight: 600;
  font-size: ${(props) => props.size || "22px"};
  color: white;
  line-height: 1.6;
  ${(props) =>
    props.color === "primary" &&
    css`
      color: ${(props) => props.theme.primary};
    `};
  ${(props) =>
    props.className.includes("grey-title") &&
    css`
      color: ${(props) => props.theme.textInput};
      margin: 10px 0;
    `};
  @media screen and (max-width: 1024px) {
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const PostTitle = ({
  className = "",
  children,
  color,
  size,
  to = "",
  ...props
}) => {
  return (
    <PostTitleStyled className={className} color={color} size={size} {...props}>
      <Link to={`/${to}`}>{children}</Link>
    </PostTitleStyled>
  );
};

export default PostTitle;
