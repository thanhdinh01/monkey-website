import React from "react";
import styled from "styled-components";

const PostMetaStyled = styled.p`
  color: ${(props) => props.theme.greyF8};
  font-size: 14px;
  font-weight: 600;
`;

const PostMeta = ({ dataPost = "", authorPost = "" }) => {
  return (
    <PostMetaStyled className="feature-card-meta">
      {dataPost} {authorPost}
    </PostMetaStyled>
  );
};

export default PostMeta;
