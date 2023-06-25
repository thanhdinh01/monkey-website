import React from "react";
import styled from "styled-components";
import { Button } from "../components/button";

const NotFoundStyled = styled.div`
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.textInput};
  height: 100vh;
  padding: 50px;
  text-align: center;
  font-size: 40px;
  font-weight: 600;
`;

const NotFoundPage = () => {
  return (
    <NotFoundStyled>
      <p>Sorry, we couldn't find that page.</p>
      <Button type="button" to="/" kind="primary">
        Back Home
      </Button>
    </NotFoundStyled>
  );
};

export default NotFoundPage;
