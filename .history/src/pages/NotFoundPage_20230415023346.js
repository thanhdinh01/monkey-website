import React from "react";
import styled from "styled-components";
import { Button } from "../components/button";

const NotFoundStyled = styled.div`
  height: 100vh;
  padding: 50px;
  text-align: center;
  font-size: 40px;
  font-weight: 600;
`;

const NotFoundPage = () => {
  return (
    <NotFoundStyled>
      Oops! Not Found This Page :({" "}
      <Button type="button" to="/">
        Back Home
      </Button>
    </NotFoundStyled>
  );
};

export default NotFoundPage;
