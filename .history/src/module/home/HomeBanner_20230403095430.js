import React from "react";
import styled from "styled-components";
import { Button } from "../../components/button";

const HomeBannerStyled = styled.div`
  min-height: 500px;
  padding: 40px 0;
  background: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
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
            <h1 className="banner-heading">Monkey Blogging</h1>
            <p className="banner-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </p>
            <Button type="button">Get Started</Button>
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
