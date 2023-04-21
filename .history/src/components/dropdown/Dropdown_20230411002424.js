import React from "react";
import styled from "styled-components";
import { DropdownProvider } from "./dropdown-context";

const DropdownStyled = styled.div``;

const Dropdown = ({ children, ...props }) => {
  return (
    <DropdownProvider>
      <DropdownStyled className="relative w-full">{children}</DropdownStyled>
    </DropdownProvider>
  );
};

export default Dropdown;
