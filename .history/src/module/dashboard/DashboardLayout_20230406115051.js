import React from "react";
import { Button } from "../../components/button";
import styled from "styled-components";
import PostImage from "../post/component/PostImage";

const DashboardLayoutStyled = styled.div`
  .dashboard-header {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
    border-bottom: 1px solid #eee;
  }
`;

const DashboardLayout = () => {
  return (
    <DashboardLayoutStyled>
      <div className="container-1600">
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
          <div className="dashboard-sidebar"></div>
          <div className="dashboard-children"></div>
        </div>
      </div>
    </DashboardLayoutStyled>
  );
};

export default DashboardLayout;
