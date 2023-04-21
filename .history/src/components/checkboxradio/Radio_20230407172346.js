import React from "react";
import styled from "styled-components";

const RadioStyled = styled.label`
  span {
    color: ${(props) => props.theme.black23};
  }
`;

const Radio = ({ value, children, ...props }) => {
  return (
    <RadioStyled>
      <input
        type="radio"
        name="status"
        value={value}
        id=""
        className="hidden"
      />
      <div className="flex items-center gap-x-2">
        <div className="w-7 h-7 bg-red-800 rounded-full"></div>
        <span>{children}</span>
      </div>
    </RadioStyled>
  );
};

export default Radio;
