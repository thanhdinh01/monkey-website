import React from "react";
import styled from "styled-components";
import PostFeatureItem from "../post/PostFeatureItem";

const HomeFeatureStyled = styled.div`
  padding: 40px 0;
  .feature-heading {
    color: ${(props) => props.theme.purple3A};
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 30px;
    display: inline-block;
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