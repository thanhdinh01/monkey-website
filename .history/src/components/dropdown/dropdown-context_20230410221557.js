import React, { createContext, useContext, useState } from "react";

const DropdownContext = createContext();

const DropdownProvider = () => {
  const [show, setShow] = useState(false);
  const toggleDropdown = () => {
    setShow(!show);
  };
  const values = { show, setShow, toggleDropdown };
  return <DropdownContext.Provider value={values}></DropdownContext.Provider>;
};

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined")
    throw new Error("useDropdownContext must be used within DropdownProvider");
  return context;
};

export { DropdownProvider, useDropdownContext };
