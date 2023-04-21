import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth } from "../firebase/firebase-config";

const AuthContext = createContext();

function AuthProvider(props) {
  const [authUser, setAuthUser] = useState({});

  onAuthStateChanged(auth, (user) => {
    // console.log("userContext:", user);
    if (user) {
      setAuthUser(user);
    } else {
      setAuthUser("");
    }
  });

  const value = { authUser, setAuthUser };
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") {
    throw new Error("useAuth must be used within AuthProvider!!");
  }
  return context;
};
export { AuthProvider, useAuth };
