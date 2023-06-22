import React from "react";
import styled, { css } from "styled-components";

const HeadingPostStyled = styled.h2`
  color: ${(props) => props.theme.headingSection};
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  display: inline-block;
  position: relative;
  &::before {
    content: "";
    width: 35px;
    height: 3px;
    border-radius: 1px;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #00d1ed;
  }

  ${(props) =>
    props.className.includes("primary-heading") &&
    css`
      color: ${(props) => props.theme.primary};
    `};
`;

const Heading = ({ children, className = "" }) => {
  return (
    <HeadingPostStyled className={className}>{children}</HeadingPostStyled>
  );
};

export default Heading;
