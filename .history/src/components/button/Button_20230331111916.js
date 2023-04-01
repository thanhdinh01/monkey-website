import React from "react";
import styled from "styled-components";
import { Loading } from "../loading";
import PropTypes from "prop-types";

const ButtonStyled = styled.button`
  height: 66px;
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
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Button = ({ type = "button", children, isLoading, ...props }) => {
  const childButton = isLoading ? <Loading></Loading> : children;
  // console.log("loading:", isLoading);
  return (
    <ButtonStyled type={type} {...props}>
      {childButton}
    </ButtonStyled>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};

export default Button;
