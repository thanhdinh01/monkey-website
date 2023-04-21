import React from "react";
import styled from "styled-components";

const PostNewestItemStyled = styled.div`
  padding: 30px 20px;
`;

const PostNewestItem = () => {
  return (
    <PostNewestItemStyled>
      <div className="image-newest">
        <img
          src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80"
          alt=""
        />
      </div>
    </PostNewestItemStyled>
  );
};

export default PostNewestItem;
