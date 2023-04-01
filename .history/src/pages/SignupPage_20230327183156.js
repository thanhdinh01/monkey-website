import React from "react";
import styled from "styled-components";

const SignupPageStyled = styled.div``;

const SignupPage = () => {
  return (
    <SignupPageStyled>
      <div className="container">
        <img
          src="../images/logo-signup.jpg"
          alt="logo sign up"
          className="logo-singup"
        />
        <h1 className="heading">Monkey Blogging</h1>
      </div>
    </SignupPageStyled>
  );
};

export default SignupPage;
