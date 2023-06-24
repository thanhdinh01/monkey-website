import React from "react";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import SignInPage from "../../pages/SignInPage";
import { toast } from "react-toastify";

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
    @media screen and (max-width: 1024px) {
      display: block;
      .dashboard-children > div {
        display: block;
        margin-top: 30px;
        & > :first-child {
          float: left;
          margin-bottom: 0;
        }
        .search-postmanage {
          margin-bottom: 0;
        }
        & > :last-child {
          clear: both;
          margin-top: 60px;
        }
      }
    }
  }
`;

const DashboardLayout = () => {
  const { authUser } = useAuth();
  if (!authUser) {
    toast.info("You need to be logged in to access this function", {
      pauseOnHover: false,
      autoClose: 1500,
    });
    return <SignInPage></SignInPage>;
  }

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
