import React from "react";

const Radio = ({ value, children, ...props }) => {
  return (
    <div className="flex items-center gap-x-1">
      <input type="radio" name="status" value={value} id="" />
      <span>{children}</span>
    </div>
  );
};

export default Radio;
