import React from "react";
import styled from "styled-components";

const NotFoundStyled = styled.div`
  height: 100vh;
  padding: 50px;
  margin: 0 auto;
`;

const NotFoundPage = () => {
  return <NotFoundStyled>Oops! Not Found This Page :(</NotFoundStyled>;
};

export default NotFoundPage;
