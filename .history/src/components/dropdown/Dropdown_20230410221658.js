import React, { useState } from "react";
import styled from "styled-components";
import { DropdownProvider, useDropdownContext } from "./dropdown-context";

const DropdownStyled = styled.div``;

const Dropdown = ({ children }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const thanh = useDropdownContext();
  console.log("thanh", thanh);

  return (
    <DropdownProvider>
      <DropdownStyled className="relative w-full">
        <div
          className="selected-option bg-[#E7ECF3] rounded flex items-center justify-between p-5 cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span>Please select an option</span>
          <span className="icon">
            {showDropdown ? (
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
        </div>
        {showDropdown && (
          <div className="options-dropdown absolute w-full left-0 top-full bg-white shadow-md z-10">
            {children}
          </div>
        )}
      </DropdownStyled>
    </DropdownProvider>
  );
};

export default Dropdown;
