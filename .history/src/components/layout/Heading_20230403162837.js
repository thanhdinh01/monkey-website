import React from "react";
import styled from "styled-components";

const HeadingPostStyled = styled.h2`
  color: ${(props) => props.theme.purple3A};
  font-size: 28px;
  font-weight: 600;
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
`;

const Heading = ({ children, className = "" }) => {
  return <HeadingPostStyled className={className}>children</HeadingPostStyled>;
};

export default Heading;
