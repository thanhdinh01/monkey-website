import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../button";
import { IconSearch } from "../icon";

const HeaderStyled = styled.div`
  .header-main {
    display: flex;
    align-items: center;

    .logo-header {
      width: 56px;
    }

    .menu {
      display: flex;
      align-items: center;
      gap: 40px;
      a {
        font-size: 18px;
        font-weight: 600;
        color: ${(props) => props.theme.blackColor};
      }
    }

    .search {
      input {
        padding: 18px;
        border: 1px solid ${(props) => props.theme.greyLight};
        &::placeholder {
          color: ${(props) => props.theme.greyColor};
        }
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
        {/* Home Page
      <button
        onClick={() => {
          signOut(auth);
        }}
      >
        Sign out
      </button> */}
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
          <Button>Sign Up</Button>
        </header>
      </div>
    </HeaderStyled>
  );
};

export default Header;