import React from "react";
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
      gap: 20px;
      a {
        color: ${(props) => props.theme.primary};
      }
    }
  }
`;

const HeadingAuthentication = ({ children, ...props }) => {
  return (
    <AuthenticationStyled>
      <div className="container">
        <img
          src={require("../images/logo-signup.png")}
          alt="logo sign up"
          className="logo-singup"
        />
        <h1 className="heading">Monkey Blogging</h1>
        {children}
      </div>
    </AuthenticationStyled>
  );
};

export default HeadingAuthentication;