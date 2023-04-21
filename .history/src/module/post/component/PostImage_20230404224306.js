import React from "react";
import styled from "styled-components";

const PostImageStyled = styled.div`
  flex-shrink: 0;
  width: 180px;
  height: 130px;
  border-radius: 16px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PostImage = ({
  width = "10px",
  height = "10px",
  src = "https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=170667a&w=0&k=20&c=gsR5TEhp1tfg-qj1DAYdghj9NfM0ldfNEMJUfAzHGtU=",
}) => {
  return (
    <PostImageStyled>
      <img
        src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80"
        alt=""
      />
    </PostImageStyled>
  );
};

export default PostImage;
