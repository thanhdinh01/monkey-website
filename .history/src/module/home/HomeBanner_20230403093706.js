import React from "react";
import styled from "styled-components";

const HomeBannerStyled = styled.div``;

const HomeBanner = () => {
  return (
    <HomeBannerStyled>
      <div className="container">
        <div className="banner">
          <div className="banner-content"></div>
          <div className="banner-image"></div>
        </div>
      </div>
    </HomeBannerStyled>
  );
};

export default HomeBanner;
