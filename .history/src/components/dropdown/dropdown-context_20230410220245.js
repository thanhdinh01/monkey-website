import React, { createContext } from "react";

const DropdownContext = createContext();

const DropdownProvider = () => {
  return <DropdownContext.Provider></DropdownContext.Provider>;
};

export { DropdownProvider };
