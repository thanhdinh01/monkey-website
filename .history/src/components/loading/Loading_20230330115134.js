import React from "react";
import styled from "styled-components";

const LoadingStyled = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: ${(props) => props.borderSize} solid white;
  border-radius: 50%;
  border-top: ${(props) => props.borderSize} solid transparent;
  border-bottom: ${(props) => props.borderSize} solid transparent;
  animation: spinner 1s linear infinite;

  @keyframes spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = ({ size = "40px", borderSize = "8px", ...props }) => {
  return (
    <LoadingStyled
      size={size}
      borderSize={borderSize}
      {...props}
    ></LoadingStyled>
  );
};

export default Loading;
