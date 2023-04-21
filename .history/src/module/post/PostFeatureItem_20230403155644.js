import React from "react";
import styled from "styled-components";

const FeatureItemStyled = styled.div`
  position: relative;
  border-radius: 16px;
  .post-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    height: 260px;
  }
`;

const PostFeatureItem = () => {
  return (
    <FeatureItemStyled>
      <img
        src="https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2662&q=80"
        alt=""
        className="post-img"
      />
      <div className="overlay"></div>
      <div className="feature-content">
        <div className="post-top">
          <div className="feature-card-category">Kiến thức</div>
          <p className="feature-card-meta">Mar 23 Andiez Le</p>
        </div>
        <div className="feature-title">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </div>
      </div>
    </FeatureItemStyled>
  );
};

export default PostFeatureItem;
