import React from "react";
import styled from "styled-components";

const HomeFeatureStyled = styled.div`
  .home-feature {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }
`;

const HomeFeature = () => {
  return (
    <HomeFeatureStyled>
      <div className="container">
        <div className="home-feature"></div>
      </div>
    </HomeFeatureStyled>
  );
};

export default HomeFeature;
