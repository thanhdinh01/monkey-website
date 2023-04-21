import React, { useState } from "react";
import styled from "styled-components";

const DropdownStyled = styled.div``;

const optionDropdown = [
  "Knowledge",
  "Blockchain",
  "Setup",
  "Nature",
  "Developer",
];

const Dropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <DropdownStyled className="relative w-full">
      <div className="selected-option bg-[#E7ECF3] rounded flex items-center justify-between p-5 cursor-pointer">
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
      <div className="options-dropdown absolute w-full left-0 top-full bg-white shadow-md">
        {optionDropdown.map((option) => (
          <p className="px-5 py-4 hover:bg-gray-200 cursor-pointer font-normal">
            {option}
          </p>
        ))}
      </div>
    </DropdownStyled>
  );
};

export default Dropdown;
