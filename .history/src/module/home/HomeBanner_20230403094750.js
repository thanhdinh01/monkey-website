import React from "react";
import styled from "styled-components";
import { Button } from "../../components/button";

const HomeBannerStyled = styled.div`
  height: 70vh;
  background: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .banner-content {
      width: 100%;
      max-width: 600px;
    }
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
