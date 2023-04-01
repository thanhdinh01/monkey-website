import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
  const [authUser, setAuthUser] = useState({});
  const value = { authUser, setAuthUser };
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}
