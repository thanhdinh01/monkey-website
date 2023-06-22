import React from "react";
import { useDropdownContext } from "./dropdown-context";
import styled from "styled-components";

const DropdowListStyled = styled.div`
  color: ${(props) => props.theme.textInput};
  background-color: ${(props) => props.theme.bgInput};
`;

const List = ({ children }) => {
  const { show } = useDropdownContext();
  return (
    <DropdowListStyled>
      {show && (
        <div className="options-dropdown absolute w-full left-0 top-full shadow-md z-10">
          {children}
        </div>
      )}
    </DropdowListStyled>
  );
};

export default List;
