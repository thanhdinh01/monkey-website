import React from "react";
import styled from "styled-components";

const RadioStyled = styled.label`
  span {
    color: ${(props) => props.theme.black23};
  }
  .radio-interface {
    /* box-shadow: 0 0 0 5px; */
  }

  input:checked + div .radio-interface {
    width: 10px;
    height: 10px;
    background-color: ${(props) => props.theme.primary};
    box-shadow: 0 0 0 2.5px white, 0 0 0 5px ${(props) => props.theme.primary};
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
      <div className="flex items-center gap-x-2 cursor-pointer">
        <div className="w-[20px] h-[20px] bg-gray-200  rounded-full radio-interface"></div>
        <span>{children}</span>
      </div>
    </RadioStyled>
  );
};

export default Radio;
