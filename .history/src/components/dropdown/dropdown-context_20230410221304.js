import React, { createContext, useContext } from "react";

const DropdownContext = createContext();

const DropdownProvider = () => {
  return <DropdownContext.Provider></DropdownContext.Provider>;
};

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined")
    throw new Error("useDropdownContext must be used within DropdownProvider");
  return context;
};

export { DropdownProvider, useDropdownContext };
