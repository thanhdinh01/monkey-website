import React from "react";

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <label htmlFor={htmlFor} className="label">
      {children}
    </label>
  );
};

export default Label;
