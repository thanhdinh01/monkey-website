import React from "react";
import styled from "styled-components";
import PostFeatureItem from "../post/PostFeatureItem";

const HomeFeatureStyled = styled.div`
  .feature-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }
`;

const HomeFeature = () => {
  return (
    <HomeFeatureStyled>
      <div className="container">
        <div className="home-feature">
          <div className="feature-heading">Feature</div>
          <div className="feature-list">
            <PostFeatureItem></PostFeatureItem>
            <PostFeatureItem></PostFeatureItem>
            <PostFeatureItem></PostFeatureItem>
            <PostFeatureItem></PostFeatureItem>
          </div>
        </div>
      </div>
    </HomeFeatureStyled>
  );
};

export default HomeFeature;
