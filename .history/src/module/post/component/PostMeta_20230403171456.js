import React from "react";
import styled from "styled-components";
import { IconEllipse } from "../../../components/icon";

const PostMetaStyled = styled.p`
  color: ${(props) => props.theme.greyF8};
  font-size: 14px;
  font-weight: 600;
`;

const PostMeta = ({ dataPost = "", authorPost = "" }) => {
  return (
    <PostMetaStyled className="feature-card-meta">
      {dataPost} <IconEllipse></IconEllipse> {authorPost}
    </PostMetaStyled>
  );
};

export default PostMeta;
