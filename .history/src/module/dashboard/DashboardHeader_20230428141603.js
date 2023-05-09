import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/button";
import PostImage from "../post/component/PostImage";
import { useAuth } from "../../contexts/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";

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
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      // console.log("in");
      if (!nodeRef.current.contains(e.target)) {
        // console.log("thanh", e.target);
        setShow(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      // console.log("removed event click");
      document.removeEventListener("click", handler);
    };
  });

  const handleSignOut = () => {
    signOut(auth);
  };

  const handleToggleProfile = () => {
    setShow(!show);
  };
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
      <div className="profile-user" ref={nodeRef}>
        <img
          src={authUser?.avatar}
          alt=""
          className="profile-img"
          onClick={handleToggleProfile}
        />
        <div
          className={`profile-option ${
            show ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <p onClick={() => navigate(`/myprofile?id=${authUser?.id}`)}>
            My profile
          </p>
          <p onClick={() => navigate("/dashboard")}>Dashboard</p>
          <p onClick={handleSignOut}>Sign out</p>
        </div>
      </div>
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
