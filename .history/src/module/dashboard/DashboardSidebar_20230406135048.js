import React from "react";
import PostImage from "../post/component/PostImage";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const DashboardSidebarStyled = styled.div`
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
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 20px;
      color: ${(props) => props.theme.grey80};
      padding: 14px 20px;
      transition: all 0.1s linear;
      &:hover {
        color: ${(props) => props.theme.primary};
        background-color: ${(props) => props.theme.lightF1};
        font-weight: 600;
      }
    }
  }
`;

const DashboardSidebar = ({ linkDashboardMenu = [] }) => {
  return (
    <DashboardSidebarStyled>
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
        {linkDashboardMenu.map((linkItem) => (
          <NavLink to={linkItem.url} className="dashboard-item">
            <span className="menu-icon">{linkItem.icon}</span>
            <span className="menu-text">{linkItem.title}</span>
          </NavLink>
        ))}
      </div>
    </DashboardSidebarStyled>
  );
};

export default DashboardSidebar;
