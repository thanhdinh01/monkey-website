import React from "react";
import styled from "styled-components";

const RadioStyled = styled.label`
  span {
    color: ${(props) => props.theme.black23};
  }
`;

const Radio = ({ value, children, ...props }) => {
  return (
    <RadioStyled className="flex items-center gap-x-2">
      <input
        type="radio"
        name="status"
        value={value}
        id=""
        className="hidden"
      />
      <span>{children}</span>
    </RadioStyled>
  );
};

export default Radio;
