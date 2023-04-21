import React from "react";
import styled, { css } from "styled-components";
import { IconEllipse } from "../../../components/icon";

const PostMetaStyled = styled.p`
  color: ${(props) => props.theme.greyF8};
  font-size: ${(props) => props.size || "14px"};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
  ${(props) =>
    props.className === "grey-meta" &&
    css`
      color: ${(props) => props.theme.grey6B};
      justify-content: flex-start;
    `};
`;

const PostMeta = ({
  datePost = "",
  authorPost = "unknown",
  className = "",
  size = "",
  dotGrey = false,
}) => {
  return (
    <PostMetaStyled className={className} size={size}>
      {datePost} <IconEllipse dotGrey={dotGrey}></IconEllipse> {authorPost}
    </PostMetaStyled>
  );
};

export default PostMeta;
