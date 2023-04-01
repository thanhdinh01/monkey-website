import React from "react";
import styled from "styled-components";
import logo from "../images/logo-signup.png";

const SignupPageStyled = styled.div`
  .logo {
    /* width: 100%;
    height: 100%; */
    width: 121px;
    height: 156px;
  }
  .heading {
    color: ${(props) => props.theme.primary};
  }
`;

const SignupPage = () => {
  return (
    <SignupPageStyled>
      <div className="container">
        <img src={logo} alt="logo sign up" className="logo-singup" />
        <h1 className="heading">Monkey Blogging</h1>
      </div>
    </SignupPageStyled>
  );
};

export default SignupPage;
