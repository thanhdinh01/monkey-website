import React from "react";
import styled from "styled-components";
import { Button } from "../../components/button";

const HomeBannerStyled = styled.div`
  .banner {
    background: linear-gradient(
      to right bottom,
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    );
  }
`;

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
            <Button>Get Started</Button>
          </div>
          <div className="banner-image">
            <img
              src={require("../../images/image-banner.png")}
              alt="logo banner"
            />
          </div>
        </div>
      </div>
    </HomeBannerStyled>
  );
};

export default HomeBanner;
