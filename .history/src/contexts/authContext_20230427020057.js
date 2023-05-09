import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth, db } from "../firebase/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const AuthContext = createContext();

function AuthProvider(props) {
  const [authUser, setAuthUser] = useState({});

  onAuthStateChanged(auth, (user) => {
    console.log("userContext:", user);
    if (user) {
      console.log("oke");
      // const q = query(
      //   collection(db, "users"),
      //   where("email", "==", user.email)
      // );
      // onSnapshot(q, (docs) => {
      //   docs.forEach((d) => {
      //     setAuthUser({
      //       ...user,
      //       ...d.data(),
      //     });
      //   });
      // });
    } else {
      setAuthUser(null);
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
