import { signOut } from "firebase/auth";
import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../components/button";
import { IconSearch } from "../components/icon";
import Header from "../components/layout/Header";
import { auth } from "../firebase/firebase-config";

const navMenu = [
  { url: "/", title: "Home" },
  { url: "/blog", title: "Blog" },
  { url: "/contact", title: "Contact" },
];

const HomePage = () => {
  return (
    <>
      <Header></Header>
    </>
  );
};

export default HomePage;
