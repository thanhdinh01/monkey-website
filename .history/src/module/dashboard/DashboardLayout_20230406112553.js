import React from "react";
import { Button } from "../../components/button";
import styled from "styled-components";

const DashboardLayoutStyled = styled.div`
  .dashboard-header {
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

const DashboardLayout = () => {
  return (
    <DashboardLayoutStyled>
      <div className="dashboard-header">
        <Button type="button" height="100%" width="200px" kind="primary" to="/">
          Write new post
        </Button>
      </div>
      <div className="dashboard-main">
        <div className="dashboard-sidebar"></div>
        <div className="dashboard-children"></div>
      </div>
    </DashboardLayoutStyled>
  );
};

export default DashboardLayout;
