import React from "react";
import styled from "styled-components";

const labelStyled = styled.div`
  color: ${(props) => props.theme.blackColor};
  font-weight: 600;
  cursor: pointer;
`;

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <label htmlFor={htmlFor} className="label">
      {children}
    </label>
  );
};

export default Label;
