import React from "react";
import styled from "styled-components";
import { IconEyeOpen } from "../icon";

const InputStyled = styled.div`
  position: relative;
  .input {
    width: 100%;
    padding: 25px 27px;
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

const Input = () => {
  return (
    <InputStyled>
      <input
        className="input"
        type="text"
        name="fullname"
        id="fullname"
        placeholder="Please enter your fullname"
      />
      <IconEyeOpen className="input-icon"></IconEyeOpen>
    </InputStyled>
  );
};

export default Input;