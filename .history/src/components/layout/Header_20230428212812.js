import { signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/authContext";
import { auth } from "../../firebase/firebase-config";
import { Button } from "../button";
import { IconSearch } from "../icon";

const HeaderStyled = styled.div`
  padding: 20px 0;
  .header-main {
    display: flex;
    align-items: center;
    height: 72px;

    .logo-header {
      max-width: 56px;
    }

    .menu {
      display: flex;
      align-items: center;
      gap: 40px;
      margin-left: 40px;
      a {
        font-size: 18px;
        font-weight: 600;
        color: ${(props) => props.theme.blackColor};
      }
    }

    .search {
      position: relative;
      width: 100%;
      max-width: 320px;
      height: 85%;
      margin-left: auto;
      margin-right: 20px;
      input {
        padding: 18px;
        border: 1px solid ${(props) => props.theme.greyLight};
        border-radius: 8px;
        height: 100%;
        width: 100%;
        &::placeholder {
          color: ${(props) => props.theme.greyLight};
        }
      }
      .icon-search {
        padding: 4px;
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
    }

    .header-username {
      height: 100%;
      display: flex;
      align-items: center;
      span {
        color: ${(props) => props.theme.primary};
        font-weight: 600;
        padding: 0 8px;
        position: relative;
        &::before {
          content: "";
          height: 100%;
          width: 2px;
          top: 0;
          right: 0;
          position: absolute;
          background-color: black;
        }
      }
      .profile-user {
        position: relative;
        margin-left: 8px;
        width: 50px;
        height: 50px;
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
          z-index: 10;
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
    }
  }
`;

const navMenu = [
  { url: "/", title: "Home" },
  { url: "/blog", title: "Blog" },
  { url: "/contact", title: "Contact" },
  { url: "/dashboard", title: "Dashboard" },
];

const Header = () => {
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const [show, setShow] = useState(false);
  console.log(show);
  const nodeRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      // console.log("in");
      if (!nodeRef.current.contains(e.target) && authUser) {
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
    <HeaderStyled>
      <div className="container">
        <header className="header-main">
          <NavLink to={"/"}>
            <img
              src={require("../../images/logo-signup.png")}
              alt="logo-monkey"
              className="logo-header"
            />
          </NavLink>
          <ul className="menu">
            {navMenu.length > 0 &&
              navMenu.map((menu) => (
                <li className="menu-item" key={menu.title}>
                  <NavLink to={menu.url}>{menu.title}</NavLink>
                </li>
              ))}
          </ul>
          <div className="search">
            <input type="text" placeholder="Search posts..." />
            <IconSearch className="icon-search"></IconSearch>
          </div>
          {!authUser ? (
            <Button
              type="button"
              height="85%"
              width="190px"
              kind="primary"
              to="/sign-in"
            >
              Log In
            </Button>
          ) : (
            <div className="header-username">
              <strong>HI</strong>
              <span> {authUser?.displayName}</span>
              {/* <strong className="sign-out" onClick={handleSignOut}>
                SIGN OUT
              </strong> */}
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
                  <p
                    onClick={() => {
                      setShow(false);
                      navigate(`/myprofile?id=${authUser?.id}`);
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
            </div>
          )}
        </header>
      </div>
    </HeaderStyled>
  );
};

export default Header;
