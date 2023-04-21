import React from "react";
import { Button } from "../../components/button";
import styled from "styled-components";
import PostImage from "../post/component/PostImage";
import { NavLink } from "react-router-dom";

const DashboardLayoutStyled = styled.div`
  .dashboard-header {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
    border-bottom: 1px solid #eee;
  }

  .dashboard-main {
    padding: 40px 0;
    display: grid;
    grid-template-columns: 340px minmax(0, 1fr);
    grid-gap: 40px;
    .dashboard-sidebar {
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);
      .sidebar-logo {
        display: flex;
        gap: 20px;
        align-items: center;
        padding: 14px 20px;
        span {
          color: ${(props) => props.theme.black23};
          font-size: 16px;
          font-weight: 600;
        }
      }
      .sidebar-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
        .dashboard-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 20px;
          color: ${(props) => props.theme.grey80};
          padding: 14px 20px;
        }
      }
    }
  }
`;

const DashboardLayout = () => {
  return (
    <div className="container-1600">
      <DashboardLayoutStyled>
        <div className="dashboard-header">
          <Button
            type="button"
            height="60%"
            width="200px"
            kind="primary"
            to="/"
          >
            Write new post
          </Button>
          <PostImage
            radius="50%"
            width="52px"
            height="52px"
            src="https://images.unsplash.com/photo-1605381060423-078a6faf1938?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
          ></PostImage>
        </div>
        <div className="dashboard-main">
          <div className="dashboard-sidebar">
            <div className="sidebar-logo">
              <PostImage
                src="../../../images/logo-signup.png"
                width="40px"
                height="52px"
                radius="none"
              ></PostImage>
              <span>Monkey Website</span>
            </div>
            <div className="sidebar-content">
              <NavLink className="dashboard-item">
                <span className="menu-icon">oke</span>
                <span className="menu-text">Dashboard</span>
              </NavLink>
              <NavLink className="dashboard-item">
                <span className="menu-icon">oke</span>
                <span className="menu-text">Post</span>
              </NavLink>
              <NavLink className="dashboard-item">
                <span className="menu-icon">oke</span>
                <span className="menu-text">Category</span>
              </NavLink>
              <NavLink className="dashboard-item">
                <span className="menu-icon">oke</span>
                <span className="menu-text">User</span>
              </NavLink>
              <NavLink className="dashboard-item">
                <span className="menu-icon">oke</span>
                <span className="menu-text">Logout</span>
              </NavLink>
            </div>
          </div>
          <div className="dashboard-children">Dashboard Children</div>
        </div>
      </DashboardLayoutStyled>
    </div>
  );
};

export default DashboardLayout;
