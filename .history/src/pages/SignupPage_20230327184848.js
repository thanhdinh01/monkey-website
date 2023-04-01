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
          src="https://cdn.luatminhkhue.vn/lmk/article/Roll-Safe-meme.jpg"
          alt="logo sign up"
          className="logo-singup"
        />
        <h1 className="heading">Monkey Blogging</h1>
      </div>
    </SignupPageStyled>
  );
};

export default SignupPage;
