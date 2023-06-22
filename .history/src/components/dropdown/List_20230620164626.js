import React from "react";
import { useDropdownContext } from "./dropdown-context";
import styled from "styled-components";

const DropdownListStyled = styled.div`
  color: ${(props) => props.theme.textInput};
  background-color: ${(props) => props.theme.bgInput};
`;

const List = ({ children }) => {
  const { show } = useDropdownContext();
  return (
    <>
      {show && (
        <DropdownListStyled className="options-dropdown absolute rounded-lg w-full left-0 top-full shadow-md z-10">
          {children}
        </DropdownListStyled>
      )}
    </>
  );
};

export default List;
