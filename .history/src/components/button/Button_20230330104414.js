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
  font-size: 24px;
  font-weight: 600;
  color: white;
  background: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  cursor: pointer;
`;

const Button = ({ type = "button", ...props }) => {
  return <ButtonStyled type={type}>Submit</ButtonStyled>;
};

export default Button;
