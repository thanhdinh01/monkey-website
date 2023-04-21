import React from "react";
import styled from "styled-components";
import { Button } from "../../components/button";
import PostImage from "../post/component/PostImage";
import { useAuth } from "../../contexts/authContext";

const DashboardHeaderStyled = styled.div`
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  border-bottom: 1px solid #eee;
  p {
    color: ${(props) => props.theme.primary};
    font-size: 20px;
    font-weight: 600;
  }
`;

const DashboardHeader = () => {
  const { authUser } = useAuth();
  return (
    <DashboardHeaderStyled>
      <Button
        type="button"
        height="60%"
        width="200px"
        kind="primary"
        to="/manage/add-post"
      >
        Write new post
      </Button>
      <p>{authUser?.displayName}</p>
      <PostImage
        radius="50%"
        width="52px"
        height="52px"
        src="https://images.unsplash.com/photo-1605381060423-078a6faf1938?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
      ></PostImage>
    </DashboardHeaderStyled>
  );
};

export default DashboardHeader;
