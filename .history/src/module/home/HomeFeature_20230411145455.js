import React, { useEffect } from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import PostFeatureItem from "../post/PostFeatureItem";

const HomeFeatureStyled = styled.div`
  margin-bottom: 60px;
`;

const HomeFeature = () => {
  useEffect(() => {}, []);
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
