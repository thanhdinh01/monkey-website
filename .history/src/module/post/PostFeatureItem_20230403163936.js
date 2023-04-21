import React from "react";
import styled from "styled-components";

const FeatureItemStyled = styled.div`
  position: relative;
  border-radius: 16px;
  height: 260px;
  overflow: hidden;

  .post-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      179.77deg,
      #6b6b6b 36.45%,
      rgba(163, 163, 163, 0.622265) 63.98%,
      rgba(255, 255, 255, 0) 99.8%
    );
    mix-blend-mode: multiply;
    opacity: 0.6;
  }

  .feature-content {
    position: absolute;
    inset: 0;
    padding: 20px;
    .post-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      .feature-card-category {
        display: inline-block;
        font-size: 14px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 10px;
        color: ${(props) => props.theme.grey6B};
        background-color: ${(props) => props.theme.greyF3};
      }
      .feature-card-meta {
        color: ${(props) => props.theme.greyF8};
        font-size: 14px;
        font-weight: 600;
      }
    }

    .feature-title {
      font-weight: 600;
      font-size: 22px;
      color: white;
      line-height: 1.6;
    }
  }
`;

const PostFeatureItem = () => {
  return (
    <FeatureItemStyled>
      <div className="image">
        <img
          src="https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2662&q=80"
          alt=""
          className="post-img"
        />
      </div>
      <div className="overlay"></div>
      <div className="feature-content">
        <div className="post-top">
          <span className="feature-card-category">Kiến thức</span>
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
