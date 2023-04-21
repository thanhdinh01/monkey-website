import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
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
  }
`;

const navMenu = [
  { url: "/", title: "Home" },
  { url: "/blog", title: "Blog" },
  { url: "/contact", title: "Contact" },
];

const Header = () => {
  return (
    <HeaderStyled>
      <div className="container">
        <header className="header-main">
          <NavLink>
            <img
              src={require("../../images/logo-signup.png")}
              alt="logo-monkey"
              className="logo-header"
            />
          </NavLink>
          <ul className="menu">
            {navMenu.length > 0 &&
              navMenu.map((menu) => (
                <li className="menu-item">
                  <NavLink key={menu.title} to={menu.url}>
                    {menu.title}
                  </NavLink>
                </li>
              ))}
          </ul>
          <div className="search">
            <input type="text" placeholder="Search posts..." />
            <IconSearch className="icon-search"></IconSearch>
          </div>
          <Button
            type="button"
            className="button-header"
            height="85%"
            width="190px"
            to="/sign-in"
          >
            Log In
          </Button>
        </header>
      </div>
    </HeaderStyled>
  );
};

export default Header;