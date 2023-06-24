import React from "react";
import styled from "styled-components";
const LabelDashboardStyled = styled.div`
  margin-bottom: 60px;
  h1 {
    font-weight: 600;
    font-size: 36px;
    color: ${(props) => props.theme.primary};
  }
  @media screen and (max-width: 414px) {
    h1 {
      font-size: 26px;
    }
    margin-bottom: 30px;
  }

  p {
    font-weight: 400;
    font-size: 18px;
    color: #898989;
  }
`;

const DashboardHeading = ({ title = "", desc = "" }) => {
  return (
    <LabelDashboardStyled>
      <h1>{title}</h1>
      <p>{desc}</p>
    </LabelDashboardStyled>
  );
};

export default DashboardHeading;
