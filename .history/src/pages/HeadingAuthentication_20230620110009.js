import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthenticationStyled = styled.div`
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
    .have-account {
      margin-bottom: 40px;
      font-size: 14px;
      a {
        color: ${(props) => props.theme.primary};
        margin-left: 10px;
      }
    }
  }
`;

const HeadingAuthentication = ({ children, ...props }) => {
  return (
    <AuthenticationStyled>
      <div className="container">
        <NavLink to={"/"} className="inline-block">
          <img
            src={require("../images/logo-signup.png")}
            alt="logo sign up"
            className="logo-singup"
          />
        </NavLink>
        <h1 className="heading">Monkey Blogging</h1>
        {children}
      </div>
    </AuthenticationStyled>
  );
};

export default HeadingAuthentication;
