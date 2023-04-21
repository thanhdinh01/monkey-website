import React, { useEffect } from "react";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import NotFoundPage from "../../pages/NotFoundPage";

const DashboardLayoutStyled = styled.div`
  .dashboard-main {
    padding: 40px 0;
    display: grid;
    grid-template-columns: 300px minmax(0, 1fr);
    grid-gap: 40px;
  }

  .dashboard-heading {
    font-weight: 600;
    font-size: 36px;
    color: ${(props) => props.theme.primary};
    margin-bottom: 40px;
  }
`;

const DashboardLayout = () => {
  const { authUser } = useAuth();
  if (!authUser) return <NotFoundPage></NotFoundPage>;

  return (
    <div className="container-1600">
      <DashboardLayoutStyled>
        <DashboardHeader></DashboardHeader>
        <div className="dashboard-main">
          <DashboardSidebar></DashboardSidebar>
          <div className="dashboard-children">
            <Outlet></Outlet>
          </div>
        </div>
      </DashboardLayoutStyled>
    </div>
  );
};

export default DashboardLayout;
