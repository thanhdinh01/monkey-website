import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { themeDark, themeLight } from "./utils/constants";
import "./App.css";
import { AuthProvider } from "./contexts/authContext";
import DashboardPage from "./pages/DashboardPage";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SignInPage from "./pages/SignInPage";
import SignupPage from "./pages/SignupPage";
import DashboardLayout from "./module/dashboard/DashboardLayout";
import PostManage from "./module/post/PostManage";
import PostAddNew from "./module/post/PostAddNew";
import CategoryManage from "./module/category/CategoryManage";
import CategoryAddNew from "./module/category/CategoryAddNew";
import CategoryUpdate from "./module/category/CategoryUpdate";
import UserManage from "./module/user/UserManage";
import UserAddNew from "./module/user/UserAddNew";
import UserUpdate from "./module/user/UserUpdate";
import PostUpdate from "./module/post/PostUpdate";
import { useEffect, useState } from "react";
import CategoryPage from "./pages/CategoryPage";
import AuthorPage from "./pages/AuthorPage";
import UserProfile from "./module/user/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { setLight } from "./store/global/globalSlice";

function App() {
  const [showTop, setShowTop] = useState(false);
  const { posts } = useSelector((state) => state.global);
  let { toggleLight } = useSelector((state) => state.global);
  console.log("toggleLight", toggleLight);
  if (
    toggleLight === false &&
    JSON.parse(localStorage.getItem("setLight")) === true
  ) {
    toggleLight = true;
  }
  // const [isDarkMode, setIsDarkMode] = useState(!toggleLight);
  // const isDarkMode=toggleLight===
  const dispatch = useDispatch();
  console.log(posts);

  useEffect(() => {
    const toggleToTop = () => {
      if (document.documentElement.scrollTop > 1000) setShowTop(true);
      else setShowTop(false);
    };
    window.addEventListener("scroll", toggleToTop);
    return () => {
      window.removeEventListener("scroll", toggleToTop);
    };
  }, []);

  useEffect(() => {
    console.log("in useEffect");
    const isLight = JSON.parse(localStorage.getItem("setLight"));
    dispatch(setLight(isLight));
  }, [dispatch]);

  const handleToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <AuthProvider>
      <ThemeProvider theme={toggleLight ? themeLight : themeDark}>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignupPage></SignupPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="/post/:slug" element={<DetailPage></DetailPage>}></Route>

          <Route
            path="/category/:category"
            element={<CategoryPage></CategoryPage>}
          ></Route>
          <Route
            path="/author/:author"
            element={<AuthorPage></AuthorPage>}
          ></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/myprofile"
              element={<UserProfile></UserProfile>}
            ></Route>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/post"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
            <Route
              path="/manage/update-post"
              element={<PostUpdate></PostUpdate>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/manage/update-category"
              element={<CategoryUpdate></CategoryUpdate>}
            ></Route>
            <Route
              path="/manage/user"
              element={<UserManage></UserManage>}
            ></Route>
            <Route
              path="/manage/add-user"
              element={<UserAddNew></UserAddNew>}
            ></Route>
            <Route
              path="/manage/update-user"
              element={<UserUpdate></UserUpdate>}
            ></Route>
          </Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
        <button
          onClick={handleToTop}
          className={`${
            showTop ? "opacity-70 visible" : "opacity-0 invisible"
          } fixed bottom-6 right-6 bg-[#2EBAC1] rounded-full text-white font-bold w-16 h-16 flex items-center justify-center transition-all`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <button
          className="bg-purple-400 fixed top-0 left-0"
          onClick={() => {
            dispatch(setLight(!toggleLight));
            localStorage.setItem("setLight", !toggleLight);
          }}
        >
          toggle light/dark
        </button>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
