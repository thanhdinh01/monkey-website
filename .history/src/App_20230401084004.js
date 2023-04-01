import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/authContext";
import SignInPage from "./pages/SignInPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/sign-up" element={<SignupPage></SignupPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
