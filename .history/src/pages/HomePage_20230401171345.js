import { signOut } from "firebase/auth";
import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../components/button";
import { IconSearch } from "../components/icon";
import Header from "../components/layout/Header";
import { auth } from "../firebase/firebase-config";

const HomePage = () => {
  return (
    <>
      <Header></Header>
    </>
  );
};

export default HomePage;
