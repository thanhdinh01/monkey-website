import React from "react";
import styled from "styled-components";
import { Button } from "../../components/button";

const HomeBannerStyled = styled.div`
  min-height: 500px;
  padding: 40px 0;
  background: linear-gradient(
    to right bottom,
    ${(props) => props.theme.color1Banner},
    ${(props) => props.theme.color2Banner}
  );
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    @media screen and (max-width: 426px) {
      flex-direction: column;
    }
    .banner-content {
      width: 100%;
      max-width: 500px;
      .banner-heading {
        color: white;
        font-weight: 700;
        font-size: 40px;
        margin-bottom: 20px;
      }
      .banner-desc {
        font-size: 16px;
        color: white;
        line-height: 1.5;
        margin-bottom: 50px;
      }
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
            <Button type="button" kind="secondary" to="/sign-up">
              Get Started
            </Button>
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
