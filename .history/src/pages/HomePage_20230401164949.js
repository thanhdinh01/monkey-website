import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/firebase-config";

const HomePage = () => {
  return (
    <div>
      Home Page
      <button
        onClick={() => {
          signOut(auth);
        }}
      >
        Sign out
      </button>
      <header className="coheadntainer"></header>
    </div>
  );
};

export default HomePage;
