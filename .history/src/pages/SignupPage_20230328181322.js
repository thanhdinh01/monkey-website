import React from "react";
import styled from "styled-components";
import Label from "../components/label/Label";

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
  .form {
    max-width: 800px;
    margin: 0 auto;
  }
  .field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px;

    .input {
      width: 100%;
      padding: 25px 27px;
      background-color: ${(props) => props.theme.greyColor};
      outline: none;
      border: 1px solid transparent;
      border-radius: 8px;
      transition: all 0.25s linear;
      &::placeholder {
        color: ${(props) => props.theme.greyLight};
      }
      &:focus {
        background-color: white;
        border-color: ${(props) => props.theme.primary};
      }
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
            <Label htmlFor="fullname">Fullname</Label>
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
