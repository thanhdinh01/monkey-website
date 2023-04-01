import { signOut } from "firebase/auth";
import React from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase/firebase-config";

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
      </header>
    </div>
  );
};

export default HomePage;
