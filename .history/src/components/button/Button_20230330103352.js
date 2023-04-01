import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  height: 80px;
  width: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const Button = () => {
  return <ButtonStyled type="submit">Submit</ButtonStyled>;
};

export default Button;
