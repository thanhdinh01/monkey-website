import React from "react";

const IconEllipse = ({ dotGrey }) => {
  return (
    <span>
      <svg
        width="7"
        height="6"
        viewBox="0 0 7 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="3.9668" cy="3" r="3" fill={dotGrey ? "red" : "#F8F9FA"} />
      </svg>
    </span>
  );
};

export default IconEllipse;
