import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const InputStyled = styled.div`
  position: relative;
  width: 100%;
  .input {
    width: 100%;
    padding: ${(props) =>
      props.hasIcon ? "20px 60px 20px 20px " : "20px 25px"};
    background-color: ${(props) => props.theme.greyColor};
    outline: none;
    border: 1px solid transparent;
    border-radius: 8px;
    transition: all 0.25s linear;
    &::placeholder {
      color: ${(props) => props.theme.greyLight};
    }
    &:focus {
      background-color: white;
      border-color: ${(props) => props.theme.primary};
    }
  }
  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const Input = ({ name = "", control, children, ...props }) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "thanh",
  });
  return (
    <InputStyled hasIcon={children ? true : false}>
      <input name={name} id={name} {...props} {...field} />
      {children}
    </InputStyled>
  );
};

export default Input;
