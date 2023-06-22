import React from "react";
import Header from "./Header";
import styled from "styled-components";

const LayoutPageStyled = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.body};
`;

const Layout = ({ children }) => {
  return (
    <LayoutPageStyled>
      <Header></Header>
      {children}
    </LayoutPageStyled>
  );
};

export default Layout;
