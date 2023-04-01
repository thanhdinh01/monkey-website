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
    margin-bottom: 60px;
    font-size: 40px;
  }
  .form {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
  .lable {
    color: ${(props) => props.theme.blackColor};
    font-weight: 600;
  }
  .input {
    padding: 25px 27px;
    outline: none;
    border: 1px solid #999999;
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
