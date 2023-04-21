import React from "react";
import styled from "styled-components";

const PostImageStyled = styled.div`
  flex-shrink: 0;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 16px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PostImage = ({
  width = "100px",
  height = "100px",
  src = "https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=170667a&w=0&k=20&c=gsR5TEhp1tfg-qj1DAYdghj9NfM0ldfNEMJUfAzHGtU=",
}) => {
  return (
    <PostImageStyled width={width} height={height}>
      <img src={src} alt="" />
    </PostImageStyled>
  );
};

export default PostImage;
