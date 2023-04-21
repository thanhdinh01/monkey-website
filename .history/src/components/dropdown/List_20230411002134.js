import React from "react";
import { useDropdownContext } from "./dropdown-context";

const List = ({ children }) => {
  const { show } = useDropdownContext();
  return (
    <>
      {show && (
        <div className="options-dropdown absolute w-full left-0 top-full bg-white shadow-md z-10">
          {children}
        </div>
      )}
    </>
  );
};

export default List;
