import React from "react";
import styled from "styled-components";

const SignupPageStyled = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo-singup {
    margin: 0 auto 20px;
  }
  .heading {
    color: ${(props) => props.theme.primary};
    text-align: center;
    margin-bottom: 60px;
    font-size: 40px;
  }
  .field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px;
    .label {
      color: ${(props) => props.theme.blackColor};
      font-weight: 600;
      cursor: pointer;
    }
    .input {
      width: 100%;
      padding: 25px 27px;
      outline: none;
      border: 1px solid #999999;
      border-radius: 8px;
    }
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
        <form action="" className="form">
          <div className="field">
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
          </div>
        </form>
      </div>
    </SignupPageStyled>
  );
};

export default SignupPage;
