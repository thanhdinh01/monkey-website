import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../store/global/globalSlice";

const AuthContext = createContext();

function AuthProvider(props) {
  const [authUser, setAuthUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        onSnapshot(q, (docs) => {
          docs.forEach((d) => {
            setAuthUser({
              ...user,
              ...d.data(),
            });
            console.log(user, d.data());
            // dispatch(
            //   setUser({
            //     ...user,
            //     ...d.data(),
            //   })
            // );
          });
        });
      } else {
        setAuthUser(null);
      }
    });
  }, [dispatch]);

  // console.log(authUser);
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
