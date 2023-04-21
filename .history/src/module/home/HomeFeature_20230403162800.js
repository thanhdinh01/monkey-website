import React from "react";
import styled from "styled-components";
import PostFeatureItem from "../post/PostFeatureItem";

const HomeFeatureStyled = styled.div`
  padding: 40px 0;
`;

const HomeFeature = () => {
  return (
    <HomeFeatureStyled>
      <div className="container">
        <h2 className="feature-heading">Feature</h2>
        <div className="grid-layout">
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
        </div>
      </div>
    </HomeFeatureStyled>
  );
};

export default HomeFeature;
