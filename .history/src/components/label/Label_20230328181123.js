import React from "react";

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <label htmlFor="fullname" className="label">
      Fullname
    </label>
  );
};

export default Label;
