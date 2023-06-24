import React from "react";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import NotFoundPage from "../../pages/NotFoundPage";

const DashboardContainerStyled = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.body};
`;

const DashboardLayoutStyled = styled.div`
  .dashboard-main {
    padding: 40px 0;
    display: grid;
    grid-template-columns: 300px minmax(0, 1fr);
    grid-gap: 40px;
  }
  @media screen and (max-width: 1025px) {
    display: block;
  }
`;

const DashboardLayout = () => {
  const { authUser } = useAuth();
  if (!authUser) return <NotFoundPage></NotFoundPage>;

  return (
    <DashboardContainerStyled className="container-1600">
      <DashboardLayoutStyled>
        <DashboardHeader></DashboardHeader>
        <div className="dashboard-main">
          <DashboardSidebar></DashboardSidebar>
          <div className="dashboard-children">
            <Outlet></Outlet>
          </div>
        </div>
      </DashboardLayoutStyled>
    </DashboardContainerStyled>
  );
};

export default DashboardLayout;
