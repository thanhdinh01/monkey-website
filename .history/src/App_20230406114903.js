import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/authContext";
import DashboardPage from "./pages/DashboardPage";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SignInPage from "./pages/SignInPage";
import SignupPage from "./pages/SignupPage";
import DashboardLayout from "./module/dashboard/DashboardLayout";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignupPage></SignupPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="/detail" element={<DetailPage></DetailPage>}></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
          </Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
