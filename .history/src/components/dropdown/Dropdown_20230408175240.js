import React, { useState } from "react";

const Dropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div>
      <div className="selected-option">
        <span>Please select an option</span>
        <span className="icon"></span>
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
