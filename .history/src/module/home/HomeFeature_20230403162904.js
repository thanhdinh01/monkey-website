import React from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import PostFeatureItem from "../post/PostFeatureItem";

const HomeFeatureStyled = styled.div`
  padding: 40px 0;
`;

const HomeFeature = () => {
  return (
    <HomeFeatureStyled>
      <div className="container">
        <Heading>Feature</Heading>
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
