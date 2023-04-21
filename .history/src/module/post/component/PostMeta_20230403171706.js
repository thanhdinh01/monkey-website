import React from "react";
import styled from "styled-components";
import { IconEllipse } from "../../../components/icon";

const PostMetaStyled = styled.p`
  color: ${(props) => props.theme.greyF8};
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 16px;
`;

const PostMeta = ({ dataPost = "", authorPost = "" }) => {
  return (
    <PostMetaStyled className="feature-card-meta">
      {dataPost} <IconEllipse></IconEllipse> {authorPost}
    </PostMetaStyled>
  );
};

export default PostMeta;
