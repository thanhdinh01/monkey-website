import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
  const [authUser, setAuthUser] = useState({});
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
