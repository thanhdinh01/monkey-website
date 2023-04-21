import React, { useState } from "react";
import styled from "styled-components";

const DropdownStyled = styled.div``;

const Dropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <DropdownStyled className="relative w-full">
      <div className="selected-option bg-[#E7ECF3] rounded-lg flex items-center justify-between p-5">
        <span>Please select an option</span>
        <span className="icon">
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
        </span>
      </div>
      <div className="options-dropdown absolute w-full left-0 top-full">
        <p>Knowledge</p>
        <p>Blockchain</p>
        <p>Setup</p>
        <p>Nature</p>
        <p>Developer</p>
      </div>
    </DropdownStyled>
  );
};

export default Dropdown;
