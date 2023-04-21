import React from "react";
import styled from "styled-components";

const RadioStyled = styled.label`
  /* width: 20px;
  height: 20px;
  display: flex;
  align-items: center; */
  span {
    color: ${(props) => props.theme.black23};
  }
  .radio-interface {
    box-shadow: 0 0 0 5px rgb(229 231 235 / var(--tw-bg-opacity));
  }

  input:checked + div .radio-interface {
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
      <div className="w-[20px] h-[20px] flex items-cente justify-center gap-x-2 cursor-pointer">
        <div className="w-2/4 h-2/4 bg-gray-200 rounded-full radio-interface"></div>
        <span>{children}</span>
      </div>
    </RadioStyled>
  );
};

export default Radio;
