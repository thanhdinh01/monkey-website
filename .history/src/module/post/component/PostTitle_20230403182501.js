import React from "react";
import styled, { css } from "styled-components";

const PostTitleStyled = styled.p`
  ${(props) =>
    props.className === "newestmain-title" &&
    css`
      color: ${(props) => props.theme.black23};
    `};
  font-weight: 600;
  font-size: 22px;
  color: white;
  line-height: 1.6;
`;

const PostTitle = ({ className = "", children, color }) => {
  return (
    <PostTitleStyled className={className} color={color}>
      {children}
    </PostTitleStyled>
  );
};

export default PostTitle;
