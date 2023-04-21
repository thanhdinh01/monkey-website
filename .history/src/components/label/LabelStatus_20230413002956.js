import React from "react";

const LabelStatus = ({ type, children }) => {
  let className = "inline-block text-gray-500 bg-gray-100";
  switch (type) {
    case "success":
      className = "inline-block text-green-500 bg-green-100";
      break;

    case "warning":
      className = "inline-block text-orange-500 bg-orange-100";
      break;

    case "error":
      className = "inline-block text-red-500 bg-red-100";
      break;

    default:
      break;
  }

  return (
    <div className={`${className} rounded-lg inline-block p-2`}>{children}</div>
  );
};

export default LabelStatus;
