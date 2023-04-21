import React from "react";
import styled from "styled-components";

const RadioStyled = styled.label`
  span {
    color: ${(props) => props.theme.black23};
  }
  .radio-interface {
    /* box-shadow: 0 0 0 5px blue; */
  }
`;

const Radio = ({ value, children, ...props }) => {
  return (
    <RadioStyled>
      <input type="radio" name="status" value={value} id="" className="" />
      <div className="flex items-center gap-x-2">
        <div className="w-[10px] h-[10px] bg-red-800 rounded-full radio-interface"></div>
        <span>{children}</span>
      </div>
    </RadioStyled>
  );
};

export default Radio;
