import React from "react";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayoutStyled = styled.div`
  .dashboard-main {
    padding: 40px 0;
    display: grid;
    grid-template-columns: 340px minmax(0, 1fr);
    grid-gap: 40px;
  }
`;

const DashboardLayout = () => {
  return (
    <div className="container-1600">
      <DashboardLayoutStyled>
        <DashboardHeader></DashboardHeader>
        <div className="dashboard-main">
          <DashboardSidebar></DashboardSidebar>
          <div className="dashboard-children">Dashboard Children</div>
        </div>
      </DashboardLayoutStyled>
    </div>
  );
};

export default DashboardLayout;
