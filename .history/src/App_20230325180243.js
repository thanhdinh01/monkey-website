import logo from "./logo.svg";
import "./App.css";
import { GlobalStyles } from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "./utils/constants";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles></GlobalStyles>
    </ThemeProvider>
  );
}

export default App;
