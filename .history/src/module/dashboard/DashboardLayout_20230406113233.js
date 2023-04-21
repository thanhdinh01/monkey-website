import React from "react";
import { Button } from "../../components/button";
import styled from "styled-components";
import PostImage from "../post/component/PostImage";

const DashboardLayoutStyled = styled.div`
  .dashboard-header {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

const DashboardLayout = () => {
  return (
    <DashboardLayoutStyled>
      <div className="container">
        <div className="dashboard-header">
          <Button
            type="button"
            height="100%"
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
          <div className="header-avatar">
            <img
              src="https://images.unsplash.com/photo-1605381060423-078a6faf1938?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
              alt=""
            />
          </div>
        </div>
        <div className="dashboard-main">
          <div className="dashboard-sidebar"></div>
          <div className="dashboard-children"></div>
        </div>
      </div>
    </DashboardLayoutStyled>
  );
};

export default DashboardLayout;