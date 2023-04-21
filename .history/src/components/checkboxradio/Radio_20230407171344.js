import React from "react";

const Radio = ({ value, children, ...props }) => {
  return (
    <div>
      <input type="radio" name="status" value={value} id="" />
      <span>{children}</span>
    </div>
  );
};

export default Radio;
