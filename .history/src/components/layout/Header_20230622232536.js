import { signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/authContext";
import { auth } from "../../firebase/firebase-config";
import { Button } from "../button";
import { IconSearch } from "../icon";
import { useDispatch, useSelector } from "react-redux";
import { handleSearchPost } from "../../store/total-search/handler";
import { debounce } from "lodash";
import { setQuery } from "../../store/total-search/totalSearchSlice";

const HeaderStyled = styled.div`
  padding: 20px 0;
  background-color: ${(props) => props.theme.body};
  .header-main {
    display: flex;
    align-items: center;
    height: 72px;
    @media screen and (max-width: 414px) {
      justify-content: space-between;
    }

    .logo-header {
      max-width: 56px;
      @media screen and (max-width: 414px) {
        display: none;
      }
    }

    .menu-mobile {
      display: none;
      @media screen and (max-width: 414px) {
        display: block;
        position: relative;
      }
      .toggle-menu {
        color: ${(props) => props.theme.textInput};
      }
      .list-menu--mobile {
        position: absolute;
        top: 120%;
        left: 0;
        border-radius: 16px;
        padding: 12px 0;
        background-color: ${(props) => props.theme.greyColor};
        z-index: 10;
        a {
          padding: 6px 62px 6px 18px;
          color: rgb(41, 45, 50);
          font-weight: 500;
          transition: all 0.1s linear 0s;
        }
      }
    }

    .menu {
      display: flex;
      align-items: center;
      gap: 40px;
      margin-left: 40px;
      a {
        font-size: 18px;
        font-weight: 600;
        color: ${(props) => props.theme.textInput};
      }

      @media screen and (max-width: 1024px) {
        gap: 20px;
        margin-left: 20px;
      }
      @media screen and (max-width: 414px) {
        display: none;
      }
    }

    .search {
      position: relative;
      width: 100%;
      max-width: 320px;
      height: 85%;
      margin-left: auto;
      margin-right: 20px;
      @media screen and (max-width: 1024px) {
        max-width: 280px;
      }
      @media screen and (max-width: 768px) {
        max-width: 200px;
      }
      @media screen and (max-width: 414px) {
        margin-left: 20px;
        margin-right: 20px;
        min-width: 200px;
        max-width: none;
      }
      input {
        padding: 18px;
        border: 1px solid ${(props) => props.theme.greyLight};
        color: ${(props) => props.theme.textInput};
        background-color: ${(props) => props.theme.bgInput};
        border-radius: 8px;
        height: 100%;
        width: 100%;
        &::placeholder {
          color: ${(props) => props.theme.textPlaceholder};
        }
        &:focus {
          background-color: ${(props) => props.theme.bgFocusInput};
          border-color: ${(props) => props.theme.primary};
          color: ${(props) => props.theme.textFocusInput};
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
      .hi-text {
        color: ${(props) => props.theme.textInput};
        @media screen and (max-width: 1024px) {
          display: none;
        }
      }
      span {
        color: ${(props) => props.theme.primary};
        font-weight: 600;
        padding: 0 8px;
        position: relative;
        &::before {
          content: "";
          height: 100%;
          width: 2px;
          background-color: ${(props) => props.theme.textInput};
          top: 0;
          right: 0;
          position: absolute;
        }
        @media screen and (max-width: 1024px) {
          display: none;
        }
      }
      .profile-user {
        position: relative;
        margin-left: 8px;
        width: 50px;
        height: 50px;
        cursor: pointer;
        flex-shrink: 0;
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
  const dispatch = useDispatch();
  const nodeRef = useRef(null);
  const [show, setShow] = useState(false);
  const { authUser } = useAuth();
  const { query } = useSelector((state) => state.search);

  useEffect(() => {
    const handler = (e) => {
      if (nodeRef.current && !nodeRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  });

  const handleSignOut = () => {
    signOut(auth);
  };

  const handleToggleProfile = () => {
    setShow(!show);
  };

  const handleTotalSearch = debounce((e) => {
    dispatch(setQuery(e.target.value));
  }, 10);

  const submitTotalSearch = (e) => {
    e.preventDefault();
    dispatch(handleSearchPost(query));
    navigate(`/search?query=${query !== "" ? query : "all"}`);
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
          <div className="menu-mobile">
            <span className="toggle-menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </span>
            <div className=" list-menu--mobile">
              {navMenu.length > 0 &&
                navMenu.map((menu) => (
                  <li className="menu-item" key={menu.title}>
                    <NavLink to={menu.url}>{menu.title}</NavLink>
                  </li>
                ))}
            </div>
          </div>
          <ul className="menu">
            {navMenu.length > 0 &&
              navMenu.map((menu) => (
                <li className="menu-item" key={menu.title}>
                  <NavLink to={menu.url}>{menu.title}</NavLink>
                </li>
              ))}
          </ul>
          <form onSubmit={submitTotalSearch} className="search">
            <input
              type="text"
              placeholder="Search posts..."
              onChange={handleTotalSearch}
            />
            <button type="submit" className="icon-search">
              <IconSearch></IconSearch>
            </button>
          </form>
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
              <strong className="hi-text">HI</strong>
              <span> {authUser?.displayName}</span>
              {/* <strong className="sign-out" onClick={handleSignOut}>
                SIGN OUT
              </strong> */}
              <div className="profile-user" ref={nodeRef}>
                <img
                  src={authUser?.avatar || "../../../images/avatar-default.jpg"}
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
