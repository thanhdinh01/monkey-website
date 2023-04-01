import { signOut } from "firebase/auth";
import React from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase/firebase-config";

const navMenu = [
  { url: "/", title: "Home" },
  { url: "/blog", title: "Blog" },
  { url: "/contact", title: "Contact" },
];

const HomePage = () => {
  return (
    <div className="container">
      Home Page
      <button
        onClick={() => {
          signOut(auth);
        }}
      >
        Sign out
      </button>
      <header className="header-main">
        <NavLink>
          <img src={require("../images/logo-signup.png")} alt="logo-monkey" />
        </NavLink>
        <ul className="menu">
          {navMenu.length > 0 &&
            navMenu.forEach((menu) => (
              <NavLink key={menu.title} to={menu.url}>
                {menu.title}
              </NavLink>
            ))}
        </ul>
      </header>
    </div>
  );
};

export default HomePage;
