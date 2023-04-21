import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const RadioStyled = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
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

const Radio = ({ name, value, control, children }) => {
  console.log(name, value);
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  return (
    <RadioStyled>
      <input
        type="radio"
        {...field}
        name={name}
        value={value}
        className="hidden"
      />
      <div className="w-[20px] h-[20px] flex items-center justify-center">
        <div className="w-2/4 h-2/4 bg-gray-200 rounded-full radio-interface"></div>
      </div>
      <span>{children}</span>
    </RadioStyled>
  );
};

export default Radio;
