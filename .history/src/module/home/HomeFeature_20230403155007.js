import React from "react";
import styled from "styled-components";
import PostFeatureItem from "../post/PostFeatureItem";

const HomeFeatureStyled = styled.div`
  .feature-heading {
    color: ${(props) => props.theme.purple3A};
    font-size: 28px;
    font-weight: 600;
    position: relative;
    &::before {
      content: "";
      width: 35px;
      height: 3px;
      border-radius: 1px;
      position: absolute;
      left: 0;
      top: 0;
      background-color: #00d1ed;
    }
  }

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
        <div className="feature-heading">Feature</div>
        <div className="feature-list">
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
        </div>
      </div>
    </HomeFeatureStyled>
  );
};

export default HomeFeature;