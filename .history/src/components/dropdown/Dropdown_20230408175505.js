import React, { useState } from "react";

const Dropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <div className="selected-option">
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
      <div className="options-dropdown">
        <span>Knowledge</span>
        <span>Blockchain</span>
        <span>Setup</span>
        <span>Nature</span>
        <span>Developer</span>
      </div>
    </div>
  );
};

export default Dropdown;
