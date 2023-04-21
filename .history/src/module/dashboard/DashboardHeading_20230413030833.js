import React from "react";
import styled from "styled-components";
const LabelDashboardStyled = styled.div`
  h1 {
    font-weight: 600;
    font-size: 36px;
    color: ${(props) => props.theme.primary};
  }

  p {
    font-weight: 400;
    font-size: 18px;
    color: #898989de;
  }
`;

const DashboardHeading = ({ title = "", desc = "" }) => {
  return (
    <LabelDashboardStyled className="mb-10">
      <h1>{title}</h1>
      <p>{desc}</p>
    </LabelDashboardStyled>
  );
};

export default DashboardHeading;
