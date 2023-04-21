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
        <div className="w-[10px] h-[10px] bg-red-800 rounded-full interface-radio"></div>
        <span>{children}</span>
      </div>
    </RadioStyled>
  );
};

export default Radio;
