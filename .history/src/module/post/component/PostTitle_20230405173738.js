import React from "react";
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
    props.className === "grey-title" &&
    css`
      color: ${(props) => props.theme.black23};
      margin: 10px 0;
    `};
`;

const PostTitle = ({ className = "", children, color, size, ...props }) => {
  return (
    <PostTitleStyled className={className} color={color} size={size}>
      {children}
    </PostTitleStyled>
  );
};

export default PostTitle;
