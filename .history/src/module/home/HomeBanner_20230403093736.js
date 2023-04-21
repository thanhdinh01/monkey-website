import React from "react";
import styled from "styled-components";

const HomeBannerStyled = styled.div``;

const HomeBanner = () => {
  return (
    <HomeBannerStyled>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1>Monkey Blogging</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </p>
          </div>
          <div className="banner-image"></div>
        </div>
      </div>
    </HomeBannerStyled>
  );
};

export default HomeBanner;
