import React from "react";
import styled from "styled-components";

const RadioStyled = styled.div`
  span {
    color: ${(props) => props.theme.black23};
  }
`;

const Radio = ({ value, children, ...props }) => {
  return (
    <RadioStyled className="flex items-center gap-x-2">
      <input type="radio" name="status" value={value} id="" />
      <span>{children}</span>
    </RadioStyled>
  );
};

export default Radio;
