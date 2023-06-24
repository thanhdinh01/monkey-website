import React from "react";
import styled, { css } from "styled-components";
import { IconEllipse } from "../../../components/icon";
import { Link } from "react-router-dom";

const PostMetaStyled = styled.p`
  color: ${(props) => props.theme.greyF8};
  font-size: ${(props) => props.size || "14px"};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
  ${(props) =>
    props.className.includes("grey-meta") &&
    css`
      color: ${(props) => props.theme.grey6B};
      justify-content: flex-start;
    `};
  max-width: 110px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostMeta = ({
  datePost = "Mar 23",
  authorPost = "unknown",
  className = "",
  size = "",
  dotGrey = false,
  to = "",
}) => {
  return (
    <PostMetaStyled className={className} size={size}>
      {datePost} <IconEllipse dotGrey={dotGrey}></IconEllipse>
      <Link to={`/${to}`}>{authorPost}</Link>
    </PostMetaStyled>
  );
};

export default PostMeta;
