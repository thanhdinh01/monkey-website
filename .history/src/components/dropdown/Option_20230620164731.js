import React from "react";
import { useDropdownContext } from "./dropdown-context";
import styled from "styled-components";

const DropdownOptionStyled = styled.p`
  &:hover {
    background-color: ${(props) => props.theme.hoverSidebar};
  }
`;

const Option = ({ children, onClick }) => {
  const { setShow } = useDropdownContext();

  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <DropdownOptionStyled
      onClick={handleClick}
      className="px-5 py-4 hover:bg-gray-200 cursor-pointer font-light"
    >
      {children}
    </DropdownOptionStyled>
  );
};

export default Option;
