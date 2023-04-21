import React from "react";
import styled, { css } from "styled-components";
import { IconEllipse } from "../../../components/icon";

const PostMetaStyled = styled.p`
  color: ${(props) => props.theme.greyF8};
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
  ${(props) =>
    props.className === "newestmain-meta" &&
    css`
      color: ${(props) => props.theme.grey6B}; ;
    `};
`;

const PostMeta = ({ datePost = "", authorPost = "", className = "" }) => {
  return (
    <PostMetaStyled className={className}>
      {datePost} <IconEllipse></IconEllipse> {authorPost}
    </PostMetaStyled>
  );
};

export default PostMeta;
