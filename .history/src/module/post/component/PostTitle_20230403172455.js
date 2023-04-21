import React from "react";
import styled from "styled-components";

const PostTitleStyled = styled.p`
  font-weight: 600;
  font-size: 22px;
  color: ${(props) => props.color || "white"};
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
