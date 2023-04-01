import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/authContext";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/sign-up" element={<SignupPage></SignupPage>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
