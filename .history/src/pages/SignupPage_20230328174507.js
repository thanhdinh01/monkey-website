import React from "react";
import styled from "styled-components";

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
        <img
          src={require("../images/logo-signup.png")}
          alt="logo sign up"
          className="logo-singup"
        />
        <h1 className="heading">Monkey Blogging</h1>
        <form action="" className="input">
          <label htmlFor="fullname" className="label">
            Fullname
          </label>
          <input
            className="input"
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Please enter your fullname"
          />
        </form>
      </div>
    </SignupPageStyled>
  );
};

export default SignupPage;
