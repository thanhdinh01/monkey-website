import React from "react";
import styled, { css } from "styled-components";
import { Loading } from "../loading";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ButtonStyled = styled.button`
  height: ${(props) => props.height || "66px"};
  width: ${(props) => props.width || "auto"};
  padding: 0 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  ${(props) =>
    props.kind === "primary" &&
    css`
      background: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
      color: white;
    `};
  ${(props) =>
    props.kind === "secondary" &&
    css`
      background-color: white;
      color: ${(props) => props.theme.primary};
    `};
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

/**
 *
 * @param {*} onClick handle onClick
 * @param {string} type type 'button'|'submit'
 */

const Button = ({
  type = "button",
  children,
  isLoading,
  kind = "",
  to = "",
  ...props
}) => {
  const childButton = isLoading ? <Loading></Loading> : children;
  // console.log("loading:", isLoading);
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to} className="btn-navigate">
        <ButtonStyled
          type={type}
          {...props}
          kind={kind}
          style={{ margin: "auto 0" }}
        >
          {childButton}
        </ButtonStyled>
      </NavLink>
    );
  }
  return (
    <ButtonStyled type={type} {...props} kind={kind}>
      {childButton}
    </ButtonStyled>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  kind: PropTypes.oneOf(["primary", "secondary"]),
};

export default Button;
