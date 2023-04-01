import React from "react";
import styled from "styled-components";

const FieldStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 20px;
`;

const Field = ({ children }) => {
  return <FieldStyled>{children}</FieldStyled>;
};

export default Field;
