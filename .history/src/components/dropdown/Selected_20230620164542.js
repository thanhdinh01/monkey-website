import React from "react";
import { useDropdownContext } from "./dropdown-context";
import styled from "styled-components";

const DropdownSelectedStyled = styled.div`
  color: ${(props) => props.theme.textInput};
  background-color: ${(props) => props.theme.bgInput};
`;

const Selected = ({ placeholder }) => {
  const { show, toggleDropdown } = useDropdownContext();
  return (
    <DropdownSelectedStyled
      className="selected-option bg-[#E7ECF3] rounded flex items-center justify-between p-5 cursor-pointer"
      onClick={toggleDropdown}
    >
      <span>{placeholder}</span>
      <span className="icon">
        {show ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </span>
    </DropdownSelectedStyled>
  );
};

export default Selected;
