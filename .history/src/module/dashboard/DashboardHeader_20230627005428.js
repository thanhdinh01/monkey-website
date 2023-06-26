import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/button";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { userStatus } from "../../utils/constants";

const DashboardHeaderStyled = styled.div`
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  border-bottom: 1px solid ${(props) => props.theme.borderNewest};
  background-color: ${(props) => props.theme.body};
  @media screen and (max-width: 426px) {
    justify-content: space-between;
  }
  & > p {
    color: ${(props) => props.theme.primary};
    font-size: 20px;
    font-weight: 600;
    @media screen and (max-width: 426px) {
      display: none;
    }
  }
  .profile-user {
    position: relative;
    margin-left: 8px;
    width: 52px;
    height: 52px;
    cursor: pointer;
    &:hover {
      color: black;
    }
    .profile-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100%;
    }
    .profile-option {
      position: absolute;
      top: 120%;
      right: 0;
      border-radius: 16px;
      padding: 12px 0;
      background-color: ${(props) => props.theme.greyColor};
      z-index: 11;
      p {
        padding: 6px 62px 6px 18px;
        color: ${(props) => props.theme.blackColor};
        font-weight: 500;
        transition: all 0.1s linear;
        &:hover {
          background-color: ${(props) => props.theme.primary};
          color: white;
        }
      }
    }
  }
`;

const DashboardHeader = () => {
  const { user } = useSelector((state) => state.global);
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      // console.log("in");
      if (nodeRef.current && !nodeRef.current.contains(e.target)) {
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
    toast.info("Logged out", { pauseOnHover: false, autoClose: 1500 });
    signOut(auth);
  };

  const handleToggleProfile = () => {
    setShow(!show);
  };

  const checkStatusUser = () => {
    if (user?.status === userStatus.BAN) {
      toast.info("Your account has been banned, so you can't write new post!", {
        toastId: "info3",
        pauseOnHover: true,
        autoClose: 2000,
      });
      return null;
    }
    console.log("not ban");
    return "/manage/add-post";
  };
  return (
    <DashboardHeaderStyled>
      <Button
        type="button"
        height="60%"
        width="200px"
        kind="primary"
        to={checkStatusUser()}
      >
        Write new post
      </Button>
      <p className="username-dashboard">{user?.fullname}</p>
      <div className="profile-user" ref={nodeRef}>
        <img
          src={user?.avatar || "../../../images/avatar-default.jpg"}
          alt=""
          className="profile-img"
          onClick={handleToggleProfile}
        />
        <div
          className={`profile-option ${
            show ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <p
            onClick={() => {
              setShow(false);
              navigate(`/`);
            }}
          >
            Home
          </p>
          <p
            onClick={() => {
              setShow(false);
              navigate(`/myprofile?id=${user?.id}`);
            }}
          >
            My profile
          </p>
          <p
            onClick={() => {
              setShow(false);
              navigate("/dashboard");
            }}
          >
            Dashboard
          </p>
          <p onClick={handleSignOut}>Sign out</p>
        </div>
      </div>
    </DashboardHeaderStyled>
  );
};

export default DashboardHeader;